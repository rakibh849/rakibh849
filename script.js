const API_KEY = "e38fd18ae008fd25345aa8f0e89503cd";
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

const banner = document.getElementById("banner");
const bannerTitle = document.getElementById("bannerTitle");
const bannerOverview = document.getElementById("bannerOverview");

const trending = document.getElementById("trending");
const popular = document.getElementById("popular");
const toprated = document.getElementById("toprated");

const search = document.getElementById("search");

async function loadBanner(){

const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}`);

const data = await res.json();

const movie = data.results[0];

banner.style.backgroundImage =
`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

bannerTitle.innerText = movie.title;

bannerOverview.innerText = movie.overview;

}

async function getMovies(url,container){

const res = await fetch(url);

const data = await res.json();

showMovies(data.results,container);

}

function showMovies(list,container){

container.innerHTML="";

list.forEach(movie=>{

container.innerHTML += `

<div class="card">

<img src="${IMG+movie.poster_path}">

<div class="info">

<h3>${movie.title}</h3>

<div class="rating">

⭐ ${movie.vote_average.toFixed(1)}

</div>

</div>

</div>

`;

});

}

search.addEventListener("keyup",async()=>{

const text=search.value.trim();

if(text===""){

loadData();

return;

}

const res = await fetch(

`${BASE}/search/movie?api_key=${API_KEY}&query=${text}`

);

const data=await res.json();

showMovies(data.results,popular);

});

function loadData(){

loadBanner();

getMovies(

`${BASE}/trending/movie/week?api_key=${API_KEY}`,

trending

);

getMovies(

`${BASE}/movie/popular?api_key=${API_KEY}`,

popular

);

getMovies(

`${BASE}/movie/top_rated?api_key=${API_KEY}`,

toprated

);

}

loadData();
