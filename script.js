const API_KEY = "17a1834e273320eef8a2a36b38a11964";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const grids = document.querySelectorAll(".movie-grid");

async function loadMovies() {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );

        const data = await response.json();

        grids.forEach(grid => {
            grid.innerHTML = "";

            data.results.forEach(movie => {

                const card = document.createElement("div");
                card.className = "movie-card";

                card.innerHTML = `
                    <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                `;

                grid.appendChild(card);
            });
        });

    } catch (error) {
        console.log(error);
    }
}

loadMovies();