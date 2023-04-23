var crcCards = [];
var cardIDNum = 0;
const editing = {
  bool: false,
  id: -1
};

Array.prototype.swap = function (a, b) {
  var tmp = this[a];
  this[a] = this[b];
  this[b] = tmp;
  return this;
}

Array.prototype.removeElement = function (index) {
  if (index > -1) {
    this.splice(index,1);
  }
  return this;
}

Array.prototype.getCard = function (id) {
  for (let tmp of this) {
    if (tmp.id === id) {
      return tmp;
    }
  }
}

function parseInput(el, input) {
  for (let tmp of input.split(",")) {
    let line = document.createElement("li");
    line.innerHTML = tmp;
    el.appendChild(line);
  }
}

function Card(className, respList, collabList, id) {
  this.className = className;
  this.respList = respList;
  this.collabList = collabList;
  this.id = id;
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  editing.bool = false;
  editing.id = -1;

  document.getElementById("popup").style.display = "none";
  document.getElementById("class-input").value = "";
  document.getElementById("responsibilities-input").value = "";
  document.getElementById("collaborators-input").value = "";
}

function importSet() {
  let input = prompt("Provide card set information:", ' ');
  cardIDNum = 0;
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
  output = output.slice(0,-1);
  navigator.clipboard.writeText(output);
  alert("Card set information copied to clipboard.");
}

function submitButton() {
  // Get input from form
  let classInput = document.getElementById("class-input").value;
  let responsibilitiesInput = document.getElementById("responsibilities-input").value;
  let collaboratorsInput = document.getElementById("collaborators-input").value;
  if (editing.bool) {
    for (let card of document.getElementsByClassName("card")) {
      if (card.dataset.id === editing.id) {
        card.getElementsByClassName("card-header")[0].innerHTML = classInput;
        let list = card.getElementsByClassName("resp-list")[0];
        list.innerHTML = " ";
        parseInput(list, responsibilitiesInput);
        
        list = card.getElementsByClassName("collab-list")[0];
        list.innerHTML = " ";
        parseInput(list, collaboratorsInput);

        let tmp = crcCards.getCard(editing.id);
        tmp.className = classInput;
        tmp.respList = responsibilitiesInput;
        tmp.collabList = collaboratorsInput;

        break;
      }
    }
  } else {
    // Create the card given form input
    createCard(classInput, responsibilitiesInput, collaboratorsInput);
  }
  closePopup();
}

// Function to create card element on page
// includes "Delete" button and functionality
function createCard(classInput, responsibilitiesInput, collaboratorsInput) {

  let newID = (++cardIDNum).toString();
  // Push input to CRC Card array
  crcCards.push(new Card(classInput, responsibilitiesInput, collaboratorsInput, newID));

  newCard = document.createElement("div");
  newCard.className = "card";
  newCard.dataset.id = newID;
  let classInsert = document.createElement("h2");
  classInsert.className = "card-header"
  classInsert.innerHTML = classInput;

  let responsibilitiesInsert = document.createElement("ul");
  responsibilitiesInsert.className = "resp-list";
  let collaboratorsInsert = document.createElement("ul");
  collaboratorsInsert.className = "collab-list";

  parseInput(responsibilitiesInsert, responsibilitiesInput);
  parseInput(collaboratorsInsert, collaboratorsInput);

  let listsInsert = document.createElement("div");
  listsInsert.className = "lists-container"
  listsInsert.appendChild(responsibilitiesInsert);
  listsInsert.appendChild(collaboratorsInsert);

  let btnContainer = document.createElement("div");
  btnContainer.className = "card-btns";

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.dataset.id = newID;
  deleteBtn.onclick = function () {
    let card;
    let index;
    for (index = 0; index < crcCards.length; index++) {
      if (crcCards[index].id === this.dataset.id) {
        card = crcCards[index];
        break;
      }
    }
    if (confirm("Are you sure you wish to delete \"".concat(card.className, "\"?"))) {
      crcCards.removeElement(index);
      this.parentNode.parentNode.remove();
    }
  };

  let editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.innerHTML = "Edit";
  editBtn.dataset.id = newID;
  editBtn.onclick = function () {
    editing.bool = true;
    editing.id = this.dataset.id;
    let tmp = crcCards.getCard(this.dataset.id);

    document.getElementById("class-input").value = tmp.className;
    document.getElementById("responsibilities-input").value = tmp.respList;
    document.getElementById("collaborators-input").value = tmp.collabList;
    openPopup();
  };

  btnContainer.appendChild(deleteBtn);
  btnContainer.appendChild(editBtn);

  newCard.appendChild(classInsert);
  newCard.appendChild(listsInsert);
  newCard.appendChild(btnContainer);
  document.getElementById("cards-container").appendChild(newCard);
}