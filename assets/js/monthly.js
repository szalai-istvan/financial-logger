let monthlyData = {
    categories: [
        'Élelmiszer',
        'Egyéb bevásárlás',
        'Készétel',
        'Közlekedés',
        'Digitális szolgáltatások',
        'Egészség / Szépség',
        'Szórakozás',
        'Otthon / Rezsik',
        'Egyéb'
    ],
    expenses: [
        { id: 1, day: 1, amount: 4500, category: 'Élelmiszer', note: 'Heti bevásárlás' },
        { id: 2, day: 3, amount: 1200, category: 'Közlekedés', note: 'BKV jegy' },
        { id: 3, day: 5, amount: 3500, category: 'Készétel', note: 'Ebédfutár' },
        { id: 4, day: 8, amount: 2990, category: 'Digitális szolgáltatások', note: 'Netflix' }
    ],
    incomes: [
        { id: 1, name: 'Fizetés', amount: 450000 },
        { id: 2, name: 'Mellékes / Freelance', amount: 50000 }
    ],
    fixedExpenses: [
        { id: 1, name: 'Lakbér / Törlesztő', amount: 140000 },
        { id: 2, name: 'Rezsi (áram, gáz, víz)', amount: 35000 },
        { id: 3, name: 'Mobil & Internet', amount: 12000 }
    ],
    goal: 50000,
    schema: 'terv',
    invested: 0,
    debt: 0
};

const YEAR = Number(extractUrlParam('year', new Date().getFullYear()));
const MONTH = Number(extractUrlParam('month', new Date().getMonth() + 1));
const DAYS_IN_MONTH = getLengthOfMonth(YEAR, MONTH);

function shiftMonth(direction) {
    direction = Math.sign(direction);

    let newMonth = MONTH + direction;
    let newYear = YEAR;
    if (newMonth === 0) {
        newMonth = 12;
        newYear--;
    } else if (newMonth > 12) {
        newMonth = 1;
        newYear++;
    }

    window.location.href = `/pages/monthly.html?year=${newYear}&month=${newMonth}`;
}

function updateHeaderDateText() {
    const months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
    document.getElementById('headerDateText').innerHTML = `${YEAR}. ${months[MONTH - 1]}`;
}

function promptAddCategory() {
    const name = prompt("Adja meg az új kategória nevét:");
    if (name && name.trim() !== '') {
        const trimmed = name.trim();
        if (!monthlyData.categories.includes(trimmed)) {
            monthlyData.categories.push(trimmed);
            renderExpenses();
            updateCalculations();
            showToast(`Kategória hozzáadva: ${trimmed}`);
        } else {
            showToast("Ez a kategória már létezik!", true);
        }
    }
}

function renderExpenses() {
    const tbody = document.getElementById('expenseTableBody');
    tbody.innerHTML = '';

    monthlyData.expenses.forEach((item) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 dark:hover:bg-slate-700/40 transition";

        // Category options HTML from state categories
        const catOptions = monthlyData.categories.map(cat =>
            `<option value="${cat}" ${item.category === cat ? 'selected' : ''}>${cat}</option>`
        ).join('');

        tr.innerHTML = `
                    <td class="py-2 px-2 text-center">
                        <input type="number" min="1" max="31" value="${item.day || ''}" 
                            onchange="updateExpenseItem(${item.id}, 'day', this.value)"
                            class="w-12 text-center bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-1 py-1 focus:ring-1 focus:ring-blue-500 outline-none">
                    </td>
                    <td class="py-2 px-2">
                        <input type="number" value="${item.amount || ''}" placeholder="0"
                            oninput="updateExpenseItem(${item.id}, 'amount', this.value)"
                            class="w-full text-right font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none">
                    </td>
                    <td class="py-2 px-2">
                        <select onchange="updateExpenseItem(${item.id}, 'category', this.value)"
                            class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-1.5 py-1 focus:ring-1 focus:ring-blue-500 outline-none text-xs">
                            ${catOptions}
                        </select>
                    </td>
                    <td class="py-2 px-2">
                        <input type="text" value="${item.note || ''}" placeholder="Megjegyzés..."
                            oninput="updateExpenseItem(${item.id}, 'note', this.value)"
                            class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none">
                    </td>
                    <td class="py-2 px-1 text-center">
                        <button onclick="removeExpenseRow(${item.id})" class="text-slate-400 hover:text-red-500 transition px-1 py-1" title="Törlés">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
        tbody.appendChild(tr);
    });

    document.getElementById('expenseCountLabel').innerText = `${monthlyData.expenses.length} tétel`;
}

function renderIncomes() {
    const tbody = document.getElementById('incomeTableBody');
    tbody.innerHTML = '';

    monthlyData.incomes.forEach((item) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 dark:hover:bg-slate-700/40 transition";
        tr.innerHTML = `
                    <td class="py-2 px-3">
                        <input type="text" value="${item.name || ''}" placeholder="Név..."
                            oninput="updateIncomeItem(${item.id}, 'name', this.value)"
                            class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:ring-1 focus:ring-emerald-500 outline-none">
                    </td>
                    <td class="py-2 px-3">
                        <input type="number" value="${item.amount || ''}" placeholder="0"
                            oninput="updateIncomeItem(${item.id}, 'amount', this.value)"
                            class="w-full text-right font-semibold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:ring-1 focus:ring-emerald-500 outline-none">
                    </td>
                    <td class="py-2 px-1 text-center">
                        <button onclick="removeIncomeRow(${item.id})" class="text-slate-400 hover:text-red-500 transition px-1 py-1">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
        tbody.appendChild(tr);
    });

    document.getElementById('incomeCountLabel').innerText = `${monthlyData.incomes.length} tétel`;
}

