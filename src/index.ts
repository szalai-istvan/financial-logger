import express from "express";

import { loadEnvironment } from "./config/envLoader.js";
import { connectToMongoDb } from "./mongo/connection.js";
import { createNewCost } from "./rest/cost/createNewCost.rest.js";
import { getMonthlyData } from "./rest/monthly/monthlyRest.rest.js";
import { createAuthenticatedRequestWrapper } from "./rest/wrapRequest/wrapRequest.js";
import { downloadScript } from "./view/downloadScript.js";
import { downloadStylesheet } from "./view/downloadStylesheet.js";
import { currentMonthlyView, monthlyView } from "./view/monthlyView.js";
import bodyParser from "body-parser";

loadEnvironment();
connectToMongoDb();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST
app.get('/rest/monthly/:year/:month', createAuthenticatedRequestWrapper(getMonthlyData));

app.post('/rest/cost', createAuthenticatedRequestWrapper(createNewCost));

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