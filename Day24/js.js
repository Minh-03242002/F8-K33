var addTask = document.querySelector(".add_task");
var input = document.querySelector("input");
var listTodo = document.querySelector(".list_todo");
addTask.addEventListener("click", function () {
  valueTask = input.value.trim();

  if (valueTask !== "") {
    var newItem = document.createElement("div");
    newItem.classList.add("item");

    var taskText = document.createElement("span");
    taskText.textContent = valueTask;
    taskText.addEventListener("click", function () {
      taskText.style.textDecoration = "line-through";
    });

    var iconContainer = document.createElement("div");
    iconContainer.classList.add("icon");

    var editIcon = document.createElement("i");
    editIcon.classList.add("edit", "fa-regular", "fa-pen-to-square");

    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("delete", "fa-solid", "fa-trash-can");
    deleteIcon.addEventListener("click", function () {
      listTodo.removeChild(newItem);
    });

    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteIcon);

    newItem.appendChild(taskText);
    newItem.appendChild(iconContainer);

    listTodo.appendChild(newItem);
    input.value = "";
  }
});

// var addTask = document.querySelector(".add_task")
// var input = document.querySelector("input")
// var listTodo = document.querySelector(".list_todo")

// addTask.addEventListener("click", function() {
//   var valueTask = input.value.trim();

//   if (valueTask !== "") {
//     var newItem = document.createElement("div");
//     newItem.classList.add("item1");

//     var taskText = document.createElement("span");
//     taskText.textContent = valueTask;

//     var iconContainer = document.createElement("div");
//     iconContainer.classList.add("icon");

//     var editIcon = document.createElement("i");
//     editIcon.classList.add("edit", "fa-regular", "fa-pen-to-square");

//     var deleteIcon = document.createElement("i");
//     deleteIcon.classList.add("delete", "fa-solid", "fa-trash-can");

//     iconContainer.appendChild(editIcon);
//     iconContainer.appendChild(deleteIcon);

//     newItem.appendChild(taskText);
//     newItem.appendChild(iconContainer);

//     listTodo.appendChild(newItem);

//     input.value = "";
//   }
// });

// var iconContainer = document.createElement("div");
// iconContainer.classList.add("icon");

// var editIcon = document.createElement("i");
// editIcon.classList.add("edit", "fa-regular", "fa-pen-to-square");

// var deleteIcon = document.createElement("i");
// deleteIcon.classList.add("delete", "fa-solid", "fa-trash-can");

// iconContainer.appendChild(editIcon);
// iconContainer.appendChild(deleteIcon);

// newItem.appendChild(taskText);
// newItem.appendChild(iconContainer);

// listTodo.appendChild(newItem);

// input.value = "";
//   }
// });
