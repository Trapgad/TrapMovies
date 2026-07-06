// ===============================
// TRAP MOVIES - FINAL APP.JS
// ===============================

const API_KEY = "17a1834e273320eef8a2a36b38a11964";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";


// ===============================
// SAFE SELECTORS
// ===============================

const movieGrid = document.querySelector(".movie-grid");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");


// ===============================
// FETCH FUNCTION
// ===============================

async function fetchData(url) {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        return data.results || [];

    } catch(error) {

        console.log("Fetch Error:", error);

        return [];

    }

}


// ===============================
// CREATE MOVIE CARD
// ===============================

function createCard(item, type="movie") {


    const title = type === "tv"
        ? item.name
        : item.title;


    const poster = item.poster_path
        ? IMAGE_URL + item.poster_path
        : "https://via.placeholder.com/500x750?text=No+Image";


    const card = document.createElement("div");

    card.className = "movie-card";


    card.innerHTML = `

        <img src="${poster}" alt="${title}">

        <h3>${title}</h3>

    `;


    card.onclick = () => {


        if(type === "tv") {

            window.location.href =
            `series.html?id=${item.id}`;

        }

        else {

            window.location.href =
            `movie.html?id=${item.id}`;

        }


    };


    return card;

}


// ===============================
// DISPLAY MOVIES
// ===============================

function render(grid, items, type="movie") {


    if(!grid) return;


    grid.innerHTML="";


    if(items.length === 0){

        grid.innerHTML =
        "<h3>No movies found</h3>";

        return;

    }


    items.forEach(item=>{

        grid.appendChild(
            createCard(item,type)
        );

    });


}


// ===============================
// HOME PAGE
// ===============================

async function loadHome(){


    if(!movieGrid) return;


    const trendingGrid =
    document.querySelector("#trending");


    const popularGrid =
    document.querySelector("#popular");


    const topGrid =
    document.querySelector("#toprated");


    const tvGrid =
    document.querySelector("#tvshows");



    if(trendingGrid)
    trendingGrid.innerHTML =
    "<h3>Loading...</h3>";


    const trending =
    await fetchData(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );


    render(
    trendingGrid,
    trending
    );



    const popular =
    await fetchData(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );


    render(
    popularGrid,
    popular
    );



    const topRated =
    await fetchData(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );


    render(
    topGrid,
    topRated
    );



    const series =
    await fetchData(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}`
    );


    render(
    tvGrid,
    series,
    "tv"
    );


}



// ===============================
// SEARCH SYSTEM
// ===============================

async function searchMedia(query){


    if(!query) return;


    const resultsGrid =
    document.querySelector("#searchResults");


    if(!resultsGrid) return;



    resultsGrid.innerHTML =
    "<h3>Searching...</h3>";



    const movies =
    await fetchData(

    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`

    );



    const tv =
    await fetchData(

    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`

    );



    const movieResults =
    movies.map(movie=>({
        ...movie,
        type:"movie"
    }));


    const tvResults =
    tv.map(series=>({
        ...series,
        type:"tv"
    }));



    const results = [

        ...movieResults,
        ...tvResults

    ];



    resultsGrid.innerHTML="";



    results.forEach(item=>{


        resultsGrid.appendChild(

            createCard(
                item,
                item.type
            )

        );


    });


}



// ===============================
// SEARCH EVENTS
// ===============================


if(searchBtn && searchInput){


    searchBtn.addEventListener(
    "click",
    ()=>{

        searchMedia(
        searchInput.value.trim()
        );

    });


    searchInput.addEventListener(
    "keypress",
    (event)=>{


        if(event.key==="Enter"){

            searchBtn.click();

        }


    });


}



// ===============================
// START WEBSITE
// ===============================

loadHome(); 