const express = require('express');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const UV_PATH = path.join(__dirname, 'ultraviolet');
const PORT = process.env.PORT || 3000;

// Supported browser engines and their user agents
const USER_AGENTS = {
  chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
  firefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0',
  bing: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BingPreview/1.0b',
  safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  brave: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Brave/117.0.0.0',
  opera: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Opera/104.0.0.0',
  duckduckgo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptLogin() {
  return new Promise((resolve) => {
    rl.question('Username: ', (username) => {
      rl.question('Password: ', (password) => {
        resolve({ username, password });
      });
    });
  });
}

(async () => {
  const { username, password } = await promptLogin();
  rl.close();

  // TODO: You may want to store and verify credentials securely for production.
  if (!username || !password) {
    console.error('Username and password required.');
    process.exit(1);
  }

  // Start Ultraviolet backend (see Ultraviolet README for custom launch)
  exec('npm install', { cwd: UV_PATH }, (err) => {
    if (err) {
      console.error('Failed to install Ultraviolet dependencies.');
      process.exit(1);
    }

    // You can start Ultraviolet's backend as required, or use its middleware directly.
    // For now, we assume Ultraviolet exposes a middleware function.
    const uv = require(path.join(UV_PATH, 'index.js')); // Adjust if main file is different

    const app = express();

    app.use(express.static(path.join(__dirname, 'public')));

    // Theme, browser selection, and other settings from client
    app.use((req, res, next) => {
      // Block pop-ups (headers)
      res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; frame-src 'self';");
      next();
    });

    // Proxy route for Ultraviolet
    app.use('/proxy', (req, res, next) => {
      // Get browser engine from query param or default to chrome
      const engine = (req.query.engine || 'chrome').toLowerCase();
      req.headers['user-agent'] = USER_AGENTS[engine] || USER_AGENTS['chrome'];
      uv(req, res, next);
    });

    app.listen(PORT, () => {
      console.log(`IN Proxy running at http://localhost:${PORT}`);
    });
  });
})();
