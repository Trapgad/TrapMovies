/* ==================================
        TRAP MOVIES
        REELS V2 ENGINE
        TIKTOK MOVIE FEED
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/original/";



const container =
document.querySelector("#reelsContainer");





async function fetchData(url){

const response =
await fetch(url);

return await response.json();

}





async function getTrending(){

const data =
await fetchData(

`${BASE_URL}/trending/all/week?api_key=${API_KEY}`

);


return data.results || [];

}





async function getTrailer(id,type){


const data =
await fetchData(

`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`

);



return data.results?.find(video=>

video.site==="YouTube"

&&

video.type==="Trailer"

);

}







// =========================
// LOAD REELS
// =========================


async function loadReels(){


const items =
await getTrending();



container.innerHTML="";



for(const item of items.slice(0,20)){



const type =
item.media_type==="tv"
?
"tv"
:
"movie";



const trailer =
await getTrailer(
item.id,
type
);




const backdrop =

item.backdrop_path

?

`${IMAGE_URL}${item.backdrop_path}`

:

"assets/images/no-image.jpg";





container.innerHTML += `


<section class="reel">



${
trailer

?

`

<iframe

class="reel-video"

src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0"

allowfullscreen>

</iframe>

`

:

`

<img

class="reel-image"

src="${backdrop}">

`

}




<div class="reel-gradient"></div>




<div class="reel-info">


<h1>

${item.title || item.name}

</h1>


<p>

⭐ ${item.vote_average?.toFixed(1) || "N/A"}

</p>



<button onclick="openContent('${type}',${item.id})">

▶ Watch Now

</button>


</div>




</section>


`;



}



}



loadReels();






window.openContent=function(type,id){


if(type==="movie"){


window.location.href =
`movie.html?id=${id}`;


}

else{


window.location.href =
`series-details.html?id=${id}`;


}



}



});