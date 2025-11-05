// assets/nav.js
function createNavBar(activePage) {
  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.innerHTML = `
    <button onclick="go('life.html')" class="${activePage === 'life' ? 'active' : ''}">🌅<span>Life</span></button>
    <button onclick="go('dreams.html')" class="${activePage === 'dreams' ? 'active' : ''}">💭<span>Dreams</span></button>
    <button onclick="go('reflections.html')" class="${activePage === 'reflections' ? 'active' : ''}">🪞<span>Reflect</span></button>
    <button onclick="go('stars.html')" class="${activePage === 'stars' ? 'active' : ''}">⭐<span>Stars</span></button>
    <button onclick="go('profile.html')" class="${activePage === 'profile' ? 'active' : ''}">👤<span>Profile</span></button>
  `;
  document.body.appendChild(nav);
}

function go(page) {
  window.location.href = page;
}

// Inject shared styles
const style = document.createElement("style");
style.textContent = `
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background: rgba(255,255,255,0.95);
  display: flex;
  justify-content: space-around;
  border-radius: 30px 30px 0 0;
  padding: 8px 0;
  box-shadow: 0 -2px 20px rgba(0,0,0,0.1);
  backdrop-filter: blur(8px);
}
.bottom-nav button {
  flex: 1;
  background: none;
  border: none;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 0;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.bottom-nav button.active {
  color: #2563eb;
  transform: translateY(-2px);
}
.bottom-nav button.active span {
  font-weight: 700;
}
.bottom-nav button:hover {
  color: #1e3a8a;
}
.bottom-nav span {
  font-size: 12px;
}
`;
document.head.appendChild(style);
