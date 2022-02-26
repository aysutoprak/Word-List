var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var list = document.querySelector("ul");
var listItems = document.querySelectorAll("li");
var loadbtn = document.getElementById("loads");
var body = document.getElementById("gradient");
var btn = document.getElementById("rnd");
var savebtn = document.getElementById("saves");

let prev = [];
if (parseJSON() != null) {
  prev = parseJSON();
}
if (prev != null) {
  localStorage.setItem("str", JSON.stringify(prev));
}

listItems.forEach(addDelete);

function createList(textToAdd) {
  var li = document.createElement("li");
  var del = document.createElement("button");
  del.innerHTML = "Delete";
  del.classList.add("deleteClass");
  li.appendChild(document.createTextNode(textToAdd));
  li.appendChild(del);
  list.appendChild(li);
}

function inputLength() {
  return input.value.length;
}

function addDelete(item) {
  var del = document.createElement("button");
  del.innerHTML = "Delete";
  del.classList.add("deleteClass");
  item.appendChild(del);
}

function createListElement() {
  createListElement(input.value);
  input.value = "";
}

function createOnClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function createOnKeyPress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    wordAdd();
  }
}

function toggleList(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
  }
}

function deleteItem(e) {
  if (e.target.className === "deleteClass") {
    e.target.parentElement.remove();
    let newStr = e.target.parentElement.innerHTML;
    newStr = newStr.replace('<button class="deleteClass">Delete</button>', "");
    let index;
    for (var i = 0; i < prev.length; i++) {
      if (prev[i] === newStr) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      prev.splice(index, 1);
    }
    localStorage.setItem("str", JSON.stringify(prev));
  }
}

function clicks(e) {
  deleteItem(e);
  toggleList(e);
}

function wordAdd() {
  if (inputLength() > 0) {
    let str = input.value;
    str = str.split(/[ ,]+/);
    for (let i = 0; i < str.length; i++) {
      createList(str[i]);
      prev.push(str[i]);
    }
    input.value = "";
    localStorage.setItem("str", JSON.stringify(prev));
  }
}

function parseJSON() {
  return JSON.parse(localStorage.getItem("str"));
}

function load() {
  let savedData = parseJSON();
  let bgclr = JSON.parse(localStorage.getItem("bgcolor"));
  body.style.background = bgcolor;
  console.log(savedData.length);
  for (let i = 0; i < savedData.length; i++) {
    createList(savedData[i]);
  }
}

var letters = "0123456789ABCDEF";

function rand() {
  return Math.floor(Math.random() * 16);
}

function generateRandom() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[rand()];
  }
  return color;
}

function setRandomButton() {
  var co1 = generateRandom();
  console.log(co1);
  var co2 = generateRandom();
  body.style.background = "linear-gradient(to right, " + co1 + ", " + co2 + ")";
  localStorage.setItem("bgcolor", JSON.stringify(body.style.background));
}

function saveColor() {
  let data = body.style.background;
  data = data.slice(17, 78);
  navigator.clipboard.writeText(data);
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied: " + data;
}

saves.addEventListener("click", saveColor);
btn.addEventListener("click", setRandomButton);
button.addEventListener("click", wordAdd);
input.addEventListener("keypress", createOnKeyPress);
list.addEventListener("click", clicks);
loadbtn.addEventListener("click", load);
