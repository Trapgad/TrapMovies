const historyContainer = document.getElementById("historyContainer");


let historyMovies = JSON.parse(localStorage.getItem("watchHistory")) || [];



if(historyMovies.length === 0){

    historyContainer.innerHTML = `
    
    <h2>
    No watch history yet 🎬
    </h2>

    `;

}



historyMovies.forEach(movie => {


historyContainer.innerHTML += `

<div class="movie-card">


<img src="${movie.poster}" alt="${movie.title}">


<h3>
${movie.title}
</h3>


<p>
${movie.year || ""}
</p>


</div>


`;


});