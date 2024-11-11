import React from 'react';

interface VideoPreviewProps {
  url: string;
}

export function VideoPreview({ url }: VideoPreviewProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Video</h2>
      <video
        controls
        className="w-full rounded-lg shadow-lg"
        src={url}
      />
    </div>
  );
}