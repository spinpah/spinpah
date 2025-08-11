"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Sticker = {
  id: string;
  name: string;
  message: string;
  drawing: string | null;
  created_at: string;
};

export default function VisitorsPage() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  // Fetch existing stickers
  useEffect(() => {
    const fetchStickers = async () => {
      const { data, error } = await supabase
        .from("stickers")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setStickers(data);
      setLoading(false);
    };

    fetchStickers();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("stickers-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "stickers" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setStickers((prev) => [payload.new as Sticker, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Canvas drawing handlers
  const startDraw = (e: React.MouseEvent) => {
    drawing.current = true;
    draw(e);
  };
  const endDraw = () => {
    drawing.current = false;
    if (canvasRef.current) {
      canvasRef.current.getContext("2d")?.beginPath();
    }
  };
  const draw = (e: React.MouseEvent) => {
    if (!drawing.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  // Save to Supabase
  const saveSticker = async () => {
    if (!name.trim() || !message.trim()) return;
    let drawingData = null;
    if (canvasRef.current) {
      drawingData = canvasRef.current.toDataURL();
    }
    await supabase.from("stickers").insert({
      name,
      message,
      drawing: drawingData,
    });
    setName("");
    setMessage("");
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setShowForm(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Visitors Stickers</h1>

      {/* List of stickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stickers.map((s) => (
          <div
            key={s.id}
            className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-center"
          >
            {s.drawing && (
              <img src={s.drawing} alt="drawing" className="mb-2 w-40 h-40" />
            )}
            <p className="font-semibold">{s.name}</p>
            <p className="text-gray-500 text-sm">{s.message}</p>
            <p className="text-xs text-gray-400">
              {new Date(s.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom center button */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md"
      >
        {showForm ? "Cancel" : "Add Sticker"}
      </button>

      {/* Sticker creation form */}
      {showForm && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="border mb-2"
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseMove={draw}
          />
          <input
            type="text"
            placeholder="Your name"
            className="border p-2 w-[200px] mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your message"
            className="border p-2 w-[200px] mb-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={saveSticker}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
