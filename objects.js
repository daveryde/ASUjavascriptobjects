// Global Scope Variables
var fnameInput, lnameInput, mostFavInput, leastFavInput;
var fname, lname, mostFav, leastFav;

// Custom Object Constructor
function CharacterChoice(firstName, lastName, mostFavorite, leastFavorite) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.mostFavorite = mostFavorite,
  this.leastFavorite = leastFavorite
}

function createEntry(newObj) {
  // Grab the table body element
  var tableBody = document.querySelector('#table-body');

  // Create inner table elements with object data
  var tableData = document.createElement("tr")

  // Loop through the object and append values to table data
  for(item in newObj) {
    tableData.innerHTML += '<td>' + newObj[item] + '</td>';
  }

  // Add to the table body
  tableBody.appendChild(tableData);
}

function getElements() {
  // Find the input elements and set them to global variables
  fnameInput = document.querySelector('#fname');
  lnameInput = document.querySelector('#lname');
  mostFavInput = document.querySelector('#top-character');
  leastFavInput = document.querySelector('#bottom-character');

  // Assign input values to global variables for conciseness
  fname = fnameInput.value;
  lname = lnameInput.value;
  mostFav = mostFavInput.value;
  leastFav = leastFavInput.value;
}

function clearInputs() {
  // Clear the values inside each input
  fnameInput.value = '';
  lnameInput.value = '';
  mostFavInput.value = '';
  leastFavInput.value = '';
}

// Form Controller
function handleForm(e) {
  // Prevent default submit behavior
  e.preventDefault();

  // Grab the user input element values
  getElements();

  if(fname === '' || lname === '' || mostFav === '' || leastFav === '') {
    alert('Please fill in empty fields')
    return false;
  }

  // Create an entry object with user input
  var entryObj = new CharacterChoice(fname, lname, mostFav, leastFav);

  // Display the object on the document
  createEntry(entryObj);

  // Clear input values
  clearInputs();
}

// Adds form submit button click listener
function createListeners() {
  document.querySelector('#submit').addEventListener('click', handleForm, false);
}

window.addEventListener('load', createListeners, false);
