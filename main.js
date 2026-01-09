const tarjetas = document.getElementById("movie-gallery");
const dropMenu = document.getElementById("menu");

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzYwYWZiYTc4YzA1ZGE4MGQ3OWYyYmY4MjM1NGU4YSIsIm5iZiI6MTc2NzY0OTk1MC40NjEsInN1YiI6IjY5NWMzMjllOWYyNDFlN2M0OTc2YTE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YjTWUJRS8JWafgX1Fao_CRBBm8gBUuMZQUCWxwhdACY'
  }
};


function displayMovies (movies) {
  
  tarjetas.innerHTML = ''
    
  movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add('movie-card')
        movieCard.innerHTML =`
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <div class="movie-actions">
    <button class="btn">Ver Tráiler</button>
    <button class="btn btn-primary">Añadir a lista</button>
    </div>
`;
tarjetas.appendChild(movieCard);
    });
}

fetch('https://api.themoviedb.org/3/movie/popular', options)
  .then(res => res.json())
  .then(data => {
    displayMovies(data.results)
    return data.results;
})
  .catch(err => console.error(err));


function selectMenu (generos) {
    generos.forEach (genres => {
      const newOption = document.createElement ('option');
      newOption.textContent = genres.name;
      newOption.value = genres.id;
      dropMenu.appendChild(newOption);
    })
};


fetch ('https://api.themoviedb.org/3/genre/movie/list',options)
.then(res => res.json())
  .then(data => {selectMenu(data.genres)
    console.log (data.genres);
});

dropMenu.addEventListener('change', () => {
    const selectedGenreId = dropMenu.value;
    
    let fetchURL = '';

    if (selectedGenreId === "todos") {
        fetchURL = 'https://api.themoviedb.org/3/movie/popular';
        console.log('Cargando Populares.');
    } else {
        fetchURL = `https://api.themoviedb.org/3/discover/movie?api_key=5c60afba78c05da80d79f2bf82354e8a&with_genres=${selectedGenreId}`;
        console.log(selectedGenreId);
    }
    fetch(fetchURL, options)
        .then(res => res.json())
        .then(data => {
            displayMovies(data.results); 
        })
        .catch(err => console.error(err));
});

