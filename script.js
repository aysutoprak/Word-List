var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var list = document.querySelector("ul");
var listItems = document.querySelectorAll("li");
var loadbtn = document.getElementById("loads");

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
  console.log(savedData.length);
  for (let i = 0; i < savedData.length; i++) {
    createList(savedData[i]);
  }
}

button.addEventListener("click", wordAdd);
input.addEventListener("keypress", createOnKeyPress);
list.addEventListener("click", clicks);
loadbtn.addEventListener("click", load);
