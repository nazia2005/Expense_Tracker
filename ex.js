// let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// const expenseName = document.getElementById("expenseName");
// const expenseAmount = document.getElementById("expenseAmount");
// const addExpenseBtn = document.getElementById("addExpenseBtn");
// const expenseList = document.getElementById("expenseList");
// const totalAmount = document.getElementById("totalAmount");
// const clearAllBtn = document.getElementById("clearAllBtn");

// addExpenseBtn.addEventListener("click", addExpense);
// expenseList.addEventListener("click", handleExpenseAction);
// clearAllBtn.addEventListener("click", clearAllExpenses);

// function addExpense() {
//     const name = expenseName.value.trim();
//     const amount = parseFloat(expenseAmount.value);

//     if (name === "" || isNaN(amount) || amount <= 0) {
//         alert("Please enter valid expense details.");
//         return;
//     }

//     expenses.push({ name, amount });
//     saveAndRender();
//     expenseName.value = "";
//     expenseAmount.value = "";
// }

// function handleExpenseAction(event) {
//     const index = event.target.dataset.index;

//     if (event.target.classList.contains("delete-btn")) {
//         expenses.splice(index, 1);
//         saveAndRender();
//     }
// }

// function renderExpenses() {
//     expenseList.innerHTML = "";

//     let total = 0;

//     expenses.forEach((expense, index) => {
//         total += expense.amount;

//         const li = document.createElement("li");
//         li.className = "list-group-item d-flex justify-content-between align-items-center";
//         li.innerHTML = `
//             ${expense.name} - ₹${expense.amount.toFixed(2)}
//             <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
//         `;
//         expenseList.appendChild(li);
//     });

//     totalAmount.innerText = total.toFixed(2);
// }

// function saveAndRender() {
//     localStorage.setItem("expenses", JSON.stringify(expenses));
//     renderExpenses();
// }

// function clearAllExpenses() {
//     if (confirm("Are you sure you want to clear all expenses?")) {
//         expenses = [];
//         saveAndRender();
//     }
// }

// // Initial render
// renderExpenses();



let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const clearAllBtn = document.getElementById("clearAllBtn");
const searchInput = document.getElementById("searchInput");

addExpenseBtn.addEventListener("click", addExpense);
expenseList.addEventListener("click", handleExpenseAction);
clearAllBtn.addEventListener("click", clearAllExpenses);
searchInput.addEventListener("input", filterExpenses);

function addExpense() {
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push({ name, amount });
    saveAndRender();
    expenseName.value = "";
    expenseAmount.value = "";
}

function handleExpenseAction(event) {
    const index = event.target.dataset.index;

    if (event.target.classList.contains("delete-btn")) {
        expenses.splice(index, 1);
        saveAndRender();
    } else if (event.target.classList.contains("edit-btn")) {
        const expense = expenses[index];
        expenseName.value = expense.name;
        expenseAmount.value = expense.amount;
        expenses.splice(index, 1); // Remove for editing
        saveAndRender();
    }
}

function renderExpenses(expenseArray = expenses) {
    expenseList.innerHTML = "";

    let total = 0;

    expenseArray.forEach((expense, index) => {
        total += expense.amount;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span>${expense.name} - ₹${expense.amount.toFixed(2)}</span>
            <div>
                <button class="btn btn-sm btn-warning edit-btn me-2" data-index="${index}">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        expenseList.appendChild(li);
    });

    totalAmount.innerText = total.toFixed(2);
}

function saveAndRender() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
}

function clearAllExpenses() {
    if (confirm("Are you sure you want to clear all expenses?")) {
        expenses = [];
        saveAndRender();
    }
}

function filterExpenses() {
    const query = searchInput.value.toLowerCase();
    const filtered = expenses.filter(expense => 
        expense.name.toLowerCase().includes(query)
    );
    renderExpenses(filtered);
}

// Initial Render
renderExpenses();
