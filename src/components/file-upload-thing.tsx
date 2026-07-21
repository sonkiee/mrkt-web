import Image from "next/image";
import { useRef, useState } from "react";

export default function FileUploadThing({
  onChange,
  onBlur,
  value = [],
}: {
  onChange?: (val: File[]) => void;
  onBlur?: () => void;
  value?: File[];
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function removeFile(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange?.(updated);
  }

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;

    const newFiles = Array.from(fileList);
    const updated = [...value, ...newFiles];

    onChange?.(updated);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }
  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center bg-white hover:border-indigo-400 hover:bg-slate-50 cursor-pointer"
      >
        <p className="text-sm font-medium text-slate-800">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 10MB</p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onBlur={onBlur}
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      <div className="flex gap-3 flex-wrap mt-3">
        {value.map((file, index) => (
          <div key={file.name + index} className="relative">
            <Image
              width={100}
              height={100}
              alt={file.name}
              src={URL.createObjectURL(file)}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              onClick={() => removeFile(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <p className="mt-0 text-sm">{value.length} files selected</p>
    </div>
  );
}
