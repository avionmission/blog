// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');

  // Function to set the theme
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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
});