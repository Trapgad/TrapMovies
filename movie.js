const API_KEY = "17a1834e273320eef8a2a36b38a11964";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function getMovieDetails() {
    try {
        // MOVIE DETAILS
        const movieRes = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
        );
        const movie = await movieRes.json();

        // VIDEOS (TRAILER)
        const videoRes = await fetch(
            `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const videoData = await videoRes.json();

        const trailer = videoData.results.find(
            v => v.type === "Trailer" && v.site === "YouTube"
        );

        const trailerUrl = trailer
            ? `https://www.youtube.com/embed/${trailer.key}`
            : null;

        // CAST
        const castRes = await fetch(
            `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        const castData = await castRes.json();

        const castList = castData.cast.slice(0, 8);

        // GENRES
        const genres = movie.genres.map(g => g.name).join(", ");

        document.getElementById("movieDetails").innerHTML = `
            <div class="movie-main">
                <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">

                <div class="movie-info">
                    <h1>${movie.title}</h1>
                    <p><strong>⭐ Rating:</strong> ${movie.vote_average}</p>
                    <p><strong>📅 Release:</strong> ${movie.release_date}</p>
                    <p><strong>🎭 Genres:</strong> ${genres}</p>
                    <p>${movie.overview}</p>
                </div>
            </div>

            ${
                trailerUrl
                ? `<div class="trailer">
                        <h2>🎬 Trailer</h2>
                        <iframe width="100%" height="400"
                        src="${trailerUrl}"
                        frameborder="0"
                        allowfullscreen></iframe>
                   </div>`
                : ""
            }

            <div class="cast">
                <h2>⭐ Cast</h2>
                <div class="cast-grid">
                    ${castList.map(actor => `
                        <div class="cast-card">
                            <img src="${IMAGE_URL + actor.profile_path}" />
                            <p>${actor.name}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;

    } catch (error) {
        console.log(error);
    }
}

getMovieDetails();