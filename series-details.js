/* ==================================
        TRAP MOVIES
        SERIES DETAILS ENGINE
        TMDB TV PREMIUM SYSTEM
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const ORIGINAL_IMAGE =
"https://image.tmdb.org/t/p/original/";


const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";



const seriesID =
new URLSearchParams(
window.location.search
).get("id");



if(!seriesID){

console.log("No Series ID");

return;

}






/* =========================
        FETCH DATA
========================= */


async function fetchData(endpoint){


try{


const response =
await fetch(

`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`

);


return await response.json();


}

catch(error){


console.log(error);

return null;


}


}







function setText(id,value){


const element =
document.querySelector(id);



if(element){

element.textContent =
value || "N/A";

}


}









/* =========================
        SERIES DETAILS
========================= */


async function loadSeries(){


const series =
await fetchData(
`/tv/${seriesID}`
);



if(!series)
return;





/* BACKDROP */


const backdrop =
document.querySelector(
".series-details-backdrop"
);



if(backdrop && series.backdrop_path){


backdrop.style.backgroundImage =

`

linear-gradient(
90deg,
rgba(5,5,5,.95),
rgba(5,5,5,.3)
),

url(${ORIGINAL_IMAGE}${series.backdrop_path})

`;

}





/* POSTER */


const poster =
document.querySelector(
"#seriesPoster"
);



if(poster){


poster.src =

series.poster_path

?

IMAGE_URL + series.poster_path

:

"assets/images/no-image.jpg";


}






setText(
"#seriesTitle",
series.name
);



setText(
"#seriesDescription",
series.overview
);



setText(
"#seriesYear",
series.first_air_date?.substring(0,4)
);



setText(
"#seriesSeasons",
`${series.number_of_seasons || 0} Seasons`
);



setText(
"#seriesEpisodes",
`${series.number_of_episodes || 0} Episodes`
);






const rating =
document.querySelector(
"#seriesRating"
);



if(rating){


rating.innerHTML =

`
⭐ ${series.vote_average.toFixed(1)}
`;

}






/* GENRES */


const genres =
document.querySelector(
"#seriesGenres"
);



if(genres){


genres.innerHTML="";



series.genres.forEach(genre=>{


genres.innerHTML +=

`

<span>

${genre.name}

</span>

`;

});


}







setText(

"#seriesNetwork",

series.networks
?.map(net=>net.name)
.join(", ")

);



setText(

"#seriesCountry",

series.production_countries
?.map(country=>country.name)
.join(", ")

);



setText(

"#seriesLanguages",

series.spoken_languages
?.map(lang=>lang.english_name)
.join(", ")

);



setText(

"#seriesCreator",

series.created_by
?.map(person=>person.name)
.join(", ")

);






loadWatchlist(series);


}









/* =========================
        TRAILER
========================= */


async function loadTrailer(){


const data =
await fetchData(

`/tv/${seriesID}/videos`

);



const box =
document.querySelector(
"#seriesTrailer"
);



if(!box)
return;



const trailer =

data.results.find(video=>

video.type==="Trailer"

&&

video.site==="YouTube"

);





if(trailer){


box.innerHTML =

`

<iframe

src="https://www.youtube.com/embed/${trailer.key}"

allowfullscreen>

</iframe>

`;



}

else{


box.innerHTML=

`

<p>

Trailer not available

</p>

`;

}



}









/* =========================
        CAST
========================= */


async function loadCast(){


const data =
await fetchData(

`/tv/${seriesID}/credits`

);



const container =
document.querySelector(
"#seriesCast"
);



if(!container)
return;



container.innerHTML="";



data.cast
.slice(0,12)
.forEach(actor=>{



const image =

actor.profile_path

?

IMAGE_URL + actor.profile_path

:

"assets/images/no-user.jpg";




container.innerHTML +=

`

<div class="cast-card">


<img src="${image}">


<h3>

${actor.name}

</h3>


<p>

${actor.character}

</p>


</div>

`;



});



}









/* =========================
        EPISODES
========================= */


async function loadEpisodes(){


const series =
await fetchData(
`/tv/${seriesID}`
);



const container =
document.querySelector(
"#episodeContainer"
);



if(!container)
return;



container.innerHTML="";



const seasons =
series.seasons
.filter(
season=>season.season_number !==0
)
.slice(0,1);



seasons.forEach(season=>{


container.innerHTML +=

`

<div class="episode-card">


<h3>

Season ${season.season_number}

</h3>


<p>

${season.episode_count} Episodes

</p>


</div>

`;



});



}









/* =========================
        SIMILAR SERIES
========================= */


async function loadSimilar(){


const data =
await fetchData(

`/tv/${seriesID}/similar`

);



const box =
document.querySelector(
"#similarSeries"
);



if(!box)
return;



box.innerHTML="";



data.results
.slice(0,10)
.forEach(show=>{


box.innerHTML +=

`

<div class="movie-card"

onclick="openSeries(${show.id})">


<img src="${
show.poster_path
?
IMAGE_URL+show.poster_path
:
"assets/images/no-image.jpg"
}">


<h3>

${show.name}

</h3>


<p>

⭐ ${show.vote_average.toFixed(1)}

</p>


</div>

`;



});


}









/* =========================
        MY LIST
========================= */


function loadWatchlist(series){


const button =
document.querySelector(
"#seriesWatchlist"
);



if(!button)
return;



let list =

JSON.parse(
localStorage.getItem("seriesList")
)

|| [];





button.onclick=()=>{


const exists =
list.find(
item=>item.id===series.id
);



if(exists){


list =
list.filter(
item=>item.id!==series.id
);



button.innerHTML =
"+ Add To My List";


}

else{


list.push({

id:series.id,

title:series.name,

poster:series.poster_path

});



button.innerHTML =
"✓ Added To My List";


}



localStorage.setItem(

"seriesList",

JSON.stringify(list)

);



};



}









/* =========================
        START ENGINE
========================= */


loadSeries();

loadTrailer();

loadCast();

loadEpisodes();

loadSimilar();



});







/* OPEN SERIES */

function openSeries(id){


window.location.href =

`series-details.html?id=${id}`;

}