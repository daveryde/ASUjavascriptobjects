// Global Scope Variables
var fnameInput, emailInput, mostFavInput, leastFavInput;
var checkboxOne, checkboxTwo, checkboxThree, checkboxFour, checkboxFive;
var checkboxes = [];

// Custom Object Constructor
function CharacterChoice(
  firstName,
  email,
  mostFavorite,
  leastFavorite,
  checkboxes = []
) {
  this.firstName = firstName,
  this.email = email,
  this.mostFavorite = mostFavorite,
  this.leastFavorite = leastFavorite,
  this.checkboxes = checkboxes;
}

// Entry Object Handler
function createEntry(newObj) {
  // Grab the table body element
  var tableBody = document.querySelector('#table-body');

  // Create inner table elements with object data
  var tableData = document.createElement('tr');

  // Loop through the object and append values to table data
  for (item in newObj) {
    tableData.innerHTML += '<td>' + newObj[item] + '</td>';
  }

  // Add to the table body
  tableBody.appendChild(tableData);
}

// DOM Element Handler
function getElements() {
  // Find the input elements and set them to global variables
  fnameInput = document.querySelector('#fname');
  emailInput = document.querySelector('#email');
  mostFavInput = document.querySelector('#top-character');
  leastFavInput = document.querySelector('#bottom-character');

  // Find the select elements and set them to global variables
  checkboxOne = document.querySelector('#checkbox-one');
  checkboxTwo = document.querySelector('#checkbox-two');
  checkboxThree = document.querySelector('#checkbox-three');
  checkboxFour = document.querySelector('#checkbox-four');
  checkboxFive = document.querySelector('#checkbox-five');
}

// Checkbox value handler
function getCheckboxes() {
  var tempArr = [
    checkboxOne,
    checkboxTwo,
    checkboxThree,
    checkboxFour,
    checkboxFive
  ];

  for (item in tempArr) {
    if (tempArr[item].checked) {
      // Transform the value of our array item to a string
      var tempString = tempArr[item].value.toString();
      
      // Format the value by capitalizing the first letter
      // We take the first letter of the string, capitalize, then combine the capital letter with the rest of the value of item in our array
      var formattedString = tempString.substr(0, 1).toUpperCase() + tempArr[item].value.substr(1);

      // Put the checked and formatted value in our global temporary variable array of checkedbox values
      checkboxes.push(formattedString);
    }
  }
}

function validateInput() {
  // Check for valid email through Regular Expressions (Reference: https://regexr.com/)
  var emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
  var emailCheck = emailPattern.test(emailInput.value);

  // Check if the input fields are blank and returns alert if empty
  if (
    fnameInput.value === '' ||
    emailCheck === false ||
    mostFavInput.value === '' ||
    leastFavInput.value === ''
  ) {
    alert('Please fill in empty fields');
    return false;
  }

  // If validated, return true
  return true;
}

function clearInputs() {
  // Clear the values inside each input
  fnameInput.value = '';
  emailInput.value = '';
  mostFavInput.value = '';
  leastFavInput.value = '';

  // Clear the checkbox choices
  checkboxOne.checked = false;
  checkboxTwo.checked = false;
  checkboxThree.checked = false;
  checkboxFour.checked = false;
  checkboxFive.checked = false;
}

// Form Controller
function handleForm(e) {
  // Prevent default submit behavior
  e.preventDefault();

  // Grab the user input element values
  getElements();

  // Grab the user checked checkbox values
  getCheckboxes();

  var validated = validateInput();

  if (!validated) {
    return false;
  }

  // Create an entry object with user input
  var entryObj = new CharacterChoice(
    fnameInput.value,
    emailInput.value,
    mostFavInput.value,
    leastFavInput.value,
    checkboxes
  );

  // Display the object on the document
  createEntry(entryObj);

  // Clear input values
  clearInputs();
}

// Adds form submit button click listener
function createListeners() {
  document
    .querySelector('#submit')
    .addEventListener('click', handleForm, false);
}

window.addEventListener('load', createListeners, false);
