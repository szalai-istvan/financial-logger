// Elements
const addCostDialog = document.getElementById('addCostDialog');

const costDayInput = document.getElementById('costDayInput');
const costAmountInput = document.getElementById('costAmountInput');
const costCategoryInput = document.getElementById('costCategoryInput');
const costCommentInput = document.getElementById('costCommentInput');

const CREATE_COST_URL = '/rest/cost';

function openAddCostDialog() {
    addCostDialog.showModal();
    costDayInput.value = '';
    costAmountInput.value = '';
    costCategoryInput.value = '';
    costCommentInput.value = '';
}

function closeAddCostDialog() {
    addCostDialog.close();
}

async function createCost() {
    const requestBody = {
        year: Number(year),
        month: Number(month),
        day: Number(costDayInput.value),
        amount: Number(costAmountInput.value),
        category: costCategoryInput.value,
        comment: costCommentInput.value
    };

    const valid = validateCostRequestBody(requestBody);
    if (!valid) {
        return;
    }

    const response = await postJson({
        url: CREATE_COST_URL,
        headers: {},
        body: requestBody
    });

    if (response) {
        await fetchMonthlyData();
    }

    addCostDialog.close();
}

function validateCostRequestBody(requestBody) {
    if (!requestBody.year) {
        return false;
    }

    if (!requestBody.month) {
        return false;
    }

    if (!requestBody.day) {
        return false;
    }

    if (!requestBody.amount) {
        return false;
    }

    if (!requestBody.category) {
        return false;
    }

    return true;
}