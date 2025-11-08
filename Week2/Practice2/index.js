// 
const input = document.querySelector(".todo-input");
const btn = document.querySelector(".todo-btn");
const list = document.querySelector("todo-list");

// 렌더링
const updateList = () => {
  const todo = localStorage.getItem("todo");
  list.innerHTML = todo ? `<ul>${todo}</ul>` : "";
}

// 메모 추가 버튼
btn.addEventListener("click", () => {
  localStorage.setItem("todo", input.value);
  input.value = "";
  updateList();
});

updateList();