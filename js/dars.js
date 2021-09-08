// Kontaktlarni joylash uchun bo'sh array ochamiz
var contacts = [];


// DOM
var elNewContactForm = document.querySelector('.js-new-contact-form');

var elContacts = document.querySelector('.contacts');
var elContactsList = elContacts.querySelector('.contacts__list');



function addContact (name, relationship, phone) {
  contacts.push({
    name: name,
    relationship: relationship,
    phone: phone
  });
}

var elContactListItemTemplate = document.querySelector('#contact-list-item-template').content;
function showContacts () {
  elContactsList.innerHTML = '';
  var elContactsFragment = document.createDocumentFragment();

  for (var contact of contacts) {
    var elNewContactsItem = elContactListItemTemplate.cloneNode(true);

    elNewContactsItem.querySelector('.contact__name').textContent = contact.name;
    elNewContactsItem.querySelector('.contact__relationship').textContent = contact.relationship;
    elNewContactsItem.querySelector('.contact__phone-link').textContent = contact.phone;
    elNewContactsItem.querySelector('.contact__phone-link').href = `tel:${contact.phone}`;

    elContactsFragment.appendChild(elNewContactsItem);
  }

  elContactsList.appendChild(elContactsFragment);
}


// Form bo'lsa
if (elNewContactForm) {
  elNewContactForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var elNewContactNameInput = elNewContactForm.querySelector('.js-new-contact-name-input');
    var elNewContactRelationshipInput = elNewContactForm.querySelector('.js-new-contact-relationship-input');
    var elNewContactPhoneInput = elNewContactForm.querySelector('.js-new-contact-phone-input');
    var phoneIndex = contacts.findIndex(function (contact) {
      return contact.phone === elNewContactPhoneInput.value.trim();
    });

    if (phoneIndex > -1) {
      alert('Eee, borakan');
      return;
    }


    // Add contact to contacts array
    addContact(
      elNewContactNameInput.value.trim(),
      elNewContactRelationshipInput.value.trim(),
      elNewContactPhoneInput.value.trim()
      );

    // Reset inputs
    elNewContactNameInput.value = '';
    elNewContactRelationshipInput.value = '';
    elNewContactPhoneInput.value = '';

    showContacts();
  });
}

// Yo'q bo'lgan kontaktnigina qo'shish
/* var movies = [
  {
    title: 'Harry Potter',
    year: 2000
  },
  {
    title: 'James Bond',
    year: 1970
  },
  {
    title: 'Avengers',
    year: 2012
  }
];

var foundMovie = movies.find(function (movie) {
  return movie.title === 'Avengers';
});

var foundMovieIndex = movies.findIndex(function (movie) {
  return movie.title === 'Avengers';
}); */

// Qo'shilgan kontaktlarni o'chirib tashlash
