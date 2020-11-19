const  todaySection = document.querySelector(".js-today"),
       clock = document.querySelector(".js-time"),
       //To Do
       toDoForm = document.querySelector(".js-form"),
       toDoInput = toDoForm.querySelector("input"),
       toDoList = document.querySelector(".js-toDoList");



//check local storage
const TODOS_LS = 'toDos';
let toDos = [];



//toDolist Update
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = " " + text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild (li);

    const toDoObj ={
        text: text,
        id: newId
    }

    toDos.push(toDoObj);
    saveToDos();
    
}


function handleSubmit(event){
    event.preventDefault;
    const currentValues = toDoInput.value;
    paintToDo(currentValues);
    toDoInput.value = "";
}

function loadToDos(){
    const currentStatus = localStorage.getItem(TODOS_LS);
    if(currentStatus !== null){
        const parsedStatus = JSON.parse(currentStatus);
        parsedStatus.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }

}

// today and time 
function showNow(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const today = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    todaySection.innerText = `${year}-${month < 10 ? `0${month}` : month}-${today < 10 ? `0${today}` : today}`;
    clock.innerText = `${hour < 10 ? `0${hour}` : hour} : ${minute < 10 ? `0${minute}`: minute}`;
}

function init(){
  //call today and time
  showNow();
  // call toDo
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);


}

init();