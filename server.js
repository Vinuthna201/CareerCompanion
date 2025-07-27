const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

// Load configuration
let GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  try {
    const config = require('./config.js');
    GEMINI_API_KEY = config.GEMINI_API_KEY;
  } catch (e) {
    console.warn('No config.js found and GEMINI_API_KEY not set in environment.');
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API Routes
app.post('/api/generate-roadmap', async (req, res) => {
    try {
        const { prompt, schema } = req.body;
        
        console.log('Generating roadmap for prompt:', prompt);
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    response_mime_type: "application/json",
                    response_schema: schema, // THIS IS THE CRITICAL FIX
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                }
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Gemini API Error: ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        console.log('AI Response received:', data.candidates?.[0]?.content?.parts?.[0]?.text?.substring(0, 200) + '...');
        res.json(data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const { contents } = req.body;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Gemini API Error: ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/analyze-resume', async (req, res) => {
    try {
        const { resumeText, jobTitle, requiredSkills } = req.body;

        const prompt = `You are an expert ATS (Applicant Tracking System) and career coach. Analyze the following resume for a "${jobTitle}" position.
        The key skills for this role are: ${requiredSkills.join(', ')}.

        Resume Text:
        ---
        ${resumeText}
        ---

        Provide a concise analysis in markdown format. Structure your feedback with these exact headings and nothing else:
        ### ATS Score
        [Provide an estimated ATS compatibility score out of 100, for example: 85/100]
        ### Strengths
        - [List 2-3 strengths of the resume]
        ### Weaknesses
        - [List 2-3 specific, actionable areas for improvement]
        ### Suggestions for Improvement
        - [List 2-3 actionable suggestions to improve the resume and its ATS score]`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.5, maxOutputTokens: 2048 }
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Gemini API Error: ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Resume Analysis API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Make sure config.js contains your API keys!');
});
