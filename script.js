// ===============================
// TRAP MOVIES - FINAL APP.JS
// ===============================

const API_KEY = "17a1834e273320eef8a2a36b38a11964";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

/* ===============================
   SAFE SELECTORS (NO CRASHES)
=============================== */

const movieGrid = document.querySelector(".movie-grid");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

/* ===============================
   FETCH HELPER
=============================== */

async function fetchData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    } catch (error) {
        console.log("Fetch error:", error);
        return [];
    }
}

/* ===============================
   RENDER CARDS
=============================== */

function render(grid, items, type = "movie") {
    if (!grid) return;

    grid.innerHTML = "";

    items.forEach(item => {

        const title = type === "tv" ? item.name : item.title;

        const poster = item.poster_path
            ? IMAGE_URL + item.poster_path
            : "https://via.placeholder.com/500x750?text=No+Image";

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${poster}" alt="${title}">
            <h3>${title}</h3>
        `;

        card.addEventListener("click", () => {
            if (type === "tv") {
                window.location.href = `series.html`;
            } else {
                window.location.href = `movie.html?id=${item.id}`;
            }
        });

        grid.appendChild(card);
    });
}

/* ===============================
   HOME PAGE LOAD
=============================== */

async function loadHome() {

    if (!movieGrid) return;

    const trendingGrid = document.querySelector("#trending");
    const popularGrid = document.querySelector("#popular");
    const topGrid = document.querySelector("#toprated");
    const tvGrid = document.querySelector("#tvshows");

    const trending = await fetchData(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    render(trendingGrid, trending, "movie");

    const popular = await fetchData(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    render(popularGrid, popular, "movie");

    const topRated = await fetchData(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );
    render(topGrid, topRated, "movie");

    const tv = await fetchData(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}`
    );
    render(tvGrid, tv, "tv");
}

/* ===============================
   SEARCH PAGE
=============================== */

async function searchMedia(query) {
    if (!query) return;

    const resultsGrid = document.querySelector("#searchResults");
    if (!resultsGrid) return;

    const movies = await fetchData(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const tv = await fetchData(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`
    );

    const combined = [
        ...movies.map(m => ({...m, type:"movie"})),
        ...tv.map(t => ({...t, type:"tv"}))
    ];

    resultsGrid.innerHTML = "";

    combined.forEach(item => {

        const title = item.type === "tv" ? item.name : item.title;

        const poster = item.poster_path
            ? IMAGE_URL + item.poster_path
            : "https://via.placeholder.com/500x750?text=No+Image";

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${poster}" alt="${title}">
            <h3>${title}</h3>
        `;

        card.addEventListener("click", () => {
            if (item.type === "movie") {
                window.location.href = `movie.html?id=${item.id}`;
            } else {
                window.location.href = `series.html`;
            }
        });

        resultsGrid.appendChild(card);
    });
}

/* ===============================
   SEARCH EVENTS (if exists)
=============================== */

if (searchBtn && searchInput) {

    searchBtn.addEventListener("click", () => {
        searchMedia(searchInput.value.trim());
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchBtn.click();
        }
    });
}

/* ===============================
   AUTO START
=============================== */

loadHome();