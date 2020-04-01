// Global Scope Variables
var fnameInput, lnameInput, mostFavInput, leastFavInput;
var checkboxOne, checkboxTwo, checkboxThree, checkboxFour, checkboxFive;
var checkboxes = [];

// Custom Object Constructor
function CharacterChoice(
  firstName,
  lastName,
  mostFavorite,
  leastFavorite,
  checkboxes = []
) {
  this.firstName = firstName,
  this.lastName = lastName,
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
  lnameInput = document.querySelector('#lname');
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
      // Temporarily save the value for formatting
      // Ensure value is a string
      // Convert the string to lower case then capitalize the first letter
      var preformat = tempArr[item].value.toString().toLowerCase();

      var postformat = preformat.charAt(0).toUpperCase();

      console.log(postformat);

      // Put the checked and formatted value in our global temporary variabble array of checkedbox values
      checkboxes.push(postformat);
    }
  }
}

function validateInput() {
  // Check if the input fields are blank and returns alert if empty
  if (
    fnameInput.value === '' ||
    lnameInput.value === '' ||
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
  lnameInput.value = '';
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

  // var validated = validateInput();

  // if (!validated) {
  //   return false;
  // }

  // Create an entry object with user input
  var entryObj = new CharacterChoice(
    fnameInput.value,
    lnameInput.value,
    mostFavInput.value,
    leastFavInput.value,
    checkboxes
  );
  // var entryObj = new CharacterChoice(
  //   fnameInput.value,
  //   lnameInput.value,
  //   mostFavInput.value,
  //   leastFavInput.value,
  //   checkboxOne.value,
  //   checkboxTwo.value,
  //   checkboxThree.value,
  //   checkboxFour.value,
  //   checkboxFive.value
  // );

  // Display the object on the document
  createEntry(entryObj);

  // Clear input values
  clearInputs();

  console.log(entryObj);
}

// Adds form submit button click listener
function createListeners() {
  document
    .querySelector('#submit')
    .addEventListener('click', handleForm, false);
}

window.addEventListener('load', createListeners, false);
