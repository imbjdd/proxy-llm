const express = require('express');
const { request } = require('undici');  
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const response = await request('http://13.202.194.117:5000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.body.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy API http://localhost:${port}`);
});

