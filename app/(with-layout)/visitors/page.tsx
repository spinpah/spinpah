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
    <div className="p-4 py-10 md:p-12 bg min-h-screen">
      {/* Back to Main Page Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-11 hover:bg-gray-12 text-gray-1 rounded-md transition-colors duration-200 font-medium z-10 text-sm"
      >
        ← Back to Main
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-2xl font-medium text-gray-12 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2" />
            Visitors Board
          </h1>
          <p className="text-gray-9 text-sm">Leave your mark for others to see</p>
        </div>

        {/* Stickers Display */}
        <div className="bg-gray-2 border-2 border-accent rounded-md p-8 mb-24">
          <div className="flex flex-wrap gap-6 justify-center">
            {stickers.length === 0 ? (
              <div className="text-center text-gray-9 mt-16">
                <p className="text-base mb-1">No messages yet</p>
                <p className="text-sm">Be the first to leave a message</p>
              </div>
            ) : (
              stickers.map((sticker) => (
                <div
                  key={sticker.id}
                  className="bg-gray-3 border border-gray-6 rounded-md p-3 hover:bg-gray-4 transition-colors duration-200 flex flex-col"
                  style={{
                    minWidth: "180px",
                    maxWidth: sticker.type === "text" ? "320px" : "280px",
                    width: "fit-content",
                    minHeight: "120px"
                  }}
                >
                {/* Name at the top */}
                <div className="text-center mb-3">
                  <p className="font-medium text-sm text-gray-11 truncate">
                    {sticker.name}
                  </p>
                </div>
                
                {/* Content - vertically centered */}
                <div className="flex-1 flex items-center justify-center">
                  {sticker.type === "text" && sticker.message && (
                    <p className="text-gray-12 whitespace-pre-wrap break-words text-sm text-center">
                      {sticker.message}
                    </p>
                  )}
                  {sticker.type === "draw" && sticker.drawing && (
                    <div className="text-center">
                      <img 
                        src={sticker.drawing} 
                        alt="Drawing sticker" 
                        className="max-w-full h-auto rounded-sm"
                        style={{ maxHeight: "180px" }}
                      />
                    </div>
                  )}
                </div>
                
                {/* Timestamp */}
                <div className="mt-3 pt-2 border-t border-gray-6">
                  <p className="text-xs text-gray-9 text-center">
                    {new Date(sticker.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        </div>

        {/* Add Sticker Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setShowPopup(true)}
            className="px-6 py-3 bg-gray-12 hover:bg-accent text-gray-1 hover:text-gray-12 rounded-md transition-colors duration-200 font-medium text-sm shadow-lg"
          >
            Sign the visitor's log
          </button>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgb(16, 16, 16)' }}>
            <div className="bg-gray-2 border border-gray-6 rounded-md p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-base font-medium mb-6 text-center text-gray-12">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2" />
                Add Your Message
              </h2>

              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-11 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-3 border border-gray-6 text-gray-12 p-3 rounded-sm focus:ring-1 focus:ring-accent focus:border-accent text-sm transition-colors"
                  maxLength={50}
                />
              </div>

              {/* Mode Selection */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setMode("text")}
                  className={`flex-1 p-2 rounded-sm text-sm font-medium transition-colors ${
                    mode === "text" 
                      ? "bg-gray-12 text-gray-1" 
                      : "bg-gray-4 text-gray-11 hover:bg-gray-5"
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setMode("draw")}
                  className={`flex-1 p-2 rounded-sm text-sm font-medium transition-colors ${
                    mode === "draw" 
                      ? "bg-gray-12 text-gray-1" 
                      : "bg-gray-4 text-gray-11 hover:bg-gray-5"
                  }`}
                >
                  Draw
                </button>
              </div>

              {/* Content Area */}
              <div className="mb-6">
                {mode === "text" ? (
                  <div>
                    <label className="block text-sm text-gray-11 mb-2">
                      Your Message
                    </label>
                    <textarea
                      placeholder="Type your message here..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full h-32 bg-gray-3 border border-gray-6 text-gray-12 p-3 rounded-sm focus:ring-1 focus:ring-accent focus:border-accent text-sm resize-none transition-colors"
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-9 text-right mt-1">
                      {text.length}/500
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm text-gray-11 mb-2">
                      Your Drawing
                    </label>
                    <canvas
                      ref={canvasRef}
                      width={280}
                      height={200}
                      className="border border-gray-6 rounded-sm bg-black cursor-crosshair w-full"
                      style={{ width: '100%', height: '200px' }}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                    <button
                      onClick={clearCanvas}
                      className="mt-2 px-3 py-1 bg-gray-4 hover:bg-gray-5 text-gray-11 rounded-sm text-sm transition-colors"
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
                  className="px-4 py-2 bg-gray-4 hover:bg-gray-5 text-gray-11 rounded-sm transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSticker}
                  className="px-4 py-2 bg-gray-12 hover:bg-accent text-gray-1 hover:text-gray-12 rounded-sm transition-colors font-medium text-sm"
                >
                  Save Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}