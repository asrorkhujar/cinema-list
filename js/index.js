const elSearchForm = document.querySelector('.js-form-search');
const elSearchName = elSearchForm.querySelector ('.js-form-search-name');

const elFilterCategories = elSearchForm.categories;
const elFilterYearFrom = elSearchForm.from_year;
const elFilterYearTo = elSearchForm.to_year;
const elFilterRating = elSearchForm.rating;

//Kinolar joylanadigan list
const elMoviesList = document.querySelector('.movies__list');

//Template kinoni HTML qolipi
const elMoviesItemTemplate = document.querySelector('#movies-item-template').content;

//Modaldagi elementlarni topib olamiz
// MODAL
const elMovieInfoModal = document.querySelector('.movie-info-modal');
const elMovieInfoModalTitle = elMovieInfoModal.querySelector('.movie-info-modal__title');
const elMovieInfoModalRating = elMovieInfoModal.querySelector('.movie-info-modal__rating');
const elMovieInfoModalYear = elMovieInfoModal.querySelector('.movie-info-modal__year');
const elMovieInfoModalDuration = elMovieInfoModal.querySelector('.movie-info-modal__duration');
const elMovieInfoModalIFrame = elMovieInfoModal.querySelector('.movie-info-modal__iframe');
const elMovieInfoModalCategories = elMovieInfoModal.querySelector('.movie-info-modal__categories');
const elMovieInfoModalSummary = elMovieInfoModal.querySelector('.movie-info-modal__summary');
const elMovieInfoModalImdbLink = elMovieInfoModal.querySelector('.movie-info-modal__imdb-link');

//Toliq daqiqani soat va daqiqaga ajratib beruvchi funksiya
function getHoursStringFromMinutes (minutes) {
  return `${Math.floor(minutes / 60)} hrs ${minutes % 60} mins`;
}

//Kinolar listini ko'rsatish un funksiya
function showMovies (movies) {

  //HTMLni bo'shatamiz
  elMoviesList.innerHTML = '';

  //Kinolarni HTMLga aylantirib, vaqtincha yig'ib turish un fragment
  const elMoviesFragment = document.createDocumentFragment();

  //Birinchi 50ta kinoni aylanib chiqamiz
  for (const movie of movies.slice(0, 100)) {

    //Har bir kino un qolipdan nusxa olamiz
    const elNewMoviesItem = elMoviesItemTemplate.cloneNode(true);

    //Qolipni ma'lumot bn toldiramiz
    elNewMoviesItem.querySelector('.movie__img').src = movie.youtubePoster;
    elNewMoviesItem.querySelector('.movie__img').alt = `${movie.title} poster`;
    elNewMoviesItem.querySelector('.movie__title').textContent = movie.title;
    elNewMoviesItem.querySelector('.movie__rating').textContent = movie.imdbRating;
    elNewMoviesItem.querySelector('.movie__year').textContent = movie.year;
    elNewMoviesItem.querySelector('.movie__duration').textContent = getHoursStringFromMinutes(movie.runtime);
    elNewMoviesItem.querySelector('.movie__categories').textContent = movie.categories.join(', ');
    elNewMoviesItem.querySelector('.js-more-info-button').dataset.imdbId = movie.imdbId;

    //Tayyot natijani fragmentga solamiz
    elMoviesFragment.appendChild(elNewMoviesItem);
  }

  //Kinolar jamlangan fragmentni sahifaga joylaymiz
  elMoviesList.appendChild(elMoviesFragment);
}

//More info button bosilganda Modaldagi infolarni yangilash funksiya
function updateMovieInfoModal (imdbId) {
  const movie = movies.find(movie => movie.imdbId === imdbId);

//Modalni ma'lumot bn toldiramiz
  elMovieInfoModalTitle.textContent = movie.title;
  elMovieInfoModalRating.textContent = movie.imdbRating;
  elMovieInfoModalYear.textContent = movie.year;
  elMovieInfoModalDuration.textContent = getHoursStringFromMinutes(movie.runtime);
  elMovieInfoModalIFrame.src = `https://www.youtube-nocookie.com/embed/${movie.youtubeId}`;
  elMovieInfoModalCategories.textContent = movie.categories.join(', ');
  elMovieInfoModalSummary.textContent = movie.summary;
  elMovieInfoModalImdbLink.href = `https://www.imdb.com/title/${movie.imdbId}`;
}

//IMDB linki bosilganda ushanga tegishli IMDB saytga target blank qilish
elMoviesList.addEventListener('click', evt => {
  if (evt.target.matches('.js-more-info-button')) {
    updateMovieInfoModal(evt.target.dataset.imdbId);
  }
});

//Modal yopilganda youtubedagi video bo'shatiladi
elMovieInfoModal.addEventListener('hidden.bs.modal', () => {
  elMovieInfoModalIFrame.src = '';
});


// FORM - FILTERS

if (elSearchForm) {
  elSearchForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const titleRegex = new RegExp(elSearchName.value, 'gi');

    const foundMovies = movies.filter(movie => {
      return (
        (movie.title.match(titleRegex)) &&
        (elFilterCategories.value.includes('all') || movie.categories.includes(elFilterCategories.value)) &&
        (movie.year >= (Number(elFilterYearFrom.value) || 1900) && movie.year <= (Number(elFilterYearTo.value) || 2020)) &&
        (movie.imdbRating >= Number(elFilterRating.value))
    );
      });

    if (foundMovies.length > 0) {
      showMovies(foundMovies);
    } else {
      elMoviesList.innerHTML = 'Film no found';
    }
  });
}

showMovies (movies.slice(0, 100));