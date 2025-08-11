"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export default function StickerBoard() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [drawings, setDrawings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);

  // Load existing stickers
  useEffect(() => {
    const loadData = async () => {
      let { data } = await supabase.from("stickers").select("*");
      setDrawings(data || []);
    };
    loadData();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("realtime:stickers")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "stickers" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setDrawings((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";
    ctxRef.current = ctx;
  }, [isOpen]);

  const startDraw = (e) => {
    isDrawing.current = true;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    ctxRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    ctxRef.current.stroke();
  };

  const endDraw = () => {
    isDrawing.current = false;
    ctxRef.current.closePath();
  };

  // Save to Supabase
  const saveSticker = async () => {
    if (!name.trim()) {
      alert("Please enter your name before saving.");
      return;
    }

    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");

    const { error } = await supabase.from("stickers").insert([
      {
        name,
        text,
        image: imageData,
      },
    ]);

    if (!error) {
      setText("");
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      {/* Display existing stickers */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {drawings.map((sticker, idx) => (
          <div key={idx} className="border p-2">
            <img src={sticker.image} alt="drawing" className="w-32 h-32" />
            <p className="text-sm mt-1">{sticker.name}: {sticker.text}</p>
          </div>
        ))}
      </div>

      {/* Bottom center button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        Add Sticker
      </button>

      {/* Popup drawing square */}
      {isOpen && (
        <div className="fixed bottom-16 bg-white shadow-lg p-4 border rounded-lg flex flex-col items-center">
          <input
            type="text"
            placeholder="Your name"
            className="border mb-2 p-1 w-[300px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            className="border mb-2"
          />
          <input
            type="text"
            placeholder="Add some text"
            className="border mb-2 p-1 w-[300px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={saveSticker}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
