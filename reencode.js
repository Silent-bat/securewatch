const ffmpegPath = require('ffmpeg-static');
const { spawn } = require('child_process');
const path = require('path');

const inputPath = path.join(__dirname, 'public/bf7f521f-a781155a-Picwand.mp4');
const outputPath = path.join(__dirname, 'public/optimized-video.mp4');

console.log(`Re-encoding video from ${inputPath} to ${outputPath}...`);

const ffmpeg = spawn(ffmpegPath, [
    '-i', inputPath,
    '-c:v', 'libx264',
    '-g', '1',              // Keyframe every frame (GOP=1) for smooth scrubbing
    '-an',                  // Remove audio
    '-preset', 'ultrafast', // Fast encoding
    '-crf', '23',           // Good quality
    '-movflags', '+faststart', // Optimize for web streaming
    '-y',                   // Overwrite output
    outputPath
]);

ffmpeg.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ffmpeg.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

ffmpeg.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    if (code === 0) {
        console.log('Video re-encoding complete!');
    } else {
        console.error('Video re-encoding failed.');
    }
});
