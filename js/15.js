const addItems = document.querySelector(".add-items");
const inputItem = document.querySelector(".input-item");
const itemsList = document.querySelector(".plates");

const ITEMS_LS = "items";
const items = JSON.parse(localStorage.getItem(ITEMS_LS)) || [];

function addItem(e) {
  e.preventDefault();
  const text = inputItem.value;

  const item = {
    text,
    done: false,
  };

  items.push(item);
  creatElement(items, itemsList);
  saveItems();

  inputItem.value = "";
}

function saveItems() {
  localStorage.setItem(ITEMS_LS, JSON.stringify(items));
}

function creatElement(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  console.log(items);
  console.log(items[index]);
  items[index].done = !items[index].done;
  saveItems();
  creatElement(items, itemsList);
}

function init() {
  creatElement(items, itemsList);
  addItems.addEventListener("submit", addItem);
  itemsList.addEventListener("click", toggleDone);
}
init();
