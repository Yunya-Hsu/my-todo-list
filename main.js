// 初始變數
let input = document.querySelector("#new-todo");
let addBtn = document.querySelector("#add-btn");
let listArea = document.querySelector("#list-area");
let toDoList = document.querySelector("#my-todo");
let doneList = document.querySelector("#my-done");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

// 將todos資料匯入To Do 清單中
for (let i of todos) {
  addItemToDo(i);
}

//按add button可增加清單到to do list
addBtn.addEventListener("click", checkAddValue);

//按enter鍵可增加清單到to do list
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkAddValue();
  }
});

//按垃圾桶按鈕可刪除、按編輯可以修改內容
listArea.addEventListener("click", (event) => {
  const target = event.target;
  //按垃圾桶時刪除該項
  if (target.classList.contains("delete")) {
    target.parentElement.remove();
  //在done list 按到該項時，還原回to do list
  } else if (target.classList.contains("checked")) {
    addItemToDo(target.innerText);
    target.parentElement.remove();
  //在todo list 按到該項時，移到done list
  } else if (target.tagName === "LABEL") {
    addItemDone(target.innerText);
    doneList.lastElementChild.firstElementChild.classList.add("checked");
    target.parentElement.remove();
  //按編輯icon時可調整該項item內容
  } else if (target.classList.contains("edit")) {
    if (target.previousElementSibling.tagName === "LABEL") {
      let newInput = document.createElement("input");
      newInput.classList.add("form--custom", "form-control", "me-2");
      newInput.value = target.previousElementSibling.innerText;
      target.previousElementSibling.remove();
      target.parentElement.insertBefore(newInput, target);
      let confirmIcon = document.createElement("i");
      confirmIcon.classList.add("edit-finish", "fa", "fa-check-square-o");
      target.parentElement.insertBefore(confirmIcon, target);
      target.remove();
    }
  } else if (target.classList.contains("edit-finish")) {
      let newItem = document.createElement("label");
      newItem.setAttribute("for", "todo");
      newItem.innerText = target.previousElementSibling.value;
      let editIcon = document.createElement("i")
      editIcon.classList.add("edit","fa","fa-pencil-square-o");
      target.previousElementSibling.remove();
      target.parentElement.insertBefore(newItem, target);
      target.parentElement.insertBefore(editIcon, target);
      target.remove();
    }
  }
);


function checkAddValue() {
  const validateValue = input.value.replace(/ /g, "").replace(/　/g, "");
  if (validateValue === "") {
    input.value = "";
    input.placeholder = "Empty value!!";
  } else if (input.value.length > 0) {
    addItemToDo(input.value, toDoList);
    input.value = "";
    input.placeholder = "add item";
  }
}

function addItemToDo(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="edit fa fa-pencil-square-o"></i>
    <i class="delete fa fa-trash"></i>
  `;
  toDoList.appendChild(newItem);
}

function addItemDone(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="done">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  doneList.appendChild(newItem);
}
