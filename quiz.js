var inventory = [];
var rowArray = [];
var cardArray = [];
var editMode = false;
var currentCard;
var editField = document.querySelector(".description-edit");

// loop over cards and put them in the rows so that there are no more than 3 in a row
function putCardsInRows() {
  var whichRow = -1;
  for (var i = 0; i < cardArray.length; i++) {
    if (((i + 1) % 3) === 1) {
      whichRow += 1;
    }
    rowArray[whichRow].appendChild(cardArray[i]);
  }
}

// loads json info into a card
function newCard(inventoryObj) {
  var newCard = document.createElement("article");
  newCard.classList.add("col-md-4", "card");
  var makeP = document.createElement("p");
  makeP.classList.add("make");
  makeP.innerHTML = "<h5>Make: </h5>" + inventoryObj.make;
  newCard.appendChild(makeP);
  var modelP = document.createElement("p");
  modelP.classList.add("model");
  modelP.innerHTML = "<h5>Model: </h5>" + inventoryObj.model;
  newCard.appendChild(modelP);
  var yearP = document.createElement("p");
  yearP.classList.add("year");
  yearP.innerHTML = "<h5>Year: </h5>" + inventoryObj.year;
  newCard.appendChild(yearP);
  var priceP = document.createElement("p");
  priceP.classList.add("price");
  priceP.innerHTML = "<h5>Price: </h5>" + inventoryObj.price;
  newCard.appendChild(priceP);
  var descriptionP = document.createElement("p");
  descriptionP.classList.add("description");
  descriptionP.innerHTML = "<h5>Description: </h5>" + inventoryObj.description;
  newCard.appendChild(descriptionP);
  cardArray.push(newCard);
}

// creates a new row to place cards in
function newRow() {
  var newRowDiv = document.createElement("div");
  newRowDiv.classList.add("row", "cardRow");
  rowArray.push(newRowDiv);
}

// appends rows to card-wrapper div
function publishRows() {
  for (i = 0; i < rowArray.length; i++) {
    document.querySelector(".card-wrapper").appendChild(rowArray[i]);
  }
}

// gives selected card thicker border and changes background color
function highlightCard(currentCard, color) {
  currentCard.style.backgroundColor = color;
  currentCard.style.borderWidth = "3px";
}

// returns card to default styling
function revertCard(currentCard) {
  currentCard.style.backgroundColor = "white";
  currentCard.style.borderWidth = "1px";
}

// puts focus on edit field and puts text from card description in field
function editCard(currentCard) {
  editField.focus();
  editField.value = currentCard.lastChild.lastChild.textContent;
}

// makes sure currentCard is set correctly no matter where in the card the user clicks, sets up highlighting and editing
function cardOn(e) {
  editMode = true;
  var actualTarget = event.target.nodeName.toLowerCase();
  if (actualTarget === "h5" || actualTarget === "p") {
    currentCard = event.target.offsetParent;
  } else {
    currentCard = e.target
  }
  highlightCard(currentCard, "#eeffe0")
  editCard(currentCard);
}

// function for when user clicks off of card or hits enter when editing
function cardOff(e) {
  editMode = false;
  revertCard(currentCard);
  document.querySelector(".description-edit").value = "";
}

// looks at whether user clicked on a card or one of it's children
function cardClick(e) {
  var cardYes = e.target.nodeName.toLowerCase();
  if (cardYes === "article" || cardYes === "h5" || cardYes === "p") {
    if (editMode === false) {
      cardOn(e);
    } else {
      cardOff(e);
    }
  } else {
    cardOff(e);
  }
}

// edits the description of the selected card
function typeInInput(e) {
  if (editMode === true) {
    if (e.code === "Enter") {
      cardOff(e);
    } else {
      currentCard.lastChild.lastChild.textContent = editField.value;
    }
  }
}

// activates event listeners
function activateEvents() {
  var textInput = document.querySelector(".description-edit");
  textInput.addEventListener("keyup", typeInInput);
  document.querySelector("body").addEventListener("click", cardClick);
}

// populates page with JSON data, calls activatesEvents when done
function populatePage(inventory) {
  // Loop over the inventory and populate the page
  for (var i = 0; i < inventory.length; i++) {
    if (((i+1) % 3) === 1) {
      newRow();
      newCard(inventory[i]);
    } else {
      newCard(inventory[i]);
    }
  }
  putCardsInRows();
  publishRows();
  // Now that the DOM is loaded, establish all the event listeners needed
  activateEvents();
}

// Load the inventory and send a callback function to be
// invoked after the process is complete
function loadInventory() {
  var inventoryLoader = new XMLHttpRequest();

  inventoryLoader.addEventListener("load", function (e) {
    var data = JSON.parse(e.target.responseText);
    for (var i = 0; i < data.cars.length; i++) {
      inventory[i] = data.cars[i]
    }
    populatePage(inventory);
  });
  inventoryLoader.open('GET', 'inventory.json');
  inventoryLoader.send();
}

// gets the whole ball rolling
loadInventory();
