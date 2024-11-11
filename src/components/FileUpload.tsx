import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FileUploadProps {
  id: string;
  label: string;
  Icon: LucideIcon;
  accept: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export function FileUpload({ id, label, Icon, accept, file, onChange }: FileUploadProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="hidden"
          id={id}
          required
        />
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
        >
          <Icon className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">
            {file ? file.name : `Click to upload ${label.toLowerCase()}`}
          </span>
        </label>
      </div>
    </div>
  );
}