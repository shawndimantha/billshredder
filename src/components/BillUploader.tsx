"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, FileText, Loader2 } from "lucide-react";

interface BillUploaderProps {
  onExtracted: (result: { raw_text: string; extraction: Record<string, unknown> }) => void;
  onPastedText: (text: string) => void;
  pastedText: string;
  onPastedTextChange: (text: string) => void;
  apiKey?: string | null;
  onNeedKey?: () => void;
}

export default function BillUploader({
  onExtracted,
  onPastedText,
  pastedText,
  onPastedTextChange,
  apiKey,
  onNeedKey,
}: BillUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    const key = apiKey || sessionStorage.getItem("anthropic_api_key");
    if (!key) {
      onNeedKey?.();
      return;
    }

    setError(null);

    // Show preview for images
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }

    setIsExtracting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/extract-bill", {
        method: "POST",
        body: formData,
        headers: key ? { "x-api-key": key } : {},
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Extraction failed");
      }

      const extraction = await res.json();
      onExtracted({ raw_text: extraction.raw_text, extraction });
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err));
      setPreview(null);
    } finally {
      setIsExtracting(false);
    }
  }, [onExtracted, apiKey, onNeedKey]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
    else {
      const text = e.dataTransfer.getData("text");
      if (text) onPastedText(text);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full max-w-xl">
      {/* Upload zone */}
      <div
        className="border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200"
        style={{
          borderColor: dragOver ? "#D4A574" : "#2A2A32",
          background: dragOver ? "rgba(212,165,116,0.05)" : "rgba(30,30,36,0.5)",
        }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {isExtracting ? (
          <div className="py-4">
            <Loader2 className="w-10 h-10 mx-auto mb-4 animate-spin" style={{ color: "#D4A574" }} />
            <p className="font-medium" style={{ color: "#EDEDF0" }}>Scanning your bill with AI vision...</p>
            <p className="text-sm mt-1" style={{ color: "#8B8B9A" }}>Extracting every line item and billing code</p>
            {preview && (
              <motion.img
                src={preview}
                alt="Bill preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.4, scale: 1 }}
                className="mt-4 mx-auto max-h-32 rounded-lg"
              />
            )}
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 mx-auto mb-4" style={{ color: dragOver ? "#D4A574" : "#8B8B9A" }} />
            <p className="font-medium mb-1" style={{ color: "#EDEDF0" }}>
              Drop your bill here
            </p>
            <p className="text-sm mb-4" style={{ color: "#8B8B9A" }}>
              Photo, PDF, or paste text below
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ background: "#1E1E24", color: "#EDEDF0", border: "1px solid #2A2A32" }}
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ background: "#1E1E24", color: "#EDEDF0", border: "1px solid #2A2A32" }}
              >
                <FileText className="w-4 h-4" />
                Upload File
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />

            <textarea
              value={pastedText}
              onChange={(e) => onPastedTextChange(e.target.value)}
              placeholder="Or paste your itemized bill text here..."
              className="w-full h-24 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1"
              style={{
                background: "#16161A",
                border: "1px solid #2A2A32",
                color: "#EDEDF0",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />

            {pastedText.trim() && (
              <button
                onClick={() => onPastedText(pastedText)}
                className="mt-3 px-6 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                style={{ background: "#D4A574", color: "#0C0C0F" }}
              >
                Analyze Bill
              </button>
            )}
          </>
        )}

        {error && (
          <p className="mt-3 text-sm" style={{ color: "#EF4444" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
