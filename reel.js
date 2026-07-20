document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const IMAGE_URL =
"https://image.tmdb.org/t/p/original";


const container =
document.querySelector("#reelsContainer");



async function getTrending(){


try{


const response = await fetch(

`${BASE_URL}/trending/all/week?api_key=${API_KEY}`

);


const data = await response.json();


console.log(data);


return data.results || [];


}

catch(error){

console.log(
"TMDB ERROR:",
error
);

return [];

}


}





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



movies.slice(0,20).forEach(movie=>{


const image =

movie.backdrop_path

?

IMAGE_URL + movie.backdrop_path

:

"assets/images/no-image.jpg";



container.innerHTML += `


<section class="reel">


<img 
class="reel-image"
src="${image}"
>




<div class="reel-gradient"></div>




<div class="reel-info">


<h1>

${movie.title || movie.name}

</h1>



<p>

⭐ ${movie.vote_average?.toFixed(1) || "N/A"}

</p>



<button onclick="openContent('${movie.media_type}',${movie.id})">

▶ Watch Now

</button>



</div>



</section>


`;



});



}






window.openContent=function(type,id){


if(type==="movie"){


location.href =
`movie.html?id=${id}`;


}

else{


location.href =
`series-details.html?id=${id}`;


}


}





loadReels();



});