function renderFixedExpenses() {
    const tbody = document.getElementById('fixedExpenseTableBody');
    tbody.innerHTML = '';

    monthlyData.fixedExpenses.forEach((item) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 dark:hover:bg-slate-700/40 transition";
        tr.innerHTML = `
                    <td class="py-2 px-3">
                        <input type="text" value="${item.name || ''}" placeholder="Név..."
                            oninput="updateFixedExpenseItem(${item.id}, 'name', this.value)"
                            class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none">
                    </td>
                    <td class="py-2 px-3">
                        <input type="number" value="${item.amount || ''}" placeholder="0"
                            oninput="updateFixedExpenseItem(${item.id}, 'amount', this.value)"
                            class="w-full text-right font-semibold text-red-600 dark:text-red-400 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none">
                    </td>
                    <td class="py-2 px-1 text-center">
                        <button onclick="removeFixedExpenseRow(${item.id})" class="text-slate-400 hover:text-red-500 transition px-1 py-1">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
        tbody.appendChild(tr);
    });

    document.getElementById('fixedExpenseCountLabel').innerText = `${monthlyData.fixedExpenses.length} tétel`;
}

function addExpenseRow() {
    const maxId = monthlyData.expenses.reduce((max, item) => Math.max(max, item.id), 0);
    const today = new Date().getDate();
    monthlyData.expenses.push({
        id: maxId + 1,
        day: today > 30 ? 1 : today,
        amount: 0,
        category: monthlyData.categories[0],
        note: ''
    });
    renderExpenses();
    updateCalculations();
}

function removeExpenseRow(id) {
    monthlyData.expenses = monthlyData.expenses.filter(i => i.id !== id);
    renderExpenses();
    updateCalculations();
}

function updateExpenseItem(id, field, value) {
    const item = monthlyData.expenses.find(i => i.id === id);
    if (item) {
        if (field === 'amount' || field === 'day') {
            item[field] = Number(value);
        } else {
            item[field] = value;
        }
        updateCalculations();
    }
}

function addIncomeRow() {
    const maxId = monthlyData.incomes.reduce((max, item) => Math.max(max, item.id), 0);
    monthlyData.incomes.push({ id: maxId + 1, name: '', amount: 0 });
    renderIncomes();
    updateCalculations();
}

function removeIncomeRow(id) {
    monthlyData.incomes = monthlyData.incomes.filter(i => i.id !== id);
    renderIncomes();
    updateCalculations();
}

function updateIncomeItem(id, field, value) {
    const item = monthlyData.incomes.find(i => i.id === id);
    if (item) {
        if (field === 'amount') {
            item[field] = Number(value);
        } else {
            item[field] = value;
        }
        updateCalculations();
    }
}

function addFixedExpenseRow() {
    const maxId = monthlyData.fixedExpenses.reduce((max, item) => Math.max(max, item.id), 0);
    monthlyData.fixedExpenses.push({ id: maxId + 1, name: '', amount: 0 });
    renderFixedExpenses();
    updateCalculations();
}

function removeFixedExpenseRow(id) {
    monthlyData.fixedExpenses = monthlyData.fixedExpenses.filter(i => i.id !== id);
    renderFixedExpenses();
    updateCalculations();
}

function updateFixedExpenseItem(id, field, value) {
    const item = monthlyData.fixedExpenses.find(i => i.id === id);
    if (item) {
        if (field === 'amount') {
            item[field] = Number(value);
        } else {
            item[field] = value;
        }
        updateCalculations();
    }
}

function updateCalculations() {
    // Read inputs
    const goalInput = document.getElementById('savingsGoalInput');
    monthlyData.goal = Number(goalInput.value) || 0;

    const schemaInput = document.getElementById('schemaSelect');
    monthlyData.schema = schemaInput.value;

    const investedInput = document.getElementById('sumInvestedInput');
    monthlyData.invested = Number(investedInput.value) || 0;

    const debtInput = document.getElementById('sumDebtInput');
    monthlyData.debt = Number(debtInput.value) || 0;

    // 1. Totals
    const totalIncome = monthlyData.incomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalFixedCost = monthlyData.fixedExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalExpenses = monthlyData.expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    // Footers
    document.getElementById('expenseTotalFooter').innerText = formatFt(totalExpenses);
    document.getElementById('incomeTotalFooter').innerText = formatFt(totalIncome);
    document.getElementById('fixedExpenseTotalFooter').innerText = formatFt(totalFixedCost);

    // 2. Hó eleji összegzés
    const disposableAmount = totalIncome - totalFixedCost;
    const dailyTarget = (disposableAmount - monthlyData.goal) > 0 ? (disposableAmount - monthlyData.goal) / DAYS_IN_MONTH : 0;
    const dailyZero = disposableAmount > 0 ? disposableAmount / DAYS_IN_MONTH : 0;

    document.getElementById('sumTotalIncome').innerText = formatFt(totalIncome);
    document.getElementById('sumTotalFixedCost').innerText = formatFt(totalFixedCost);
    document.getElementById('sumDisposableAmount').innerText = formatFt(disposableAmount);
    document.getElementById('sumDailyTarget').innerText = formatFt(dailyTarget);
    document.getElementById('sumDailyZero').innerText = formatFt(dailyZero);

    // 3. Összefoglaló Panel
    const currentDay = new Date().getDate();
    const daysInMonth = 30; // standard month reference
    const remainingDays = Math.max(1, daysInMonth - currentDay + 1);

    const spendableToday = (disposableAmount - totalExpenses - monthlyData.goal) / remainingDays;
    const currentSavings = disposableAmount - totalExpenses;
    const projectedSavings = currentSavings; // based on current status
    const totalWealth = (currentSavings + monthlyData.invested) - monthlyData.debt;

    document.getElementById('sumTotalExpenses').innerText = formatFt(totalExpenses);
    document.getElementById('sumSpendableToday').innerText = formatFt(spendableToday > 0 ? spendableToday : 0);
    document.getElementById('sumCurrentSavings').innerText = formatFt(currentSavings);
    document.getElementById('sumProjectedSavings').innerText = formatFt(projectedSavings);
    document.getElementById('sumTotalWealth').innerText = formatFt(totalWealth);

    // 4. Kategória szerinti bontás
    updateCategoryBreakdown(totalExpenses);
}

function updateCategoryBreakdown(totalExpenses) {
    const container = document.getElementById('categoryBreakdownContainer');
    container.innerHTML = '';

    // Map expense totals per category dynamically from appState
    const categorySums = {};
    monthlyData.categories.forEach(cat => categorySums[cat] = 0);

    monthlyData.expenses.forEach(item => {
        const cat = item.category || 'Egyéb';
        categorySums[cat] = (categorySums[cat] || 0) + (Number(item.amount) || 0);
    });

    monthlyData.categories.forEach(cat => {
        const sum = categorySums[cat] || 0;
        const percentage = totalExpenses > 0 ? Math.round((sum / totalExpenses) * 100) : 0;

        const div = document.createElement('div');
        div.className = "flex flex-col space-y-1 py-1 border-b border-slate-100 dark:border-slate-700/40 last:border-0";
        div.innerHTML = `
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-slate-700 dark:text-slate-300 font-medium">${cat}</span>
                        <span class="font-bold text-slate-800 dark:text-slate-100">${formatFt(sum)}</span>
                    </div>
                    <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div class="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style="width: ${percentage}%"></div>
                    </div>
                `;
        container.appendChild(div);
    });
}

function exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(monthlyData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `penzugyek_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Sikeres adatexportálás!");
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const parsed = JSON.parse(e.target.result);
            if (parsed && typeof parsed === 'object') {
                monthlyData = parsed;
                document.getElementById('savingsGoalInput').value = monthlyData.goal || 50000;
                document.getElementById('schemaSelect').value = monthlyData.schema || 'terv';
                document.getElementById('sumInvestedInput').value = monthlyData.invested || 0;
                document.getElementById('sumDebtInput').value = monthlyData.debt || 0;

                renderExpenses();
                renderIncomes();
                renderFixedExpenses();
                updateCalculations();
                showToast("Sikeres adatimportálás!");
            }
        } catch (err) {
            showToast("Érvénytelen fájl formátum!", true);
        }
    };
    reader.readAsText(file);
}

window.onload = function () {
    renderExpenses();
    renderIncomes();
    renderFixedExpenses();
    updateCalculations();
    updateHeaderDateText();
    searchForTabs();
};