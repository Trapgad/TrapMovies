// ==================================
// TRAP MOVIES
// FAVORITE SYSTEM
// PREMIUM CLEAN VERSION
// ==================================


document.addEventListener(
"DOMContentLoaded",
()=>{



const container =
document.querySelector(
"#favoriteContainer"
);



if(!container)
return;






// ===============================
// SAFE STORAGE
// ===============================


function getStorage(key){


try{


return JSON.parse(
localStorage.getItem(key)
)
|| [];


}

catch(error){


console.error(
"Storage Error:",
error
);


return [];


}


}






let movieFavorites =
getStorage("favorites");



let seriesFavorites =
getStorage("seriesFavorites");




function getAllFavorites(){


return [

...movieFavorites,

...seriesFavorites

];


}






// ===============================
// RENDER FAVORITES
// ===============================


function renderFavorites(){



const favorites =
getAllFavorites();





if(!favorites.length){


container.innerHTML = `


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







container.innerHTML =

favorites.map(item=>{


const poster =

item.poster

?

"https://image.tmdb.org/t/p/w500/" 
+ item.poster

:

"assets/images/no-image.jpg";




return `


<div class="movie-card">


<img 

src="${poster}"

alt="${item.title || item.name}">



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



}).join("");



}





renderFavorites();









// ===============================
// REMOVE FAVORITE
// ===============================


container.addEventListener(

"click",

(e)=>{



const button =

e.target.closest(
".remove-favorite"
);



if(!button)
return;






const id =

Number(
button.dataset.id
);







const confirmRemove =

confirm(
"Remove from favorites?"
);



if(!confirmRemove)
return;







movieFavorites =

movieFavorites.filter(

item=>item.id !== id

);






seriesFavorites =

seriesFavorites.filter(

item=>item.id !== id

);







localStorage.setItem(

"favorites",

JSON.stringify(
movieFavorites
)

);






localStorage.setItem(

"seriesFavorites",

JSON.stringify(
seriesFavorites
)

);







renderFavorites();





});






});