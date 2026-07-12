const API_KEY = "e38fd18ae008fd25345aa8f0e89503cd";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movies = document.getElementById("movies");
const search = document.getElementById("search");
const themeBtn = document.getElementById("theme");

// জনপ্রিয় মুভি দেখাবে
async function getPopularMovies() {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    const data = await res.json();
    showMovies(data.results);
}

// মুভিগুলো দেখানোর ফাংশন
function showMovies(movieList) {
    movies.innerHTML = "";

    movieList.forEach(movie => {
        movies.innerHTML += `
        <div class="movie">
            <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
            <div class="info">
                <h3>${movie.title}</h3>
                <p class="rating">⭐ ${movie.vote_average}</p>
            </div>
        </div>
        `;
    });
}

// সার্চ
search.addEventListener("keyup", async () => {

    const text = search.value.trim();

    if (text === "") {
        getPopularMovies();
        return;
    }

    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(text)}`
    );

    const data = await res.json();
    showMovies(data.results);
});

// ডার্ক মোড
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

// শুরুতে জনপ্রিয় মুভি লোড হবে
getPopularMovies();
