var inventory = [];
var rowArray = [];
var cardArray = [];

function putCardsInRows() {
  var whichRow = 0;
  for (var i = 0; i < cardArray.length; i++) {
    if ((i % 3) === 1) {
      whichRow++;
    }
    rowArray[whichRow].appendChild(cardArray[i])
  }
}

function newCard(inventoryObj) {
  var newCard = document.createElement("article");
  newCard.classList.add("col-md-4");
  var makeP = document.createElement("p");
  makeP.classList.add("make");
  makeP.innerHTML = inventoryObj.make;
  newCard.appendChild(makeP);
  var modelP = document.createElement("p");
  modelP.classList.add("model");
  modelP.innerHTML = inventoryObj.model;
  newCard.appendChild(modelP);
  var yearP = document.createElement("p");
  yearP.classList.add("year");
  yearP.innerHTML = inventoryObj.year;
  newCard.appendChild(yearP);
  var priceP = document.createElement("p");
  priceP.classList.add("price");
  priceP.innerHTML = inventoryObj.price;
  newCard.appendChild(priceP);
  var descriptionP = document.createElement("p");
  descriptionP.classList.add("description");
  descriptionP.innerHTML = inventoryObj.description;
  newCard.appendChild(descriptionP);
}

function newRow() {
  var newRowDiv = document.createElement("div");
  newRowDiv.classList.add(`addedRow${rowCounter} row`);
  rowArray.push(newRowDiv)
}

function publishRows() {
  for (i = 0; i < rowArray.length; i++) {
    document.querySelector(".card-wrapper").appendChild(rowArray[i]);
  }
}

function populatePage (inventory) {
  // Loop over the inventory and populate the page
  for (var i = 0; i < inventory.length; i++) {
    if ((inventory[i] % 3) === 1) {
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

function loadInventory (callback) {
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

loadInventory(populatePage);
