import express from "express";

import { getMonthlyData } from "./rest/monthlyRest.js";
import { currentMonthlyView, monthlyView } from "./view/monthlyView.js";
import { downloadScript } from "./view/downloadScript.js";
import { loadEnvironment } from "./config/envLoader.js";
import { createRequestWrapper } from "./rest/wrapRequest/wrapRequest.js";
import { downloadStylesheet } from "./view/downloadStylesheet.js";

loadEnvironment();

const app = express();
app.use(express.json());

// REST
app.get('/rest/monthly/:year/:month', createRequestWrapper(getMonthlyData));

// views
app.get('/script/:subdirectory/:filename', downloadScript);
app.get('/styles/:subdirectory/:filename', downloadStylesheet);
app.get('/view/monthly/:year/:month', monthlyView);
app.get('/', currentMonthlyView);


const port = process.env.PORT;
if (!port) {
    console.error('Missing environment variable: port!');
    process.exit();
}
app.listen(port, () => console.log(`Server running on port ${port}`));