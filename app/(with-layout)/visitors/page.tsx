"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Sticker {
  id: string;
  type: "text" | "draw";
  name: string;
  message?: string;
  drawing?: string; // base64
  created_at: string;
}

export default function VisitorsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState<"text" | "draw">("text");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    loadStickers();
  }, []);

  async function loadStickers() {
    const { data, error } = await supabase
      .from("stickers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading stickers:", error);
      return;
    }
    
    setStickers(data || []);
  }

  const saveSticker = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (mode === "text" && !text.trim()) {
      alert("Please enter a message");
      return;
    }

    let drawingData = null;

    if (mode === "draw" && canvasRef.current) {
      drawingData = canvasRef.current.toDataURL("image/png");
      
      // Check if canvas is empty (optional - you might want to allow empty drawings)
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        const isEmpty = imageData.data.every(pixel => pixel === 0);
        if (isEmpty) {
          alert("Please draw something");
          return;
        }
      }
    }

    const { data, error } = await supabase.from("stickers").insert([
      {
        name: name.trim(),
        type: mode,
        message: mode === "text" ? text.trim() : null,
        drawing: mode === "draw" ? drawingData : null,
      },
    ]).select();

    if (error) {
      console.error("Error saving sticker:", error);
      alert("Error saving sticker. Please try again.");
    } else {
      // Add the new sticker to the beginning of the array for real-time update
      if (data && data[0]) {
        setStickers(prev => [data[0], ...prev]);
      }
      
      // Reset form
      setShowPopup(false);
      setText("");
      setName("");
      setMode("text");
      
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      {/* Back to Main Page Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-md transition-colors duration-200 font-medium z-10"
      >
        ← Back to Main
      </button>

      {/* Header */}
      <div className="text-center mb-8 mt-12">
        <h1 className="text-3xl font-bold text-gray-800">Visitors Board</h1>
        <p className="text-gray-600 mt-2">Leave your mark for others to see!</p>
      </div>

      {/* Stickers Display */}
      <div className="flex flex-wrap gap-4 justify-center mb-20">
        {stickers.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-xl">No stickers yet!</p>
            <p>Be the first to leave a message.</p>
          </div>
        ) : (
          stickers.map((sticker) => (
            <div
              key={sticker.id}
              className="bg-yellow-200 border border-yellow-300 rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-200"
              style={{
                minWidth: "150px",
                maxWidth: sticker.type === "text" ? "300px" : "250px",
                width: "fit-content"
              }}
            >
              {/* Name at the top */}
              <div className="bg-yellow-300 px-3 py-1 rounded-t-lg text-center">
                <p className="font-semibold text-sm text-gray-800 truncate">
                  {sticker.name}
                </p>
              </div>
              
              {/* Content */}
              <div className="p-3">
                {sticker.type === "text" && sticker.message && (
                  <p className="text-gray-800 whitespace-pre-wrap break-words text-sm">
                    {sticker.message}
                  </p>
                )}
                {sticker.type === "draw" && sticker.drawing && (
                  <div className="text-center">
                    <img 
                      src={sticker.drawing} 
                      alt="Drawing sticker" 
                      className="max-w-full h-auto rounded"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>
              
              {/* Timestamp */}
              <div className="px-3 pb-2">
                <p className="text-xs text-gray-500 text-right">
                  {new Date(sticker.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Sticker Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors duration-200 font-semibold"
      >
        + Add Sticker
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Add Your Sticker
            </h2>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={50}
              />
            </div>

            {/* Mode Selection */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMode("text")}
                className={`flex-1 p-2 rounded font-medium transition-colors ${
                  mode === "text" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                📝 Text
              </button>
              <button
                onClick={() => setMode("draw")}
                className={`flex-1 p-2 rounded font-medium transition-colors ${
                  mode === "draw" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🎨 Draw
              </button>
            </div>

            {/* Content Area */}
            <div className="mb-4">
              {mode === "text" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Type your message here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-32 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 text-right mt-1">
                    {text.length}/500
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Drawing
                  </label>
                  <canvas
                    ref={canvasRef}
                    width={280}
                    height={200}
                    className="border border-gray-300 rounded bg-black cursor-crosshair w-full"
                    style={{ width: '100%', height: '200px' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                  <button
                    onClick={clearCanvas}
                    className="mt-2 px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-sm transition-colors"
                  >
                    Clear Drawing
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setText("");
                  setName("");
                  setMode("text");
                  if (canvasRef.current) {
                    clearCanvas();
                  }
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSticker}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors font-semibold"
              >
                Save Sticker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}