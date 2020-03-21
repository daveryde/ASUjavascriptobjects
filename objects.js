// Custom Object Constructor
function CharacterChoice(firstName, lastName, mostFavorite, leastFavorite) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.mostFavorite = mostFavorite,
  this.leastFavorite = leastFavorite
}

// Form Controller
function handleForm(e) {
  // Prevent default submit behavior
  e.preventDefault();

  // Grab the user input element values
  var fname = document.querySelector('#fname').value;
  var lname = document.querySelector('#lname').value;
  var mostFav = document.querySelector('#top-character').value;
  var leastFav = document.querySelector('#bottom-character').value;

  if(!fname || !lname || !mostFav || leastFav) {
    console.log('empty fields')
    return false;
  }

  // Create an entry object with user input
  var entryObj = new CharacterChoice(fname, lname, mostFav, leastFav);

  // Display the object on the document
  createEntry(entryObj);
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

// Adds form submit button click listener
function createListeners() {
  document.querySelector('#submit').addEventListener('click', handleForm, false);
}

window.addEventListener('load', createListeners, false);
