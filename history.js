document.addEventListener(
"DOMContentLoaded",
()=>{


const container =
document.getElementById(
"historyContainer"
);



let history =

JSON.parse(

localStorage.getItem("watchHistory")

)

|| [];





if(history.length === 0){


container.innerHTML =

`

<div class="empty-history">


<i class="fa-solid fa-clock"></i>


<h2>

No Watch History Yet

</h2>


<p>

Start watching movies to see them here.

</p>


</div>


`;



return;


}







container.innerHTML="";






history.forEach(movie=>{





container.innerHTML +=


`

<div class="movie-card"

onclick="openMovie(${movie.id})">



<img src="${movie.poster}">



<h3>

${movie.title}

</h3>



<p>

${movie.year}

</p>



</div>



`;



});



});







function openMovie(id){


window.location.href =

`movie.html?id=${id}`;


}