import { join } from 'path';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';

export async function createVideo(req, res) {
  try {
    const files = req.files;
    if (!files?.image?.[0] || !files?.audio?.[0]) {
      return res.status(400).json({ error: 'Missing required files' });
    }

    const imagePath = files.image[0].path;
    const audioPath = files.audio[0].path;
    const outputPath = join('uploads', `${Date.now()}-output.mp4`);

    // Validate file existence
    await Promise.all([
      fs.access(imagePath),
      fs.access(audioPath)
    ]).catch(() => {
      throw new Error('Upload files not accessible');
    });

    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(imagePath)
        .inputOptions(['-loop 1'])
        .input(audioPath)
        .outputOptions([
          '-c:v libx264',
          '-tune stillimage',
          '-c:a aac',
          '-b:a 192k',
          '-pix_fmt yuv420p',
          '-shortest',
          '-t 60' // Ensure 60 seconds duration
        ])
        .output(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });

    const videoUrl = `http://localhost:${process.env.PORT || 3000}/${outputPath}`;
    
    // Clean up uploaded files
    await Promise.all([
      fs.unlink(imagePath),
      fs.unlink(audioPath)
    ]).catch(console.error);

    res.json({ videoUrl });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ 
      error: 'Failed to create video',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}