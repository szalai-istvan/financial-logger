const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

async function getJson(path) {
    const response = await fetch(path);
    if (!response.ok) {
        console.error(`getJson('${path}') failed.`);
        return undefined;
    }

    const result = await response.json();
    return result;
}

async function postJson({path, header, body}) {
    const response = await fetch(url, {method: POST, headers: headers, body: body});
    if (!response.ok) {
        console.error(`postJson('${url}') failed.`);
        return undefined;
    }

    const result = await response.json();
    return result;
}