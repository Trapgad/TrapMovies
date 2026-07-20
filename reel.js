/* ==================================
        TRAP MOVIES
        REELS V3 ENGINE
        TIKTOK STYLE SYSTEM
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const API_KEY =
"17a1834e273320eef8a2a36b38a11964";


const BASE_URL =
"https://api.themoviedb.org/3";


const container =
document.querySelector("#reelsContainer");



let players = [];





/* =========================
        LOAD YOUTUBE API
========================= */


let script =
document.createElement("script");


script.src =
"https://www.youtube.com/iframe_api";


document.head.appendChild(script);








async function fetchData(url){


try{


let response =
await fetch(url);


return await response.json();


}

catch(error){

console.log(error);

return {};

}


}









async function getTrending(){


const data =
await fetchData(

`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`

);


return data.results || [];


}








async function getTrailer(id,type){


const data =
await fetchData(

`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`

);



return data.results?.find(video=>

video.site==="YouTube"

&&

video.type==="Trailer"

);

}









async function loadReels(){


const items =
await getTrending();



container.innerHTML="";


let index=0;



for(const item of items){


if(index>=15)
break;



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


<div

class="reel-video"

id="player${index}"

data-video="${trailer.key}">

</div>





<div class="reel-gradient"></div>






<div class="reel-info">


<h1>

${item.title || item.name}

</h1>


<p>

⭐ ${item.vote_average?.toFixed(1)}

</p>


<button onclick="openContent('${type}',${item.id})">

▶ Watch Now

</button>


</div>







<div class="reel-actions">


<button onclick="likeReel(this)">

❤️

</button>



<button onclick="saveReel(${item.id})">

🔖

</button>



<button onclick="shareReel()">

📤

</button>



<button onclick="muteVideo(${index},this)">

🔇

</button>


</div>






</section>


`;



index++;


}



createPlayers();


}









/* =========================
        CREATE VIDEO PLAYERS
========================= */


function createPlayers(){



document
.querySelectorAll(".reel-video")
.forEach((video,index)=>{



let key =
video.dataset.video;



let player =
new YT.Player(
video.id,
{


videoId:key,


playerVars:{


autoplay:0,

controls:0,

mute:1,

playsinline:1


}



});



players.push(player);



});



setTimeout(()=>{

setupSwipe();

},2000);



}









/* =========================
        TIKTOK SWIPE SYSTEM
========================= */


function setupSwipe(){



const reels =
document.querySelectorAll(".reel");



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


let index =
Array.from(reels)
.indexOf(entry.target);



let player =
players[index];



if(!player)
return;



if(entry.isIntersecting){


player.playVideo();


}

else{


player.pauseVideo();


}



});


},{

threshold:.8

});




reels.forEach(reel=>{


observer.observe(reel);


});


}









/* =========================
        LIKE
========================= */


window.likeReel=function(btn){


btn.classList.add("liked");


btn.innerHTML="❤️";


setTimeout(()=>{

btn.classList.remove("liked");

},500);


}









/* =========================
        SAVE
========================= */


window.saveReel=function(id){


let list =
JSON.parse(
localStorage.getItem("reels")
)
||[];



if(!list.includes(id)){


list.push(id);


localStorage.setItem(
"reels",
JSON.stringify(list)
);


}


}








/* =========================
        MUTE
========================= */


window.muteVideo=function(index,btn){


let player =
players[index];



if(player.isMuted()){


player.unMute();


btn.innerHTML="🔊";


}

else{


player.mute();


btn.innerHTML="🔇";


}



}









window.shareReel=function(){


navigator.share?.({

title:"TRAP MOVIES",

text:"Watch this trailer"

});


}








window.openContent=function(type,id){


if(type==="movie"){

location.href=
`movie.html?id=${id}`;

}

else{

location.href=
`series-details.html?id=${id}`;

}


}






loadReels();



});