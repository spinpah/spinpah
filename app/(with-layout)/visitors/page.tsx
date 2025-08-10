"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { saveSticker, getStickers } from "@/lib/stickers";

interface Sticker {
  id: string;
  type: "text" | "draw";
  message?: string;
  drawing?: string; // base64
  created_at: string;
}

export default function VisitorsPage() {
  const [mode, setMode] = useState<"text" | "draw">("text");
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch stickers when page loads
  useEffect(() => {
    loadStickers();
  }, []);

  async function loadStickers() {
    const data = await getStickers();
    setStickers(data);
  }

  function startDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    const draw = (moveEvent: MouseEvent) => {
      ctx.lineTo(
        moveEvent.offsetX,
        moveEvent.offsetY
      );
      ctx.stroke();
    };

    const stop = () => {
      window.removeEventListener("mousemove", draw);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stop);
  }

  async function handleSave() {
    setIsSaving(true);

    if (mode === "text" && text.trim()) {
      await saveSticker("text", text, null);
      setText("");
    } else if (mode === "draw" && canvasRef.current) {
      const drawingData = canvasRef.current.toDataURL("image/png");
      await saveSticker("draw", null, drawingData);
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    await loadStickers();
    setIsSaving(false);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Visitors Board</h1>

      {/* Mode switch */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${mode === "text" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("text")}
        >
          Text Sticker
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "draw" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("draw")}
        >
          Draw Sticker
        </button>
      </div>

      {/* Sticker input */}
      {mode === "text" ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message..."
          className="border p-2 w-full rounded"
        />
      ) : (
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="border bg-white"
          onMouseDown={startDrawing}
        />
      )}

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Add Sticker"}
      </button>

      {/* Board */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {stickers.map((s) => (
          <div key={s.id} className="border p-2 bg-yellow-100 rounded shadow">
            {s.type === "text" && <p>{s.message}</p>}
            {s.type === "draw" && s.drawing && (
              <img src={s.drawing} alt="Drawing sticker" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
