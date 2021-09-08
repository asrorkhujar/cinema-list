// Kinolar joylanadigan idish
var elMoviesList = document.querySelector('.movies-list');

// Har bir kinoning HTML qolipi
var elMoviesItemTemplate = document.querySelector('#movies-item-template').content;

// Kinolarni HTMLga aylantirib vaqtincha yig'ib turish uchun fragment
var elMoviesListFragment = document.createDocumentFragment();

// Birinchi 100 ta kinoni aylanib chiqamiz
for (var movie of kinolar.slice(0, 100)) {
  // Har bir kino uchun qolipdan nusxa olamiz
  var elMovie = elMoviesItemTemplate.cloneNode(true);

  // Qolipni ma'lumot bilan to'ldiramiz
  elMovie.querySelector('.movie__title').textContent = movie.title;
  elMovie.querySelector('.movie__year').textContent = movie.year;
  elMovie.querySelector('.movie__genres').textContent = movie.genres.join(', ');
  elMovie.querySelector('.movie__cast').textContent = movie.cast.join(', ');

  // Tayyor natijani fragmentga solamiz
  elMoviesListFragment.appendChild(elMovie);
}

// 100 ta kinoni jamlagan fragmentni sahifaga joylaymiz
elMoviesList.appendChild(elMoviesListFragment);