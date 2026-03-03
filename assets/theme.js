// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');

  function getUtterancesTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark' ? 'github-dark' : 'github-light';
  }

  function updateUtterancesTheme() {
    const theme = getUtterancesTheme();
    
    // Update the script tag's data-theme for future page loads
    const utterancesScript = document.querySelector('script[src*="utteranc.es"]');
    if (utterancesScript) {
      utterancesScript.setAttribute('data-theme', theme);
    }
    
    // Update the currently loaded iframe
    const utterances = document.querySelector('iframe[src*="utteranc.es"]');
    if (utterances && utterances.contentWindow) {
      const message = { type: 'set-theme', theme: theme };
      utterances.contentWindow.postMessage(message, 'https://utteranc.es');
    }
  }

  // Function to set the theme
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateUtterancesTheme();
  }

  // Function to toggle the theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  // Add click event listener to the toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Apply Utterances theme after a short delay to ensure iframe is loaded
  setTimeout(updateUtterancesTheme, 1000);
  setTimeout(updateUtterancesTheme, 2000);
});
