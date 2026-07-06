const API_KEY = '17a1834e273320eef8a2a36b38a11964'; // Put your new key here
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchTrendingMovies() {
    const grid = document.querySelector('.movie-grid');
    if (!grid) return;

    try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
        const data = await response.json();
        
        grid.innerHTML = data.results.map(movie => `
            <div class="movie-card">
                <img src="${movie.poster_path ? IMAGE_URL + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Poster'}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
        grid.innerHTML = '<p>Failed to load movies. Please check your API key.</p>';
    }
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', fetchTrendingMovies);
