var form=document.getElementById("form-container");
function submitForm(event){
   event.preventDefault();
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function createCard() {
  let classInput = document.getElementById("class-input").value;
  let responsibilitiesInput = document.getElementById("responsibilities-input").value;
  let collaboratorsInput = document.getElementById("collaborators-input").value;
  alert(classInput + responsibilitiesInput + collaboratorsInput);
  newCard = document.createElement("div");
  newCard.className = "card";
  let classInsert = "<h2>" + classInput + "</h2>";
  let responsibilitiesInsert = "<ul>";
  let collaboratorsInsert = "<ul>";
  responsibilitiesInput.split(",").forEach(e => responsibilitiesInsert.concat("<li>" + e + "</li>"));
  collaboratorsInput.split(",").forEach(e => collaboratorsInsert.concat("<li>" + e + "</li>"));
  newCard.innerHTML = classInsert + collaboratorsInsert + "</ul>" + responsibilitiesInsert + "</ul>";
  document.getElementById("cards-container").appendChild(newCard);
  closePopup();
}
