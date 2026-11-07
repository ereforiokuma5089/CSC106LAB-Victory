// Academic Planner — plain JavaScript (no frameworks)
const STORAGE_KEY = "victory-cos106-planner-tasks";
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const dateInput = document.getElementById("task-date");
const priorityInput = document.getElementById("task-priority");
const list = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const feedback = document.getElementById("task-feedback");
const filterButtons = document.querySelectorAll("[data-filter]");
let currentFilter = "all";
let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(task => task && typeof task.id === "string" &&
      typeof task.title === "string" && typeof task.completed === "boolean" &&
      ["high", "medium", "low"].includes(task.priority) &&
      typeof task.date === "string");
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    feedback.textContent = "Tasks saved in this browser.";
  } catch (error) {
    feedback.textContent = "Tasks updated, but this browser could not save them.";
  }
}

function formatDate(dateText) {
  if (!dateText) return "No due date";
  const parts = dateText.split("-");
  if (parts.length !== 3) return "No due date";
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return Number.isNaN(date.getTime()) ? "No due date" : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function renderTasks() {
  list.replaceChildren();
  const completed = tasks.filter(task => task.completed).length;
  document.getElementById("total-count").textContent = tasks.length;
  document.getElementById("pending-count").textContent = tasks.length - completed;
  document.getElementById("completed-count").textContent = completed;
  document.getElementById("progress-count").textContent = tasks.length ? Math.round(completed / tasks.length * 100) + "%" : "0%";

  const visible = tasks.filter(task => currentFilter === "all" ||
    (currentFilter === "completed" ? task.completed : !task.completed));
  emptyState.hidden = visible.length > 0;

  visible.forEach(task => {
    const item = document.createElement("li");
    item.className = "task-item" + (task.completed ? " is-completed" : "");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.id = "task-" + task.id;
    checkbox.setAttribute("aria-label", "Mark " + task.title + " as completed");
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });
    const details = document.createElement("div");
    details.className = "task-details";
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.className = "task-name";
    label.textContent = task.title;
    const meta = document.createElement("div");
    meta.className = "task-meta";
    const due = document.createElement("span");
    due.textContent = "Due: " + formatDate(task.date);
    const priority = document.createElement("span");
    priority.className = "priority-tag priority-" + task.priority;
    priority.textContent = task.priority + " priority";
    meta.append(due, priority);
    details.append(label, meta);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-task";
    remove.textContent = "Delete";
    remove.setAttribute("aria-label", "Delete " + task.title);
    remove.addEventListener("click", () => {
      tasks = tasks.filter(saved => saved.id !== task.id);
      saveTasks();
      renderTasks();
    });
    item.append(checkbox, details, remove);
    list.append(item);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) { titleInput.focus(); return; }
  const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random();
  tasks.unshift({ id, title, date: dateInput.value, priority: priorityInput.value, completed: false });
  saveTasks();
  form.reset();
  currentFilter = "all";
  filterButtons.forEach(button => {
    const active = button.dataset.filter === currentFilter;
    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderTasks();
  titleInput.focus();
});

filterButtons.forEach(button => button.addEventListener("click", () => {
  currentFilter = button.dataset.filter;
  filterButtons.forEach(other => {
    const active = other === button;
    other.classList.toggle("selected", active);
    other.setAttribute("aria-pressed", String(active));
  });
  renderTasks();
}));

renderTasks();
