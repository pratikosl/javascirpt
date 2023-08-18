//declaring variabs to acces the html tags
let mylist = document.getElementById("myList");
let note = document.getElementById("note");
let addbtn = document.getElementById("add");
let data = localStorage.getItem('text');
let glCount = localStorage.getItem('glCounter');

//checking the object retrived from local storage of browser 
if (data == null || glCount == null) {
  data = {};
  glCount = 0;
}
else {
  data = JSON.parse(data);
}

//edit button for updating content of notes 
function edtbutn() {
  let id = this.getAttribute("parent");
  document.getElementById(id).style.border="solid 1px";
  //checking for the contentEditable property
  if (document.getElementById(id).getAttribute("contentEditable") == "false") {
    document.getElementById(id).contentEditable = "true";
    this.innerText = "Save";
  }
  else {
    document.getElementById(id).contentEditable = "false";
    let li = document.getElementById(id);
    li.innerText=li.innerText.trim();
    if (li.innerText == "" || /^[0-9]+$/.test(li.innerText) == true) {
      alert("enter text in correct form");
      window.location.replace("/");
    }
    //after editing the content, updating it to local storage of browser
    else {
      this.innerText = "Edit";
      let con_text = JSON.parse(localStorage.getItem('text'));
      con_text[Number(id)] = li.innerText;
      localStorage.setItem('text', JSON.stringify(con_text));
      window.location.replace("file:///home/osl/To-do-list/index.html");
    }
  }
}


// Delete function for deleting the notes from web page and local storage
function dltbtn() {
  let id = this.getAttribute("parent");
  let data = localStorage.getItem("text");
  data = JSON.parse(data);
  delete data[Number(id)];
  localStorage.setItem("text", JSON.stringify(data));
  window.location.replace("file:///home/osl/To-do-list/index.html");
}

//making the function makeNode to make node and assigning the edit and delete button
function makeNode(text, id) {
  let parent = document.createElement("li");
  let node = document.createElement("span");
  parent.appendChild(node);
  node.innerText = text;
  node.setAttribute("id", id);
  node.contentEditable = "false";

  let edtbtn = document.createElement("button");
  edtbtn.innerText = "Edit";
  edtbtn.setAttribute("parent", id);
  edtbtn.addEventListener("click", edtbutn);
  parent.appendChild(edtbtn);

  let delbtn = document.createElement("button");
  delbtn.innerText = "Delete";
  delbtn.setAttribute("parent", id);
  delbtn.addEventListener("click", dltbtn);
  parent.appendChild(delbtn);
  return parent;
}

//making add item function to add new content to note and local storage 
function addItem() {
  note.value=note.value.trim();
  if (note.value == "" || /^[0-9\n]+$/.test(note.value) == true) {
    alert("Please enter text in correct format");
  }
  else {
    mylist.appendChild(makeNode(note.value, glCount));
    data[glCount++] = note.value;
    localStorage.setItem('text', JSON.stringify(data));
    localStorage.setItem('glCounter', glCount);
    note.value = "";

  }
}
addbtn.addEventListener('click', addItem);

//init function to display existing note item to the webpage
function init() {
  for (key in data) {
    mylist.appendChild(makeNode(data[key], key));
  }
}

init();