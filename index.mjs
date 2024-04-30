import express from 'express';
import { AssemblyAI } from 'assemblyai';

const app = express();
const port = 3000;

const client = new AssemblyAI({
  apiKey: '170007a7bc584fd9ba6dcb92ff136499',
});

app.use(express.json());

app.post('/transcribe', async (req, res) => {
  try {
    const { audioUrl } = req.body; // Assuming you send the audio URL in the request body

    if (!audioUrl) {
      return res.status(400).json({ error: 'Missing audio URL' });
    }

    const transcript = await client.transcripts.create({ audio_url: audioUrl });
    return res.json({ transcript: transcript.text });
  } catch (error) {
    console.error('Error transcribing audio:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
