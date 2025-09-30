# IN Proxy

A web proxy inspired by Interstellar Proxy, with built-in username/password protection and an optional challenge question for enhanced security.

## Features

- **Username & Password Login:** Only users with correct credentials can use the proxy.
- **Challenge Protection:** Optionally enable a math challenge during login for extra security.
- **Simple Web UI:** Browse proxied sites in an iframe.

## Setup

### 1. Clone the repository

```sh
git clone https://github.com/Schoolcoderfake/IN.git
cd IN
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure authentication and security

Open `server.js` and set your username, password, and challenge option in the config section:

```js
const config = {
  username: "your_username", // REQUIRED: Set your username
  password: "your_password", // REQUIRED: Set your password
  challenge: false // Optional: Set to true to require a math challenge during login
};
```

- If `challenge` is set to `true`, users will need to answer a simple math question to log in.

### 4. Run the proxy server

```sh
npm start
```

### 5. Access the web interface

Open [http://localhost:3000](http://localhost:3000) in your browser. You will be prompted to log in.

## Usage

- Enter the URL you want to proxy after logging in.
- The proxied page will be loaded in the iframe below the form.

## Security Notes

- **Change the default secret** in `express-session` for production use.
- Authentication credentials are stored in plain text in `server.js`. Use environment variables or a secure config for production.
- For real deployment, consider HTTPS, rate limiting, and more advanced security protections.

## Troubleshooting

If you get "Invalid credentials" or "Challenge failed," make sure you entered the correct username, password, and solved the math challenge (if enabled).

---

Enjoy safe and secure proxy browsing with IN Proxy!
