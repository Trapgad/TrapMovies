// ===============================
// TRAP MOVIES - script.js
// ===============================

const movies = [
{
title: "Avatar",
image: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg"
},
{
title: "John Wick 4",
image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
},
{
title: "Spider-Man: No Way Home",
image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
},
{
title: "Black Panther",
image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"
},
{
title: "The Batman",
image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
},
{
title: "Fast X",
image: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg"
}
];

const grids = document.querySelectorAll(".movie-grid");

grids.forEach(grid => {

movies.forEach(movie => {

const card = document.createElement("div");
card.className = "movie-card";

card.innerHTML = `
<img src="${movie.image}" alt="${movie.title}">
<h3>${movie.title}</h3>
`;

grid.appendChild(card);

});

});