export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST required' });
  }

  let body = {};

  try {
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else if (req.body && typeof req.body === 'object') {
      body = req.body;
    }
  } catch {
    body = {};
  }

  const prompt = String(body?.prompt || '').trim();

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt required' });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';
    const referer = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    if (!apiKey) {
      return res.status(500).json({ error: 'OpenRouter API key missing' });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': referer,
        'X-Title': 'StreamFlix',  
      },
      body: JSON.stringify({
        model,
        temperature: 0.35,
        max_tokens: 300,
        messages: [
          {
            role: 'system',
            content: `You are StreamFlix Intelligence, a movie and TV recommendation assistant.
Return JSON only in this exact shape: {"titles":["Title 1","Title 2"]}.
Return 5 to 8 real movies or TV series that match the user's request. Never invent titles. Do not add explanations outside JSON.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('OpenRouter error:', response.status, text.slice(0, 1000));
      return res.status(502).json({ error: 'AI provider unavailable' });
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content || '';
    const match = raw.match(/\{[\s\S]*\}/);
    const jsonText = match ? match[0] : '{"titles":[]}';

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      parsed = { titles: [] };
    }

    const titles = Array.isArray(parsed.titles)
      ? parsed.titles
          .map((title) => String(title).trim())
          .filter(Boolean)
          .slice(0, 8)
      : [];

    return res.status(200).json({ titles });
  } catch (error) {
    console.error('Recommend handler error:', error);
    return res.status(500).json({ error: 'Recommendation service unavailable' });
  }
}
