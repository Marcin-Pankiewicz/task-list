{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }
    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);

            });
        });
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);

            });

        });
    }
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += ` 
            <li class="taskList__item">
            <button class="taskList__button taskList__button--done js-done">${task.done ? "&#10004" : ""}
            </button>
            <span class="taskList__span${task.done ? " taskList__item--done" : ""}">${task.content}
            </span> 
            <button class="taskList__button taskList__button--remove js-remove">&#10006
            </button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        render();
    };

    init();
}