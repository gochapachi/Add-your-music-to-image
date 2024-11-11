import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export async function createVideo(formData: FormData): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/create-video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 second timeout
    });
    return response.data.videoUrl;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to create video');
    }
    throw error;
  }
}