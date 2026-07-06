// ===============================
// TRAP MOVIES - script.js
// ===============================

const API_KEY = "17a1834e273320eef8a2a36b38a11964";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.querySelector(".movie-grid");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

// ===============================
// LOAD POPULAR MOVIES (HOME)
// ===============================
async function loadMovies() {
    try {
        const res = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );
        const data = await res.json();

        displayMovies(data.results);

    } catch (error) {
        console.log("Error loading movies:", error);
    }
}

// ===============================
// SEARCH MOVIES
// ===============================
async function searchMovies(query) {
    try {
        const res = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );
        const data = await res.json();

        displayMovies(data.results);

    } catch (error) {
        console.log("Search error:", error);
    }
}

// ===============================
// DISPLAY MOVIES
// ===============================
function displayMovies(movies) {
    movieGrid.innerHTML = "";

    movies.forEach(movie => {

        const poster = movie.poster_path
            ? IMAGE_URL + movie.poster_path
            : "https://via.placeholder.com/500x750?text=No+Image";

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;

        // CLICK TO OPEN MOVIE DETAILS
        card.addEventListener("click", () => {
            openMovie(movie.id);
        });

        movieGrid.appendChild(card);
    });
}

// ===============================
// OPEN MOVIE DETAILS PAGE
// ===============================
function openMovie(id) {
    window.location.href = `movie.html?id=${id}`;
}

// ===============================
// SEARCH BUTTON CLICK
// ===============================
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (query !== "") {
        searchMovies(query);
    } else {
        loadMovies();
    }
});

// ===============================
// PRESS ENTER TO SEARCH
// ===============================
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// ===============================
// START APP
// ===============================
loadMovies();