# Career Companion

An AI-powered career development platform that helps users explore career paths, build skills, and prepare for job interviews.

## Features

- 🤖 **AI-Powered Career Roadmaps**: Generate personalized career paths using Google Gemini AI
- 📚 **Interactive Learning**: Video tutorials and project-based learning
- 🎯 **Skill Tracking**: Monitor your progress and acquired skills
- 💼 **Mock Interviews**: Practice with AI-powered interview simulations
- 🏆 **Gamification**: Earn badges and track achievements
- 📄 **PDF Export**: Share your roadmap as a professional PDF document
- 🌙 **Dark/Light Theme**: Customizable user interface
- 📱 **Responsive Design**: Works on desktop and mobile devices

### PDF Export Feature

The "Share My Roadmap" feature allows users to export their career roadmap as a professional PDF document. The exported PDF includes:

- **Personalized Header**: User's name and generation date
- **Career Path Overview**: Complete description and requirements
- **Skill Analysis**: Visual representation of acquired vs. missing skills
- **Project Suggestions**: Detailed project recommendations with difficulty levels
- **Learning Resources**: List of educational materials and completion status
- **Company Stacks**: Technology stacks used by top companies
- **Professional Formatting**: Clean, print-ready layout suitable for sharing

Users can access this feature by clicking the "Share My Roadmap" button on any roadmap page. The first PDF export earns users a "PDF Exporter" badge.

## Security

This project implements secure API key management:

- ✅ API keys are stored server-side only
- ✅ Frontend never exposes sensitive credentials
- ✅ All API calls are proxied through a secure backend
- ✅ Configuration files are gitignored

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd career-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API keys**
   ```bash
   # Copy the example config file
   cp config.example.js config.js
   
   # Edit config.js and add your actual API keys
   # Replace YOUR_GEMINI_API_KEY_HERE with your real API key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Deployment

1. **Install production dependencies**
   ```bash
   npm install --production
   ```

2. **Set environment variables** (optional)
   ```bash
   export PORT=3000
   ```

3. **Start the production server**
   ```bash
   npm start
   ```

## API Configuration

### Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `config.js` file:
   ```javascript
   const config = {
       GEMINI_API_KEY: "your-actual-api-key-here"
   };
   ```

## Project Structure

```
career-companion/
├── index.html          # Main application file
├── server.js           # Backend API server
├── config.js           # API configuration (gitignored)
├── config.example.js   # Example configuration
├── package.json        # Node.js dependencies
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── assets/
    └── chatbot-avatar.png
```

## Security Best Practices

- Never commit API keys to version control
- Use environment variables in production
- Implement rate limiting for API endpoints
- Validate all user inputs
- Use HTTPS in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions, please open an issue on GitHub.

---

**Note**: This is a hackathon project. For production use, additional security measures and error handling should be implemented. 