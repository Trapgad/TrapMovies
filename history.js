// ==================================
// TRAP MOVIES
// WATCH HISTORY ENGINE
// PREMIUM CLEAN VERSION
// ==================================


document.addEventListener(
"DOMContentLoaded",
()=>{


const historyContainer =

document.getElementById(
"historyContainer"
);



if(!historyContainer)
return;







// ===============================
// SAFE STORAGE
// ===============================


function getHistory(){


try{


return JSON.parse(

localStorage.getItem(
"watchHistory"
)

)

|| [];


}

catch(error){


console.error(
"History Error:",
error
);


return [];


}


}





let history = getHistory();









// ===============================
// EMPTY STATE
// ===============================


function showEmpty(){


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


}









// ===============================
// DISPLAY HISTORY
// ===============================


function renderHistory(){



if(history.length === 0){


showEmpty();


return;


}





historyContainer.innerHTML =

history.map(movie=>{



const poster =

movie.poster?.startsWith("http")

?

movie.poster


:

movie.poster

?

"https://image.tmdb.org/t/p/w500/" 
+
movie.poster


:

"assets/images/no-image.jpg";







return `


<div class="history-card"

data-id="${movie.id}">





<img

src="${poster}"

alt="${movie.title || "Movie"}">





<h3>

${movie.title || "Unknown"}

</h3>





<p>

${movie.year || "N/A"}

</p>




<button

class="remove-history"

data-id="${movie.id}">


<i class="fa-solid fa-trash"></i>

Remove


</button>




</div>


`;



}).join("");



}




renderHistory();









// ===============================
// OPEN MOVIE
// ===============================


historyContainer.addEventListener(

"click",

(e)=>{



const card =

e.target.closest(
".history-card"
);



const remove =

e.target.closest(
".remove-history"
);





if(remove){


const id =
Number(
remove.dataset.id
);



history =

history.filter(

movie=>movie.id !== id

);





localStorage.setItem(

"watchHistory",

JSON.stringify(history)

);





renderHistory();


return;


}







if(card){


const id =
card.dataset.id;



location.href =

"movie.html?id="

+

encodeURIComponent(id);



}



});






});