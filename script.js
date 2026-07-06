const API_KEY = "17a1834e273320eef8a2a36b38a11964";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.querySelector(".movie-grid");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

// Load Popular Movies
async function loadMovies() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();
    displayMovies(data.results);
}

// Search Movies
async function searchMovies(query) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    displayMovies(data.results);
}

// Display Movies
function displayMovies(movies) {
    movieGrid.innerHTML = "";

    movies.forEach(movie => {

        const poster = movie.poster_path
            ? IMAGE_URL + movie.poster_path
            : "https://via.placeholder.com/500x750?text=No+Image";

        movieGrid.innerHTML += `
        <div class="movie-card">
            <img src="${poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        </div>
        `;
    });
}

// Search Button
searchBtn.addEventListener("click", () => {

    const query = searchInput.value.trim();

    if(query !== ""){
        searchMovies(query);
    }else{
        loadMovies();
    }

});

// Enter Key
searchInput.addEventListener("keypress", e=>{

    if(e.key==="Enter"){
        searchBtn.click();
    }

});

// Start
loadMovies();