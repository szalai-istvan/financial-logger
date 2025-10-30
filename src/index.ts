import express from "express";

import { getMonthlyData } from "./rest/monthly/monthlyRest.js";
import { currentMonthlyView, monthlyView } from "./view/monthlyView.js";
import { downloadScript } from "./view/downloadScript.js";
import { loadEnvironment } from "./config/envLoader.js";
import { createRequestWrapper } from "./rest/wrapRequest/wrapRequest.js";
import { downloadStylesheet } from "./view/downloadStylesheet.js";
import { createNewCost } from "./rest/cost/createNewCost.js";

loadEnvironment();

const app = express();
app.use(express.json());

// REST
app.get('/rest/monthly/:year/:month', createRequestWrapper(getMonthlyData));

app.post('/rest/cost', createRequestWrapper(createNewCost));

// create new cost
// update cost
// delete cost

// create new fixed cost
// update fixed cost
// delete fixed cost

// create new income
// update income
// delete income

// update annual goal
// update monthly goal

// create new month
// get annual summary

// export data of user

// login
// logout

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