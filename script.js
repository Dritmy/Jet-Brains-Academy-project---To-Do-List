let addBtn = document.querySelector("#add-task-button");
let inptTask = document.getElementById("input-task");
let tasks = document.querySelector("#task-list");
const list = document.querySelector(".container ul")

let taskList;
!localStorage.tasks ? taskList = [] : taskList = JSON.parse(localStorage.getItem("tasks"));
if (taskList.length != 0) {
    refresh();
}


//upgrade page
function refresh () {
    for (let i = 0; i < taskList.length; i++) {
        //create checkbox
        const myCheck = document.createElement("input");
        myCheck.type = "checkbox";
        myCheck.className = "check";
        if (taskList[i].completed) {
            myCheck.checked = true;
        }

        //create li element
        const myLi = document.createElement("li");

        list.appendChild(myLi);
        myLi.appendChild(myCheck);

        //create span for task
        const mySpan = document.createElement("span");
        mySpan.className = "task";
        mySpan.innerHTML = taskList[i].description;
        if (taskList[i].completed) {
            mySpan.style.textDecoration = "line-through";
        }
        myLi.appendChild(mySpan)

        //create delete btn
        const myBtn = document.createElement("button");
        myBtn.className = "delete-btn";
        myBtn.innerHTML = "&#10006";
        myLi.appendChild(myBtn);

        console.log("Complete refresh");

    }
}


function Task (description) {
    this.description = description;
    this.completed = false;
}


//add task
addBtn.onclick = function () {
    console.log("add button click");
    if (inptTask != "") {

        //local
        taskList.push(new Task(inptTask.value));
        updateLocal();

        //create checkbox
        const myCheck = document.createElement("input");
        myCheck.type = "checkbox";
        myCheck.className = "check";

        //create li element
        const myLi = document.createElement("li");

        list.appendChild(myLi);
        myLi.appendChild(myCheck);

        //create span for task
        const mySpan = document.createElement("span");
        mySpan.className = "task";
        mySpan.innerHTML = inptTask.value;
        myLi.appendChild(mySpan)

        //create delete btn
        const myBtn = document.createElement("button");
        myBtn.className = "delete-btn";
        myBtn.innerHTML = "&#10006";
        myLi.appendChild(myBtn);

        inptTask.value = "";

        //delete task
        delBtn = document.querySelectorAll(".delete-btn");
        delTask();

        //checkbox
        check = document.querySelectorAll(".check");
        span = document.querySelectorAll(".task");
        checkboxChange();




    }
}

//delete task
function delTask () {
    let delBtn = document.querySelectorAll(".delete-btn");
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener("click", ()=> {
            delBtn[i].parentElement.remove();
            let j = i;
            for ( ; j < taskList.length - 1; j++) {
                taskList[j].description = taskList[j+1].description;
                taskList[j].completed = taskList[j+1].completed;
            }
            taskList.splice(taskList.length - 1, 1);
            updateLocal();
        })
    }
}
delTask();

//checkbox
function checkboxChange () {
    let check = document.querySelectorAll(".check");
    let span = document.querySelectorAll(".task");
    for (let i = 0; i < check.length; i++) {
        check[i].addEventListener("click", ()=> {
            if (check[i].checked == true) {
                span[i].style.textDecoration = "line-through";
                taskList[i].completed = true;
            } else {
                span[i].style.textDecoration = "none";
                taskList[i].completed = false;
            }
            console.log(taskList[i].completed);
            updateLocal();
        })
    }
}
checkboxChange();

const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

