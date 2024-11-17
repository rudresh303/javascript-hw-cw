const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const searchInput = form.querySelector('.search-input');
const refreshBtn = form.querySelector('.refresh-btn');
let timeoutId;

// Your OMDB API Key
const apiKey = 'c2ae8e49';

/** Debouncing Search Input */
searchInput.addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        const query = searchInput.value.trim();
        if (query) fetchMovies(query);
    }, 500); // 500ms delay
});

/** Fetch Movies */
async function fetchMovies(query) {
    gallery.innerHTML = '<p>Loading movies...</p>';
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await res.json();

        if (data.Response === 'True') {
            renderMovies(data.Search);
        } else {
            gallery.innerHTML = `<p>${data.Error}</p>`;
        }
    } catch (error) {
        gallery.innerHTML = `<p>Something went wrong! Please try again.</p>`;
    }
}

/** Render Movies */
function renderMovies(movies) {
    gallery.innerHTML = movies
        .map(
            (movie) =>
                `
        <div class="movie-card">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}" 
                alt="${movie.Title}" 
                title="${movie.Title}" />
            <p>${movie.Title} (${movie.Year})</p>
        </div>
        `
        )
        .join('');
}

/** Refresh Button */
refreshBtn.addEventListener('click', () => {
    searchInput.value = '';
    gallery.innerHTML = '<p>Start searching for your favorite movies!</p>';
});
