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

// Banner
async function loadBanner(){

const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}`);

const data = await res.json();

const movie = data.results[0];

banner.style.backgroundImage =
`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

bannerTitle.innerHTML = movie.title;

bannerOverview.innerHTML = movie.overview;

}

// Movie Card

function card(movie){

return `

<div class="card">

<img src="${IMG}${movie.poster_path}">

<div class="info">

<h3>${movie.title}</h3>

<div class="rating">

⭐ ${movie.vote_average}

</div>

</div>

</div>

`;

}

// Trending

async function loadTrending(){

const res = await fetch(`${BASE}/trending/movie/week?api_key=${API_KEY}`);

const data = await res.json();

trending.innerHTML =
data.results.map(card).join("");

}

// Popular

async function loadPopular(){

const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}`);

const data = await res.json();

popular.innerHTML =
data.results.map(card).join("");

}

// Top Rated

async function loadTop(){

const res = await fetch(`${BASE}/movie/top_rated?api_key=${API_KEY}`);

const data = await res.json();

toprated.innerHTML =
data.results.map(card).join("");

}

// Search

search.addEventListener("keyup",async()=>{

const text = search.value;

if(text==""){

loadPopular();

return;

}

const res = await fetch(

`${BASE}/search/movie?api_key=${API_KEY}&query=${text}`

);

const data = await res.json();

popular.innerHTML =
data.results.map(card).join("");

});

// Start

loadBanner();

loadTrending();

loadPopular();

loadTop();
