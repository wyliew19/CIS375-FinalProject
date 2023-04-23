var crcCards = [];

Array.prototype.swap = function (a, b) {
  var tmp = this[a];
  this[a] = this[b];
  this[b] = tmp;
  return this;
}

function Card(className, respList, collabList) {
  this.className = className;
  this.respList = respList;
  this.collabList = collabList;
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("class-input").value = "";
  document.getElementById("responsibilities-input").value = "";
  document.getElementById("collaborators-input").value = "";
}

function importSet() {
  let input = prompt("Provide card set information:", ' ');

  if (input === null) {
    return;
  }

  for (let card of Array.from(document.getElementsByClassName("card"))) {
    card.remove();
  }
  crcCards = [];

  for(let card of input.split(";")) {
    let tmp = card.split("|");
    createCard(tmp[0], tmp[1], tmp[2]);
  }
}

function exportSet() {
  let output = "";
  for (let card of crcCards) {
    output = output.concat(card.className, "|", card.respList, "|", card.collabList, ";");
  }
  navigator.clipboard.writeText(output);
  alert("Card set information copied to clipboard.");
}

function submitButton() {
  // Get input from form
  let classInput = document.getElementById("class-input").value;
  let responsibilitiesInput = document.getElementById("responsibilities-input").value;
  let collaboratorsInput = document.getElementById("collaborators-input").value;

  // Create the card given form input
  createCard(classInput, responsibilitiesInput, collaboratorsInput);
}

// Function to create card element on page
// includes "Delete" button and functionality
function createCard(classInput, responsibilitiesInput, collaboratorsInput) {

  

  // Push input to CRC Card array
  crcCards.push(new Card(classInput, responsibilitiesInput, collaboratorsInput));

  newCard = document.createElement("div");
  newCard.className = "card";
  let classInsert = document.createElement("h2");
  classInsert.innerHTML = classInput;

  let responsibilitiesInsert = document.createElement("ul");
  let collaboratorsInsert = document.createElement("ul");

  for (let resp of responsibilitiesInput.split(",")) {
    let tmp = document.createElement("li");
    tmp.innerHTML = resp;
    responsibilitiesInsert.appendChild(tmp);
  }

  for (let collab of collaboratorsInput.split(",")) { 
    let tmp = document.createElement("li");
    tmp.innerHTML = collab;
    collaboratorsInsert.appendChild(tmp);
  }

  let listsInsert = document.createElement("div");
  listsInsert.className = "lists-container"
  listsInsert.appendChild(responsibilitiesInsert);
  listsInsert.appendChild(collaboratorsInsert);
  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.dataset.className = classInput;
  deleteBtn.onclick = function () {
    if (confirm("Are you sure you wish to delete \"".concat(this.dataset.className, "\"?"))) {
      for (let i = 0; i < crcCards.length - 1; i++) {
        if (this.dataset.className === crcCards[i].className) {
          crcCards.swap(i, i + 1);
        }
      }
      crcCards.pop();
      this.parentNode.remove();
    }
  };

  newCard.appendChild(classInsert);
  newCard.appendChild(listsInsert);
  newCard.appendChild(deleteBtn);
  document.getElementById("cards-container").appendChild(newCard);
  closePopup();
}