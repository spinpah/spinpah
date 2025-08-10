"use client";

import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function VisitorsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState<"text" | "draw">("text");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const saveSticker = async () => {
    let drawingData = null;

    if (mode === "draw" && canvasRef.current) {
      drawingData = canvasRef.current.toDataURL("image/png");
    }

    const { error } = await supabase.from("stickers").insert([
      {
        name,
        type: mode,
        message: mode === "text" ? text : null,
        drawing: mode === "draw" ? drawingData : null,
      },
    ]);

    if (error) {
      console.error("Error saving sticker:", error);
    } else {
      setShowPopup(false);
      setText("");
      setName("");
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const handleCanvasDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (e.buttons !== 1) return; // Only draw on left click
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 2, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Stickers board */}
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Visitors Board</h1>
        {/* TODO: Render saved stickers here */}
      </div>

      {/* Add Sticker Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg"
      >
        Add Sticker
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-2">Add Your Sticker</h2>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />

            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setMode("text")}
                className={`flex-1 p-2 rounded ${
                  mode === "text" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setMode("draw")}
                className={`flex-1 p-2 rounded ${
                  mode === "draw" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                Draw
              </button>
            </div>

            {mode === "text" ? (
              <textarea
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-40 border p-2 rounded"
              />
            ) : (
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="border rounded bg-white"
                onMouseMove={handleCanvasDraw}
              />
            )}

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveSticker}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
