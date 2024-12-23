import { useState } from "react";
import { Upload } from "lucide-react";

export const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
    // TODO: Implement file processing logic
  };

  return (
    <div
      className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
        isDragging ? "border-primary bg-primary/5" : "border-secondary"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-secondary-foreground">
        Drag and drop your file here, or{" "}
        <label className="text-primary cursor-pointer hover:text-primary-hover">
          browse
          <input type="file" className="hidden" onChange={(e) => console.log("Selected files:", e.target.files)} />
        </label>
      </p>
      <p className="text-sm text-muted-foreground mt-2">Supports .txt, .doc, .docx files</p>
    </div>
  );
};