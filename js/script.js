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

    const eraseInputField = () => {
        document.querySelector(".js-newTask").value = "";
    }

    const focusInputField = () => {
        document.querySelector(".js-newTask").focus();
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
        bindEvents();
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
        focusInputField();
    };

    init();
}