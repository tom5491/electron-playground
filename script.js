const { ipcRenderer } = require('electron');
// import * as DarkModeToggle from 'https://googlechromelabs.github.io/dark-mode-toggle/src/dark-mode-toggle.mjs';

let list = document.getElementById("list");
let newTask = document.getElementById("newTask");

let at = document.getElementById("addTask");
if (at) {
    at.addEventListener('click', () => {
        list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${newTask.value}</li>`);
        const notification = {
            title: 'New Task Added!',
            body: newTask.value
        }
        new Notification(notification.title, { body: notification.body });
        newTask.value = '';

        showSnackbar(notification.title, notification.body);
    });
}

const toggle = document.getElementById('dark-mode-toggle-1');
console.log({ toggle });
const body = document.body;

// Set or remove the `dark` class the first time.
toggle.mode === 'dark' ? body.classList.add('dark') : body.classList.remove('dark');

// Listen for toggle changes (which includes `prefers-color-scheme` changes)
// and toggle the `dark` class accordingly.
toggle.addEventListener('colorschemechange', () => {
    body.classList.toggle('dark', toggle.mode === 'dark');
    ul.classList.toggle('dark', toggle.mode === 'dark');
});

function showSnackbar(title, body) {
    const notificationText = `A new task has been added: <i>${body}</i>`;
    document.getElementById('toast-text').innerText = notificationText;
    var x = document.getElementById("snackbar");
    x.className = "show";

    var btn = document.getElementById("btn");
    btn.addEventListener("click", closeToast);
    setTimeout(function () { x.className = x.className.replace("show", "hide"); }, 8000);
}

function closeToast() {
    console.log("Button Clicked");
    var x = document.getElementById("snackbar");
    x.className = x.className.replace("show", "hide");
}
