// Inline vector paths keep the same appearance across platforms without an icon font.
window.NacreIcons = (() => {
  const paths = {
    'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
    'arrow-down-right':'<path d="m7 7 10 10M7 17h10V7"/>',
    'arrow-down':'<path d="M12 4v16m-6-6 6 6 6-6"/>',
    'arrow-up':'<path d="M12 20V4m-6 6 6-6 6 6"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    sparkle:'<path d="M12 2c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10Z"/>',
    flower:'<path d="M12 8C6-2 3 3 8 9-2 6-2 13 8 13c-8 7-3 12 3 3 2 11 9 8 4-1 10 4 11-3 1-4 9-6 4-11-2-3-1-11-8-9-2 0Z"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    shield:'<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z"/><path d="m8 12 3 3 5-6"/>',
    leaf:'<path d="M20 3C7 2 2 8 5 15c4 7 15 4 15-12Z"/><path d="M4 21 16 9"/>',
    bag:'<path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    menu:'<path class="menu-line menu-line-top" d="M3 8h18"/><path class="menu-line menu-line-bottom" d="M3 16h18"/>'
  };
  return name => `<svg class="icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.sparkle}</svg>`;
})();
