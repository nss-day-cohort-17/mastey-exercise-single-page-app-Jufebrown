var inventory = [];
var rowCounter = 0;

function newCard() {

}

function newRow() {
  rowCounter++;
  var newDiv = document.createElement("div");
  newDiv.addClass("row");
  newDiv.addClass(`addedRow${rowCounter}`)
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
  });
  inventoryLoader.open('GET', 'inventory.json');
  inventoryLoader.send();
}

loadInventory(populatePage);
