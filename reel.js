/* ==================================
        TRAP MOVIES
        REELS V2 ENGINE
        TIKTOK STYLE SYSTEM
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";



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



return data.results.find(video=>

video.site==="YouTube"

&&

video.type==="Trailer"

);

}









async function loadReels(){


const items =
await getTrending();



container.innerHTML="";



for(const item of items.slice(0,15)){



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



if(!trailer)
continue;




container.innerHTML +=

`

<section class="reel">


<iframe

class="reel-video"

src="https://www.youtube.com/embed/${trailer.key}?enablejsapi=1&controls=0&mute=1"

allow="autoplay"

allowfullscreen>

</iframe>





<div class="reel-gradient"></div>






<div class="reel-info">


<h1>

${item.title || item.name}

</h1>


<p>

⭐ ${item.vote_average.toFixed(1)}

</p>



<button onclick="openContent('${type}',${item.id})">

▶ Watch Now

</button>


</div>








<div class="reel-actions">


<button onclick="likeReel(this)">

❤️

</button>



<button>

🔖

</button>



<button onclick="shareReel()">

📤

</button>



<button onclick="toggleMute(this)">

🔇

</button>


</div>




</section>


`;



}


initObserver();


}









/* =========================
        AUTO PLAY SYSTEM
========================= */


function initObserver(){


const reels =
document.querySelectorAll(".reel");



const observer =
new IntersectionObserver(
entries=>{


entries.forEach(entry=>{


const video =
entry.target.querySelector(
"iframe"
);



if(entry.isIntersecting){


video.contentWindow.postMessage(

'{"event":"command","func":"playVideo","args":""}',

"*"

);


}

else{


video.contentWindow.postMessage(

'{"event":"command","func":"pauseVideo","args":""}',

"*"

);


}



});


},


{
threshold:.7
}

);



reels.forEach(reel=>{

observer.observe(reel);

});


}









function likeReel(button){


button.classList.toggle(
"liked"
);


button.innerHTML="❤️";


}







function shareReel(){


navigator.share?.({

title:"TRAP MOVIES",

text:"Watch this trailer on TRAP MOVIES"

});


}







function toggleMute(btn){


btn.innerHTML =
btn.innerHTML==="🔇"
?
"🔊"
:
"🔇";


}









window.openContent=function(type,id){


if(type==="movie"){

window.location.href=
`movie.html?id=${id}`;

}

else{


window.location.href=
`series-details.html?id=${id}`;

}


}





loadReels();


});