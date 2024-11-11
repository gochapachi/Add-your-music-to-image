import React from 'react';
import { Video } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Video className="w-8 h-8 text-purple-600" />
      <h1 className="text-3xl font-bold text-gray-800">60s Video Creator</h1>
    </div>
  );
}