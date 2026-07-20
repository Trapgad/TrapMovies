async function loadReels(){

const items = await getTrending();


container.innerHTML="";


for(const item of items.slice(0,20)){


const type =
item.media_type==="tv"
?
"tv"
:
"movie";



const trailer =
await getTrailer(item.id,type);



const backdrop =

item.backdrop_path

?

`https://image.tmdb.org/t/p/original${item.backdrop_path}`

:

"assets/images/no-image.jpg";




container.innerHTML += `


<section class="reel">


${trailer ? `

<iframe

class="reel-video"

src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0"

allowfullscreen>

</iframe>

`

:

`

<img class="reel-image" src="${backdrop}">

`

}





<div class="reel-gradient"></div>



<div class="reel-info">


<h1>

${item.title || item.name}

</h1>


<p>

⭐ ${item.vote_average?.toFixed(1) || "N/A"}

</p>



<button onclick="openContent('${type}',${item.id})">

▶ Watch Now

</button>


</div>


</section>


`;


}


}