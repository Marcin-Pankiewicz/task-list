{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleAllTaskDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const eraseInputField = () => {
        document.querySelector(".js-newTask").value = "";
    };

    const focusInputField = () => {
        document.querySelector(".js-newTask").focus();
    };

    const toggleAllTaskHidden = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const removeAllTasks = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex, 0),
        ];
        render();
    };

    const bindButtonsEvents = () => {
        const doneAllTasksButton = document.querySelector(".js-toggleDoneAllTasksButton");

        if (doneAllTasksButton && !doneAllTasksButton.disabled) {
            doneAllTasksButton.addEventListener("click", toggleAllTaskDone);
        }

        const hideAllDoneTasksButton = document.querySelector(".js-hideAllDoneTasksButton");

        if (hideAllDoneTasksButton) {
            hideAllDoneTasksButton.addEventListener("click", toggleAllTaskHidden);
        }

        const removeAllTaskButton = document.querySelector(".js-removeAllTaskButton");
        if (removeAllTaskButton) {
            removeAllTaskButton.addEventListener("click", removeAllTasks);
        };
    };

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
    };

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += ` 
        <li class="taskList__item${task.done && hideDoneTasks ? " taskList__item--hidden" : ""}">
        <button class="taskList__button taskList__button--toggleDone js-done">
        ${task.done ? "&#10004" : ""}
        </button>
        <span class="taskList__span${task.done ? " taskList__span--done" : ""}">
        ${task.content}
        </span> 
        <button class="taskList__button taskList__button--remove js-remove">
        &#128465
        </button>
        </li>
        `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let taskListButtonsHTML = "";

        if (tasks >= [0]) {
            taskListButtonsHTML += `
        <button class="taskList__optionButton js-hideAllDoneTasksButton">
        ${hideDoneTasks ? "Ukryj" : "Pokaż"} ukończone
        </button>
        <button class="taskList__optionButton taskList__optionButton--disabled js-toggleDoneAllTasksButton"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        <button class="taskList__optionButton js-removeAllTaskButton">
        Usuń wszystkie
        </button>`

        };
        document.querySelector(".js-headerButtons").innerHTML = taskListButtonsHTML;
    };

    const render = () => {
        renderTask();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
        eraseInputField();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            eraseInputField();
            focusInputField();
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