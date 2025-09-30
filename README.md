# IN Proxy (Ultraviolet Edition)

This proxy uses [Ultraviolet](https://github.com/titaniumnetwork-dev/Ultraviolet) for fast, secure, and compatible web browsing.

## Initial Setup

1. **Clone the repo and initialize submodules:**
   ```bash
   git clone https://github.com/Schoolcoderfake/IN.git
   cd IN
   git submodule update --init --recursive
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the proxy:**
   ```bash
   npm start
   ```
   You will be prompted for your username and password in the terminal before the server starts.

## Features

- **Beautiful homepage** with theme selector (light, dark, neon, solarized, etc.)
- **Settings page:** tab cloak, pop-up blocker, about:blank, browser engine switcher, theme switcher
- **Browser engine selection:** Chrome, Firefox, Bing, Safari, Brave, Opera, DuckDuckGo (changes User-Agent)
- **Ultraviolet backend** for high compatibility and security
- **No data is logged, leaked, or stolen**
- **Website login support** (works with most major sites)
- **Fast performance**

## Privacy & Security

- No credentials or session data are logged, stored, or transmitted to third parties.
- Your browsing activity remains private.
- Change the session secret in production for added security.

## Advanced

- Ultraviolet is included as a submodule in `/ultraviolet`.
- See `/ultraviolet/README.md` for engine-specific configuration.

---

Enjoy safe and customizable proxy browsing!