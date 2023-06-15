//function that adds a person to local storage 

function addPerson() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var age = document.getElementById('age').value;

    var person = {
        firstName: firstName,
        lastName: lastName,
        age: age
    };

    var persons = JSON.parse(localStorage.getItem('persons')) || {};

    var id = 'Persons' + Date.now();

    persons[id] = person;

    localStorage.setItem('persons', JSON.stringify(persons));

    alert('Person added successfully.');
    document.getElementById('personForm').reset();
}

//function to add picture to local ctorage

var selectedImages = [];

function toggleImageSelection(image) {
  image.classList.toggle('selected');
}

function saveSelectedImages() {
  var selectedImageElements = document.querySelectorAll('.container-pictures img.selected');
  selectedImages = Array.from(selectedImageElements).map(function(imageElement) {
    return imageElement.src;
  });

  localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
  alert('Selected images saved to local storage.');
}
  const personDataElement = document.getElementById('personData');

  const persons = JSON.parse(localStorage.getItem('persons')) || {};

  if (Object.keys(persons).length > 0) {
 
    personDataElement.innerHTML = '';


    Object.keys(persons).forEach((id, index) => {
      const person = persons[id];
      const firstName = person.firstName;
      const age = person.age;
      const lastName = person.lastName;


      const personElement = document.createElement('div');
      personElement.innerHTML = `
        <p>Person ${index + 1}</p>
        <p>firstName: ${firstName}</p>
        <p>lastName: ${lastName}</p>
        <p>age: ${age}</p>
        <hr>
      `;


      personDataElement.appendChild(personElement);
    });
  } else {
    personDataElement.innerHTML = 'No persons found in local storage.';
  }

//slideshow
  const slideshowImage = document.getElementById('slideshowImage');
  const imageUrls = [
    'img/image7.jpg',
    'img/image4.jpg',
    'img/image5.jpg'
  ];
  let currentSlide = 0;

  function showNextSlide() {
    slideshowImage.src = imageUrls[currentSlide];
    currentSlide = (currentSlide + 1) % imageUrls.length;
  }
  showNextSlide();
  // Set interval 
  setInterval(showNextSlide, 2000);

  //open up new update page to change "person"

// Function to retrieve and display the persons from local storage
function displayPersons() {
  var persons = JSON.parse(localStorage.getItem('persons')) || {};

  var personDataElement = document.getElementById('personData');
  personDataElement.innerHTML = '';

  // Iterate over each person and create HTML elements to display their information
  for (var personId in persons) {
      var person = persons[personId];

      // Create HTML elements to display person data
      var personElement = document.createElement('div');
      personElement.id = personId;

      var firstNameElement = document.createElement('p');
      firstNameElement.textContent = 'First Name: ' + person.firstName;

      var lastNameElement = document.createElement('p');
      lastNameElement.textContent = 'Last Name: ' + person.lastName;

      var ageElement = document.createElement('p');
      ageElement.textContent = 'Age: ' + person.age;

      var changeButton = document.createElement('button');
      changeButton.textContent = 'Change';
      changeButton.onclick = function () {
          openUpdatePage(personId);
      };

      // Append elements to the person container
      personElement.appendChild(firstNameElement);
      personElement.appendChild(lastNameElement);
      personElement.appendChild(ageElement);
      personElement.appendChild(changeButton);

      // Append the person container to the main personData element
      personDataElement.appendChild(personElement);
  }
}

// Function to open the update page for a specific person
function openUpdatePage(personId) {
  // Redirect to the update page with the person ID as a query parameter
  window.location.href = 'update.html?id=' + personId;
}

// Call the displayPersons function to populate the HTML with saved persons
displayPersons();


// Function to get the person ID from the query parameter in the URL
function getPersonIdFromURL() {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Function to retrieve the person from local storage based on the ID
function getPersonById(personId) {
  var persons = JSON.parse(localStorage.getItem('persons')) || {};
  return persons[personId];
}

// Function to populate the update form with the person's data
function populateUpdateForm() {
  var personId = getPersonIdFromURL();
  var person = getPersonById(personId);

  if (person) {
      document.getElementById('firstName').value = person.firstName;
      document.getElementById('lastName').value = person.lastName;
      document.getElementById('age').value = person.age;
  }
}

// Function to update the person's data and save it back to local storage
function updatePerson() {
  var personId = getPersonIdFromURL();
  var person = getPersonById(personId);

  if (person) {
      person.firstName = document.getElementById('firstName').value;
      person.lastName = document.getElementById('lastName').value;
      person.age = document.getElementById('age').value;

      var persons = JSON.parse(localStorage.getItem('persons')) || {};
      persons[personId] = person;
      localStorage.setItem('persons', JSON.stringify(persons));

      alert('Person updated successfully.');
      window.location.href = 'index.html'; // Redirect back to the main page
  } else {
      alert('Person not found.');
  }
}

// Call the populateUpdateForm function to populate the form with the selected person's data
populateUpdateForm();
