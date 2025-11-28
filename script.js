const API_URL = 'https://67d64b81286fdac89bc18855.mockapi.io/todo';

const todoInput = document.querySelector('.add-todo-container input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

let isEditing = false;
let currentEditId = null;

document.addEventListener('DOMContentLoaded', fetchTodos);

async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        renderTodos([]);
    }
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
            <span class="todo-text">${escapeHtml(todo.name || todo.title || '')}</span>
            <div class="actions">
                <i class="fa-solid fa-pen edit-btn"></i>
                <i class="fa-solid fa-trash delete-btn"></i>
            </div>
        `;

        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTodo(todo.id, todo.completed));

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => startEdit(todo));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoList.appendChild(li);
    });
}

addBtn.addEventListener('click', handleAddOrUpdate);

async function handleAddOrUpdate() {
    const text = todoInput.value.trim();
    if (!text) return;

    if (isEditing) {
        await updateTodo(currentEditId, text);
    } else {
        await addTodo(text);
    }

    todoInput.value = '';
}

async function addTodo(name) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, completed: false })
        });

        if (response.ok) {
            await fetchTodos();
        } else {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`Failed to add todo: ${response.status}`);
        }
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add todo. Please check console for details.');
    }
}

async function updateTodo(id, name) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            isEditing = false;
            currentEditId = null;
            addBtn.textContent = 'Add';
            await fetchTodos();
        } else {
            throw new Error('Failed to update todo');
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        alert('Failed to update todo. Please try again.');
    }
}

async function toggleTodo(id, currentStatus) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !currentStatus })
        });

        if (response.ok) {
            await fetchTodos();
        } else {
            throw new Error('Failed to toggle todo');
        }
    } catch (error) {
        console.error('Error toggling todo:', error);
        alert('Failed to update todo status. Please try again.');
    }
}

async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            if (isEditing && currentEditId === id) {
                isEditing = false;
                currentEditId = null;
                addBtn.textContent = 'Add';
                todoInput.value = '';
            }
            await fetchTodos();
        } else {
            throw new Error('Failed to delete todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo. Please try again.');
    }
}

function startEdit(todo) {
    isEditing = true;
    currentEditId = todo.id;
    todoInput.value = todo.name || todo.title || '';
    addBtn.textContent = 'Save';
    todoInput.focus();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
