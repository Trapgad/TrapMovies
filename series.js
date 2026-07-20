/* ==================================
        TRAP MOVIES
        SERIES ENGINE
        TMDB TV SYSTEM
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";



/* =========================
        GET SERIES
========================= */


async function getSeries(endpoint){


try{


const response =
await fetch(

`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`

);


const data =
await response.json();


return data.results || [];


}

catch(error){


console.log(error);

return [];

}


}







/* =========================
        SERIES CARD
========================= */


function createSeriesCard(show){


const image =

show.poster_path

?

IMAGE_URL + show.poster_path

:

"assets/images/no-image.jpg";



return `


<div class="movie-card"

onclick="openSeries(${show.id})">


<img src="${image}">


<h3>

${show.name || "Unknown"}

</h3>


<p>

⭐ ${
show.vote_average
?
show.vote_average.toFixed(1)
:
"N/A"
}

</p>


</div>


`;

}









/* =========================
        LOAD TV SECTIONS
========================= */


const containers =
document.querySelectorAll(
".series-container"
);



const sections=[


"/trending/tv/week",

"/tv/popular",

"/tv/on_the_air",

"/tv/top_rated",

"/tv/airing_today"


];







async function loadSeries(){



for(
let i=0;
i<containers.length;
i++
){


const shows =
await getSeries(
sections[i]
);



containers[i].innerHTML="";



shows.forEach(show=>{


containers[i].innerHTML +=

createSeriesCard(show);


});


}



}



loadSeries();









/* =========================
        SERIES SEARCH
========================= */


const searchInput =
document.querySelector(
"#seriesSearch"
);


const searchResults =
document.querySelector(
"#seriesResults"
);







async function searchSeries(query){


const response =
await fetch(

`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`

);



const data =
await response.json();


return data.results || [];


}







searchInput?.addEventListener(
"input",
async()=>{


const value =
searchInput.value.trim();



if(!value){

searchResults.innerHTML="";

return;

}



searchResults.innerHTML=

`
<h3>
Searching...
</h3>
`;



const shows =
await searchSeries(value);



searchResults.innerHTML="";



shows.forEach(show=>{


searchResults.innerHTML +=

createSeriesCard(show);


});



});



});








/* =========================
        OPEN SERIES PAGE
========================= */


function openSeries(id){


window.location.href =

`series-details.html?id=${id}`;


}