function rebuildTable(objArray, keysInOrder, tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) {
        throw new Error(`Invalid tbodyId=${tbodyId}`);
    }

    tbody.children = [];
    objArray.forEach(obj => appendRowToRable(obj, keysInOrder, tbodyId));
}

function appendRowToRable(obj, keysInOrder, tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) {
        throw new Error(`Invalid tbodyId=${tbodyId}`);
    }

    const tdArray = keysInOrder
        .map(key => obj[key])
        .map(x => x || '')
        .map(x => x.toString())
        .map(x => td(x));
    
    const trElement = tr(tdArray);
    tbody.appendChild(trElement);
}

function tr(tdArray) {
    const trElement = document.createElement('tr');
    tdArray.forEach(tdElement => trElement.appendChild(tdElement));
    return trElement;
}

function td(text) {
    const tdElement = document.createElement('td');
    tdElement.innerHTML = text;
    return tdElement;
}