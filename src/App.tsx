import React, { useState } from 'react';
import { Image as ImageIcon, Music, Loader2, Upload } from 'lucide-react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { VideoPreview } from './components/VideoPreview';
import { createVideo } from './services/api';

function App() {
  const [companyName, setCompanyName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !audio) return;

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('image', image);
    formData.append('audio', audio);

    try {
      const url = await createVideo(formData);
      setVideoUrl(url);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create video');
      console.error('Error creating video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Header />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload
                  id="image-upload"
                  label="Upload Image"
                  Icon={ImageIcon}
                  accept="image/*"
                  file={image}
                  onChange={setImage}
                />
                <FileUpload
                  id="audio-upload"
                  label="Upload Audio"
                  Icon={Music}
                  accept="audio/*"
                  file={audio}
                  onChange={setAudio}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Video...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Create Video
                  </>
                )}
              </button>
            </form>

            {videoUrl && <VideoPreview url={videoUrl} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;