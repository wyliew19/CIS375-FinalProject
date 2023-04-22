function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("class-input").value = "";
  document.getElementById("responsibilities-input").value = "";
  document.getElementById("collaborators-input").value = "";
}

function createCard() {
  let classInput = document.getElementById("class-input").value;
  let responsibilitiesInput = document.getElementById("responsibilities-input").value;
  let collaboratorsInput = document.getElementById("collaborators-input").value;
  newCard = document.createElement("div");
  newCard.className = "card";
  let classInsert = document.createElement("h2");
  classInsert.innerHTML = classInput;
  let responsibilitiesInsert = document.createElement("ul");
  let collaboratorsInsert = document.createElement("ul");
  responsibilitiesInput.split(",").forEach(e => {
    let tmp = document.createElement("li");
    tmp.innerHTML = e;
    responsibilitiesInsert.appendChild(tmp);
  });
  collaboratorsInput.split(",").forEach(e => {
    let tmp = document.createElement("li");
    tmp.innerHTML = e; 
    collaboratorsInsert.appendChild(tmp);
  });
  let listsInsert = document.createElement("div");
  listsInsert.className = "lists-container"
  listsInsert.appendChild(responsibilitiesInsert);
  listsInsert.appendChild(collaboratorsInsert);
  newCard.appendChild(classInsert);
  newCard.appendChild(listsInsert);
  document.getElementById("cards-container").appendChild(newCard);
  closePopup();
}
