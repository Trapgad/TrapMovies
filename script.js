const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const seriesGrid = document.getElementById("seriesGrid");

// Load TV Series
async function loadSeries() {
    try {
        const res = await fetch(
            `${BASE_URL}/tv/popular?api_key=${API_KEY}`
        );

        const data = await res.json();

        displaySeries(data.results);

    } catch (error) {
        console.log(error);
    }
}

// Display Series
function displaySeries(seriesList) {
    seriesGrid.innerHTML = "";

    seriesList.forEach(show => {

        const poster = show.poster_path
            ? IMAGE_URL + show.poster_path
            : "https://via.placeholder.com/500x750?text=No+Image";

        seriesGrid.innerHTML += `
            <div class="movie-card">
                <img src="${poster}" alt="${show.name}">
                <h3>${show.name}</h3>
            </div>
        `;
    });
}

loadSeries();