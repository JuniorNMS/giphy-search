const API_KEY = 'NNAzRjOPUiIPvlM3m7pJ91CfqxpVGm2o'; // 🔑 Replacing this with my API key!
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const gifContainer = document.getElementById('gifContainer');
// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Existing GIPHY API code remains the same...
// (Keep search functionality from previous implementation)

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = input.value.trim();
    if (!searchTerm) return;

    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=12`
        );
        const { data } = await response.json();
        
        gifContainer.innerHTML = ''; // Clear old results
        
        data.forEach(gif => {
            const div = document.createElement('div');
            div.className = 'gif-item';
            
            const img = document.createElement('img');
            img.src = gif.images.fixed_width.url;
            img.alt = gif.title;
            
            div.appendChild(img);
            gifContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});