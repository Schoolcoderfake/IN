const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const config = {
  username: "", // <-- Set your username here
  password: "", // <-- Set your password here
  challenge: false // Set to true to enable challenge question at login
};

function generateChallenge() {
  // Simple math challenge
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return {
    question: `What is ${a} + ${b}?`,
    answer: (a + b).toString()
  };
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'in-proxy-secret',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
  let challengeHtml = '';
  if (config.challenge) {
    // Generate and store challenge in session
    const challenge = generateChallenge();
    req.session.challenge = challenge;
    challengeHtml = `
      <label>${challenge.question}</label>
      <input type="text" name="challenge" required />
      <br/><br/>
    `;
  }
  res.send(`
    <form method="POST" action="/login">
      <label>Username:</label>
      <input type="text" name="username" required /><br/><br/>
      <label>Password:</label>
      <input type="password" name="password" required /><br/><br/>
      ${challengeHtml}
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password, challenge } = req.body;
  if (username === config.username && password === config.password) {
    if (config.challenge) {
      if (!req.session.challenge || challenge !== req.session.challenge.answer) {
        return res.send('Challenge failed. <a href="/login">Try again</a>');
      }
    }
    req.session.authenticated = true;
    return res.redirect('/');
  }
  res.send('Invalid credentials. <a href="/login">Try again</a>');
});

// Auth middleware
app.use((req, res, next) => {
  if (req.session.authenticated || req.path === '/login') {
    return next();
  }
  res.redirect('/login');
});

app.use('/proxy', createProxyMiddleware({
  target: '', // Will be set dynamically
  changeOrigin: true,
  router: req => req.query.url || '',
  pathRewrite: { '^/proxy': '' }
}));

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});