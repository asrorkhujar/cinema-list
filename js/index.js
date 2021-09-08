// Kinolar joylanadigan idish
var elMoviesList = document.querySelector('.movies-list');

// Har bir kinoning HTML qolipi
var elMoviesItemTemplate = document.querySelector('#movies-item-template').content;

// Kinolarni HTMLga aylantirib vaqtincha yig'ib turish uchun fragment
var elMoviesListFragment = document.createDocumentFragment();

// Birinchi 200 ta kinoni aylanib chiqamiz
for (var movie of movies.slice(0, 100)) {
  // Har bir kino uchun qolipdan nusxa olamiz
  var elMovie = elMoviesItemTemplate.cloneNode(true);

  // Qolipni ma'lumot bilan to'ldiramiz
  elMovie.querySelector('.movie__img').src = `http://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`;
  elMovie.querySelector('.movie__title').textContent = movie.Title;
  elMovie.querySelector('.movie__rating').textContent = movie.imdb_rating;
  elMovie.querySelector('.movie__year').textContent = movie.movie_year;
  elMovie.querySelector('.movie__duration').textContent = Math.floor(movie.runtime / 60) + 'hr' + ' ' + (movie.runtime % 60) + 'min';
  elMovie.querySelector('.movie__genres').textContent = movie.Categories.split('|').join(', ');

  // Tayyor natijani fragmentga solamiz
  elMoviesListFragment.appendChild(elMovie);
}

// kinolarni jamlagan fragmentni sahifaga joylaymiz
elMoviesList.appendChild(elMoviesListFragment);



// Modal info
var elMovieModal = document.querySelector('#movieModal');
var elMovieMoreButton = document.querySelectorAll('.movie__more-btn');

elMovieMoreButton.forEach(btn => {
  btn.addEventListener('click', () => {
    var movie = movies[Number(btn.dataset.index)];
    elMovieModal.querySelector('.modal__movie-title').textContent = movie.Title;
      elMovieModal.querySelector('.modal__movie-rating').textContent = movie.imdb_rating;
      elMovieModal.querySelector('.modal__movie-year').textContent = movie.movie_year;
      elMovieModal.querySelector('.modal__movie-duration').textContent = Math.floor(movie.runtime / 60) + 'hr' + ' ' + (movie.runtime % 60) + 'min';
      elMovie.querySelector('.modal__movie-genres').textContent = movie.Categories.split('|').join(', ');
      elMovieModal.querySelector('.modal__iframe').src = `https://www.youtube.com/embed/${movie.ytid}`;
      elMovieModal.querySelector('.modal__movie-summary').textContent = movie.summary;
      elMovieModal.querySelector('.modal__btn-imdb').href = `https://www.imdb.com/title/${movie.imdb_id}`;
  })
})