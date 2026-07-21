/* ==================================
        TRAP MOVIES
        SERIES ENGINE
        TMDB TV SYSTEM
        PREMIUM VERSION
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";





/* =========================
        GET SERIES DATA
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


console.log(
"TMDB SERIES ERROR:",
error
);


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



<img src="${image}" alt="${show.name || "Unknown"}">



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
        SERIES SECTIONS
========================= */


const containers = [


document.querySelector("#trendingSeries"),


document.querySelector("#popularSeries"),


document.querySelector("#airingSeries"),


document.querySelector("#topSeries")


];





const sections=[


"/trending/tv/week",


"/tv/popular",


"/tv/on_the_air",


"/tv/top_rated"


];









async function loadSeries(){



for(
let i=0;
i<containers.length;
i++
){



if(!containers[i]) continue;



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



try{


const response =

await fetch(

`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&language=en-US`

);



const data =

await response.json();



return data.results || [];



}



catch(error){


console.log(
"SEARCH ERROR:",
error
);


return [];


}


}









searchInput?.addEventListener(

"input",

async()=>{



const value =

searchInput.value.trim();




if(!value){


if(searchResults)

searchResults.innerHTML="";


return;


}






if(searchResults)

searchResults.innerHTML =

`

<div class="loading">

Searching Series...

</div>

`;







const shows =

await searchSeries(value);






if(searchResults)

searchResults.innerHTML="";





shows.forEach(show=>{



if(searchResults)

searchResults.innerHTML +=

createSeriesCard(show);



});



}

);







/* =========================
        OPEN SERIES DETAILS
========================= */


window.openSeries = function(id){


window.location.href =

`series-details.html?id=${id}`;


};



});