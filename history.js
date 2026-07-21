/* ==================================
   TRAP MOVIES
   WATCH HISTORY ENGINE V2
   MATCHES GLASS CINEMA V3
================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const historyContainer =

document.getElementById(
"historyContainer"
);





if(!historyContainer)

return;






let history =

JSON.parse(

localStorage.getItem(
"watchHistory"
)

)

|| [];









/* =========================
        EMPTY STATE
========================= */


if(history.length === 0){



historyContainer.innerHTML =


`

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









/* =========================
        DISPLAY HISTORY
========================= */


historyContainer.innerHTML = "";





history.forEach(movie=>{





historyContainer.innerHTML +=



`

<div class="history-card"

onclick="openMovie(${movie.id})">





<img src="${

movie.poster ||

"assets/images/no-image.jpg"

}">






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









/* =========================
        OPEN MOVIE
========================= */


window.openMovie=function(id){



window.location.href =


"movie.html?id="

+

encodeURIComponent(id);



};