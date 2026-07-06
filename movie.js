const API_KEY = "17a1834e273320eef8a2a36b38a11964";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function getMovieDetails(){
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
    const data = await res.json();

    document.getElementById("movieDetails").innerHTML = `
        <h1>${data.title}</h1>
        <img src="${IMAGE_URL + data.poster_path}" width="250">
        <p><b>Rating:</b> ${data.vote_average}</p>
        <p><b>Release Date:</b> ${data.release_date}</p>
        <p>${data.overview}</p>
    `;
}

getMovieDetails();