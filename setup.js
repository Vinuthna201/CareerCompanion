#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Career Companion Setup\n');

// Check if config.js already exists
if (fs.existsSync('config.js')) {
    console.log('⚠️  config.js already exists. Skipping configuration setup.');
    console.log('If you need to update your API keys, edit config.js manually.\n');
} else {
    console.log('📝 Setting up API configuration...\n');
    
    rl.question('Enter your Google Gemini API key: ', (apiKey) => {
        if (!apiKey.trim()) {
            console.log('❌ API key is required. Please run setup again.');
            rl.close();
            return;
        }

        const configContent = `// Configuration file for API keys
// This file should be added to .gitignore to keep API keys secure
const config = {
    GEMINI_API_KEY: "${apiKey.trim()}"
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}`;

        fs.writeFileSync('config.js', configContent);
        console.log('✅ config.js created successfully!\n');
        
        console.log('📦 Installing dependencies...');
        const { execSync } = require('child_process');
        try {
            execSync('npm install', { stdio: 'inherit' });
            console.log('✅ Dependencies installed successfully!\n');
        } catch (error) {
            console.log('❌ Error installing dependencies. Please run "npm install" manually.\n');
        }
        
        console.log('🎉 Setup complete! You can now run:');
        console.log('   npm run dev    # for development');
        console.log('   npm start      # for production\n');
        
        rl.close();
    });
} 