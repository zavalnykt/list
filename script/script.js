document.addEventListener("DOMContentLoaded", () => {
    const newTaskInput = document.getElementById("newTaskInput");
    const taskList = document.getElementById("taskList");

    newTaskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && newTaskInput.value.trim() !== "") {
            addTask(newTaskInput.value);
            newTaskInput.value = "";
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task");

        const taskContent = document.createElement("p");
        taskContent.textContent = taskText;
        
        const taskDate = document.createElement("span");
        taskDate.classList.add("date");
        const date = new Date();
        taskDate.textContent = `${date.toLocaleDateString()}, ${date.toLocaleTimeString().slice(0, 5)}`;
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => markCompleted(taskItem, checkbox, taskContent));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✖";
        deleteButton.addEventListener("click", () => taskList.removeChild(taskItem));

        taskContent.appendChild(taskDate);
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);
        
        taskContent.addEventListener("dblclick", () => editTask(taskContent));

        taskList.appendChild(taskItem);
    }

    function markCompleted(taskItem, checkbox, taskContent) {
        if (checkbox.checked) {
            taskContent.classList.add("completed");
            taskItem.removeChild(checkbox);
        }
    }

    function editTask(taskContent) {
        const currentText = taskContent.childNodes[0].textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.classList.add("editInput");
        
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter" && input.value.trim() !== "") {
                taskContent.childNodes[0].textContent = input.value;
                taskContent.removeChild(input);
            }
        });

        taskContent.replaceChild(input, taskContent.childNodes[0]);
        input.focus();
    }
});
