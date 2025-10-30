const costTableTbody = 'costTableTbody';

const GET_MONTHLY_DATA_URL = `/rest/monthly/${year}/${month}`;
let CURRENT_MONTHLY_DATA = null;

async function fetchMonthlyData() {
    const response = await getJson(GET_MONTHLY_DATA_URL);
    CURRENT_MONTHLY_DATA = response;

    fillTables(response);
}

function fillTables(monthlyData) {
    rebuildTable(monthlyData.costs, ['day', 'amount', 'category', 'comment'], costTableTbody);
}