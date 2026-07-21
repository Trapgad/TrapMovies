/* ==================================
        TRAP MOVIES
        REELS ENGINE
        TMDB SYSTEM
        PREMIUM VERSION
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/original";



const container =
document.querySelector("#reelsContainer");



if(!container) return;




/* =========================
        GET TRENDING
========================= */


async function getTrending(){


try{


const response = await fetch(

`${BASE_URL}/trending/all/week?api_key=${API_KEY}`

);



const data = await response.json();



return data.results || [];


}



catch(error){


console.log(
"TMDB REELS ERROR:",
error
);


return [];


}


}






/* =========================
        LOAD REELS
========================= */


async function loadReels(){



const movies =
await getTrending();




if(!movies.length){


container.innerHTML=`

<h2>

No movies found

</h2>

`;


return;


}





container.innerHTML="";




movies
.filter(movie=>movie.backdrop_path)
.slice(0,20)
.forEach(movie=>{





const image =

IMAGE_URL + movie.backdrop_path;





const title =

movie.title ||

movie.name ||

"Unknown";





const type =

movie.media_type ||

"movie";






container.innerHTML += `



<section class="reel">



<img

class="reel-video"

src="${image}"

alt="${title}"

>




<div class="reel-gradient"></div>





<div class="reel-info">


<h1>

${title}

</h1>



<p>

⭐ ${
movie.vote_average

?

movie.vote_average.toFixed(1)

:

"N/A"

}

</p>



<button

onclick="openContent('${type}',${movie.id})">

▶ Watch Now

</button>



</div>




</section>



`;



});



}





/* =========================
        OPEN CONTENT
========================= */


window.openContent=function(type,id){



if(type==="tv"){



location.href =

`series-details.html?id=${id}`;



}



else{



location.href =

`movie.html?id=${id}`;



}



};







loadReels();



});