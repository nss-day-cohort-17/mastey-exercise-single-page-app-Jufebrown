var inventory = [];
var rowCounter = 0;
var rowArray = [];

function newCard(inventoryObj) {
  var newCard = document.createElement("article");
  newCard.addClass("col-md-4")
}

function newRow() {
  rowCounter++;
  var newRowDiv = document.createElement("div");
  newRowDiv.addClass("row");
  newRowDiv.addClass(`addedRow${rowCounter}`);
  rowArray.push(newRowDiv)
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

  // Now that the DOM is loaded, establish all the event listeners needed
  activateEvents();
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
    console.log(inventory);
    populatePage();
  });
  inventoryLoader.open('GET', 'inventory.json');
  inventoryLoader.send();
}

loadInventory(populatePage);
