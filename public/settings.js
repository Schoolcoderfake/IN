// Modal logic
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const saveSettings = document.getElementById('saveSettings');
const themeSelect = document.getElementById('themeSelect');
const cloakTitle = document.getElementById('cloakTitle');
const cloakFavicon = document.getElementById('cloakFavicon');
const popupBlocker = document.getElementById('popupBlocker');

// Open/close modal
settingsBtn.onclick = () => settingsModal.style.display = 'block';
closeSettings.onclick = () => settingsModal.style.display = 'none';
window.onclick = evt => {
  if (evt.target == settingsModal) settingsModal.style.display = 'none';
};

// Load settings from localStorage if present
window.onload = function() {
  const theme = localStorage.getItem('theme');
  if (theme) document.body.className = theme;
  themeSelect.value = theme || 'theme-light';
  cloakTitle.value = localStorage.getItem('cloakTitle') || '';
  cloakFavicon.value = localStorage.getItem('cloakFavicon') || '';
  popupBlocker.checked = localStorage.getItem('popupBlocker') !== 'false';
};

// Save settings
saveSettings.onclick = function() {
  localStorage.setItem('theme', themeSelect.value);
  document.body.className = themeSelect.value;
  localStorage.setItem('cloakTitle', cloakTitle.value);
  localStorage.setItem('cloakFavicon', cloakFavicon.value);
  localStorage.setItem('popupBlocker', popupBlocker.checked);
  if (cloakTitle.value) document.getElementById('tab-title').textContent = cloakTitle.value;
  if (cloakFavicon.value) {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon'; link.rel = 'shortcut icon'; link.href = cloakFavicon.value;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  settingsModal.style.display = 'none';
};

// Proxy form
document.getElementById('proxyForm').onsubmit = function(e) {
  e.preventDefault();
  const url = document.getElementById('urlInput').value;
  const engine = document.getElementById('engineSelect').value;
  document.getElementById('proxyFrame').src = `/proxy?url=${encodeURIComponent(url)}&engine=${encodeURIComponent(engine)}`;
};

// About:blank button
document.getElementById('aboutBlankBtn').onclick = function() {
  const url = document.getElementById('urlInput').value;
  const engine = document.getElementById('engineSelect').value;
  const proxyUrl = `/proxy?url=${encodeURIComponent(url)}&engine=${encodeURIComponent(engine)}`;
  const win = window.open('about:blank');
  win.document.write(`<iframe src="${proxyUrl}" style="width:100vw;height:100vh;border:none;"></iframe>`);
};

// Pop-up blocker (client side, best-effort)
if (localStorage.getItem('popupBlocker') !== 'false') {
  window.open = function() {
    alert('Pop-ups are blocked by proxy settings.');
    return null;
  };
}