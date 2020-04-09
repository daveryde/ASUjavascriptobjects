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
  checkboxes
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
    checkboxFive,
  ];

  // Loop through checkboxes in tempArr
  for (item in tempArr) {

    // Determine values of all the selected checkboxes
    if (tempArr[item].checked) {

      // Format the value by capitalizing the first letter
      var formattedString = capitalizeWord(tempArr[item].value);

      // Only push to the array if not a duplicate
      checkboxes.push(formattedString);

      // Check is checkboxes array had values already pushed
      // if (checkboxes.length > 1) {

      //   // Loop through each value in checkboxes array
      //   for (var i = 0; i < checkboxes.length; i++) {
          
      //     // Compare the formatted string value with each item in the checkedboxes array
      //     if (formattedString === checkboxes[i]) {
      //       checkboxes.splice(i, 1);
      //     }
      //   }
      // }
    }
  }
}

function capitalizeWord(str) {
  // Set temporary variables to transform string then return the result
  // Format the value by capitalizing the first letter
  // We take the first letter of the string, capitalize, then combine the capital letter with the rest of the value of item in our array
  var entireWord = str;
  var firstLetterCap = entireWord.substr(0, 1).toUpperCase();
  var formattedWord = firstLetterCap + entireWord.substr(1);

  return formattedWord;
}

function removeDuplicates() {
  // Check is checkboxes array had values already pushed
  if (checkboxes.length > 1) {

    // Make an exact copy of the checkboxes array
    var tempArr = checkboxes;

    // Loop through each value in checkboxes array
    for (var i = 0; i < checkboxes.length; i++) {

        // Compare the values at each index in the checkedboxes array
        if (checkboxes[i] === tempArr[i]) {
          checkboxes.splice(i, 1);
        }
    }
  }
}

function validateInput() {
  // Check for valid email through Regular Expressions (Reference: https://regexr.com/)
  var emailPattern = new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );
  var emailCheck = emailPattern.test(emailInput.value);

  // Check if the input fields are blank and returns an alert if empty
  if (
    fnameInput.value === '' ||
    emailInput.value === '' ||
    mostFavInput.value === '' ||
    leastFavInput.value === ''
  ) {
    alert('Please fill in empty fields');
    return false;
  }

  // Check if the email is valid and returns an alert if invalid
  if (emailCheck === false) {
    alert('Please enter a valid email');
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

  removeDuplicates();

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
