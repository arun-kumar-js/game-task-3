// script.js

let entries = JSON.parse(localStorage.getItem("entries")) || [];
const entryList = document.getElementById("entry-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const netBalanceEl = document.getElementById("net-balance");
const filterRadios = document.querySelectorAll("input[name='filter']");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const typeEl = document.getElementById("type");

function updateUI() {
  const filter = document.querySelector("input[name='filter']:checked").value;

  const filteredEntries =
    filter === "all"
      ? entries
      : entries.filter((entry) => entry.type === filter);

  entryList.innerHTML = "";

  filteredEntries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center border rounded px-4 py-2 bg-gray-50";

    li.innerHTML = `
      <span>{entry.description}</span>
      <span class="₹{
        entry.type === "income" ? "text-green-500" : "text-red-500"
      }">
        ₹{entry.type === "income" ? "+" : "-"}₹${entry.amount}
      </span>
      <div class="space-x-2">
        <button onclick="editEntry(${index})" class="text-blue-500">Edit</button>
        <button onclick="deleteEntry(${index})" class="text-red-500">Delete</button>
      </div>
    `;

    entryList.appendChild(li);
  });

  const totalIncome = entries
    .filter((entry) => entry.type === "income")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpense = entries
    .filter((entry) => entry.type === "expense")
    .reduce((sum, entry) => sum + entry.amount, 0);

  totalIncomeEl.textContent = `₹${totalIncome}`;
  totalExpenseEl.textContent = `₹${totalExpense}`;
  netBalanceEl.textContent = `₹${totalIncome - totalExpense}`;
}

function addEntry() {
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const type = typeEl.value;

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details.");
    return;
  }

  entries.push({ description, amount, type });
  localStorage.setItem("entries", JSON.stringify(entries));
  updateUI();
  resetForm();
}

function editEntry(index) {
  const entry = entries[index];
  descriptionEl.value = entry.description;
  amountEl.value = entry.amount;
  typeEl.value = entry.type;
  deleteEntry(index);
}

function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  updateUI();
}

function resetForm() {
  descriptionEl.value = "";
  amountEl.value = "";
  typeEl.value = "income";
}

document.getElementById("add-btn").addEventListener("click", addEntry);
document.getElementById("reset-btn").addEventListener("click", resetForm);
filterRadios.forEach((radio) => radio.addEventListener("change", updateUI));

updateUI();
