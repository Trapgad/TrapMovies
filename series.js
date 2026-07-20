document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/w500/";



async function getSeries(endpoint){

try{


const res =
await fetch(

`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`

);


const data =
await res.json();


return data.results || [];


}

catch(error){

console.log(error);

return [];

}


}







function createSeriesCard(series){


const image =

series.poster_path

?

IMAGE_URL + series.poster_path

:

"assets/images/no-image.jpg";



return `


<div class="movie-card"
onclick="openSeries(${series.id})">


<img src="${image}">


<h3>

${series.name}

</h3>


<p>

⭐ ${series.vote_average.toFixed(1)}

</p>


</div>


`;

}








async function loadSeries(){


const sections = [


{
id:"trendingSeries",
api:"/trending/tv/week"
},


{
id:"popularSeries",
api:"/tv/popular"
},


{
id:"airingSeries",
api:"/tv/airing_today"
},


{
id:"topSeries",
api:"/tv/top_rated"
}


];





for(let section of sections){


const container =
document.getElementById(section.id);



const series =
await getSeries(section.api);



container.innerHTML="";



series.forEach(show=>{


container.innerHTML +=

createSeriesCard(show);


});


}



loadHero();


}









async function loadHero(){


const series =
await getSeries(
"/trending/tv/week"
);



const random =
series[
Math.floor(
Math.random()*series.length
)
];



if(!random)
return;




document.getElementById("seriesTitle").innerHTML =
random.name;



document.getElementById("seriesOverview").innerHTML =
random.overview;



document.querySelector(".series-backdrop").style.backgroundImage =

`
linear-gradient(
90deg,
rgba(0,0,0,.95),
rgba(0,0,0,.3)
),
url(
${"https://image.tmdb.org/t/p/original/"+random.backdrop_path}
)
`;



}







loadSeries();



});





function openSeries(id){

window.location.href =
`series-details.html?id=${id}`;

}