/* ==================================
   TRAP MOVIES
   WATCH HISTORY ENGINE
================================== */


document.addEventListener("DOMContentLoaded",()=>{


const historyContainer =
document.getElementById(
"historyContainer"
);



if(!historyContainer)
return;



let history = JSON.parse(
localStorage.getItem("watchHistory")
)
|| [];




if(history.length === 0){


historyContainer.innerHTML = `

<div class="empty-history">

<i class="fa-solid fa-clock"></i>

<h2>
No Watch History
</h2>

<p>
Movies you watch will appear here
</p>

</div>

`;

return;

}





historyContainer.innerHTML = "";



history.forEach(movie=>{


historyContainer.innerHTML += `


<div class="movie-card"

onclick="openMovie(${movie.id})">


<img src="${movie.poster}">


<h3>

${movie.title}

</h3>


<p>

${movie.year || "N/A"}

</p>


</div>


`;



});



});







window.openMovie=function(id){

window.location.href =
`movie.html?id=${id}`;

};