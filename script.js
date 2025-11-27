const STORAGE_KEY = 'todo-app-items';

const todoInput = document.querySelector('.add-todo-container input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

let isEditing = false;
let currentEditId = null;
let todos = [];

document.addEventListener('DOMContentLoaded', init);

function init() {
    todos = loadTodos();
    renderTodos(todos);
}

function loadTodos() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (Array.isArray(stored)) {
            return stored;
        }
    } catch (error) {
        console.warn('Unable to parse todos from storage:', error);
    }

    const seedData = [
        createTodo('Have breakfast'),
        createTodo('Do homework'),
        createTodo('Check email', true)
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createTodo(name, completed = false) {
    return {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        name,
        completed
    };
}

function renderTodos(list) {
    todoList.innerHTML = '';

    if (!list.length) {
        const emptyState = document.createElement('li');
        emptyState.className = 'todo-item empty';
        emptyState.textContent = 'No tasks yet. Add one above!';
        todoList.appendChild(emptyState);
        return;
    }

    list.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${escapeHtml(todo.name)}</span>
            <div class="actions">
                <i class="fa-solid fa-pen edit-btn"></i>
                <i class="fa-solid fa-trash delete-btn"></i>
            </div>
        `;

        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => startEdit(todo));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoList.appendChild(li);
    });
}

addBtn.addEventListener('click', handleAddOrUpdate);

function handleAddOrUpdate() {
    const text = todoInput.value.trim();
    if (!text) return;

    if (isEditing) {
        updateTodo(currentEditId, text);
    } else {
        addTodo(text);
    }

    todoInput.value = '';
}

function addTodo(name) {
    todos.push(createTodo(name));
    persistChanges();
}

function updateTodo(id, name) {
    todos = todos.map(todo => todo.id === id ? { ...todo, name } : todo);
    isEditing = false;
    currentEditId = null;
    addBtn.textContent = 'Add';
    persistChanges();
}

function toggleTodo(id) {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    persistChanges();
}

function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    todos = todos.filter(todo => todo.id !== id);
    if (isEditing && currentEditId === id) {
        isEditing = false;
        currentEditId = null;
        addBtn.textContent = 'Add';
        todoInput.value = '';
    }
    persistChanges();
}

function persistChanges() {
    saveTodos();
    renderTodos(todos);
}

function startEdit(todo) {
    isEditing = true;
    currentEditId = todo.id;
    todoInput.value = todo.name;
    addBtn.textContent = 'Save';
    todoInput.focus();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
