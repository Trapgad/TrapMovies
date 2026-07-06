const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "17a1834e273320eef8a2a36b38a11964";

// ------------------------
// DISPLAY MOVIES
// ------------------------
function displayMovies(movies) {
    const grid = document.querySelector(".movie-grid");
    if (!grid) return;

    grid.innerHTML = movies.map(movie => `
        <a href="movie.html?id=${movie.id}" class="movie-card-link">
            <div class="movie-card">
                <img src="${movie.poster_path 
                    ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path 
                    : 'placeholder.jpg'}" 
                    alt="${movie.title}">
                <h3>${movie.title}</h3>
            </div>
        </a>
    `).join("");
}

// ------------------------
// TRENDING MOVIES
// ------------------------
async function fetchTrendingMovies() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();

    if (data.results) {
        displayMovies(data.results);
    }
}

// ------------------------
// SEARCH MOVIES
// ------------------------
function searchMovies() {
    const input = document.getElementById("search-input");
    if (!input) return;

    input.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            const query = input.value;
            if (!query) return;

            const res = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
            );

            const data = await res.json();

            if (data.results) {
                displayMovies(data.results);
            }
        }
    });
}

// ------------------------
// MOVIE DETAILS
// ------------------------
async function fetchMovieDetails() {
    const container = document.querySelector(".details-container");
    if (!container) return;

    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;

    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const movie = await res.json();

    container.innerHTML = `
        <div class="movie-poster">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>

        <div class="movie-info">
            <h1>${movie.title}</h1>
            <p>${movie.release_date}</p>
            <p>⭐ ${movie.vote_average}/10</p>
            <p>${movie.overview}</p>
            <button>Watch Now</button>
        </div>
    `;
}

// ------------------------
// RUN ON PAGE LOAD
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
    fetchTrendingMovies();
    searchMovies();
    fetchMovieDetails();
});