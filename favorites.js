/* ==================================
        TRAP MOVIES
        FAVORITE SYSTEM
        PREMIUM VERSION
================================== */


document.addEventListener("DOMContentLoaded",()=>{





const container =

document.querySelector("#favoriteContainer");






if(!container)
return;







/* =========================
        GET FAVORITES
========================= */


const movieFavorites =

JSON.parse(

localStorage.getItem("favorites")

)

|| [];




const seriesFavorites =

JSON.parse(

localStorage.getItem("seriesFavorites")

)

|| [];







const favorites = [

...movieFavorites,

...seriesFavorites

];








/* =========================
        DISPLAY FAVORITES
========================= */


if(!favorites.length){



container.innerHTML =

`

<div class="empty-list">


<i class="fa-solid fa-heart-crack"></i>


<h3>

No Favorites Yet

</h3>



<p>

Add movies and series to your favorites.

</p>



</div>

`;



return;


}






container.innerHTML="";





favorites.forEach(item=>{





const poster =

item.poster

?

"https://image.tmdb.org/t/p/w500/" + item.poster

:

"assets/images/no-image.jpg";







container.innerHTML +=


`

<div class="movie-card">



<img src="${poster}">



<h3>

${item.title || item.name || "Unknown"}

</h3>



<p>

⭐ ${item.rating || "N/A"}

</p>



<button 
class="remove-favorite"
data-id="${item.id}">

<i class="fa-solid fa-heart-crack"></i>

Remove

</button>



</div>

`;





});









/* =========================
        REMOVE FAVORITE
========================= */


document
.querySelectorAll(".remove-favorite")
.forEach(button=>{



button.addEventListener(
"click",
()=>{



const id =

Number(
button.dataset.id
);





let movies =

JSON.parse(

localStorage.getItem("favorites")

)

|| [];





let series =

JSON.parse(

localStorage.getItem("seriesFavorites")

)

|| [];







movies = movies.filter(

item=>item.id !== id

);




series = series.filter(

item=>item.id !== id

);







localStorage.setItem(

"favorites",

JSON.stringify(movies)

);





localStorage.setItem(

"seriesFavorites",

JSON.stringify(series)

);






location.reload();



});



});





});