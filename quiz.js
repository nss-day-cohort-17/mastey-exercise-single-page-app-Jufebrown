var inventory = [];
var rowArray = [];
var cardArray = [];

function putCardsInRows() {
  var whichRow = -1;
  for (var i = 0; i < cardArray.length; i++) {
    if (((i + 1) % 3) === 1) {
      whichRow += 1;
    }
    rowArray[whichRow].appendChild(cardArray[i]);
  }
}

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

function newRow() {
  var newRowDiv = document.createElement("div");
  newRowDiv.classList.add("row", "cardRow");
  rowArray.push(newRowDiv);
}

function publishRows() {
  for (i = 0; i < rowArray.length; i++) {
    document.querySelector(".card-wrapper").appendChild(rowArray[i]);
  }
}

function enterOnInput(e) {

}

function cardClick (e) {

}

function activateEvents() {
  var textInput = document.querySelector(".description-edit");
  textInput.addEventListener("keyup", enterOnInput;
  document.querySelector("body").addEventListener("click", cardClick);
}

function populatePage (inventory) {
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
  // activateEvents();
}

// Load the inventory and send a callback function to be
// invoked after the process is complete

function loadInventory () {
  var inventoryLoader = new XMLHttpRequest();

  inventoryLoader.addEventListener("load", function (e) {
    var data = JSON.parse(e.target.responseText);
    console.log(data)
    for (var i = 0; i < data.cars.length; i++) {
      inventory[i] = data.cars[i]
    }
    console.log("inventory[]",inventory);
    populatePage(inventory);
  });
  inventoryLoader.open('GET', 'inventory.json');
  inventoryLoader.send();
}

loadInventory();
