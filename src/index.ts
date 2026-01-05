import express from "express";

import bodyParser from "body-parser";
import { Config } from "./config/config.js";
import { Mongo } from "./db/connection.js";
import { RequestWrapper } from "./_old/rest/wrapRequest/RequestWrapper.wrapper.js";
import { CreateUserAction } from "./action/createUser.action.js";

Config.loadEnvironment();
Mongo.connectToMongoDb();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST
// app.get('/rest/monthly/:year/:month', createAuthenticatedRequestWrapper(getMonthlyData));

// create new cost
// app.post('/rest/cost', createAuthenticatedRequestWrapper(createNewCost));
// update cost
// app.put('/rest/cost', createAuthenticatedRequestWrapper(modifyCost));
// delete cost
// app.delete('/rest/cost:year/:month/:costId', createAuthenticatedRequestWrapper(deleteCost));

// create new fixed cost
// update fixed cost
// delete fixed cost

// create new income
// update income
// delete income

// create new budget
// update fixed budget
// delete fixed budget

// create investment
// update investment
// delete investment

// set annual goal
// update annual goal
// update monthly goal

// create new month
// get annual summary

// export data of user

// register
app.post('/rest/user', RequestWrapper.createRequestWrapper(CreateUserAction.createUser));
// login
// logout
// password reset
// delete user

// views
// app.get('/script/:subdirectory/:filename', downloadScript);
// app.get('/styles/:subdirectory/:filename', downloadStylesheet);
// app.get('/view/monthly/:year/:month', monthlyView);
// app.get('/', currentMonthlyView);


const port = process.env.PORT;
if (!port) {
    console.error('Missing environment variable: port!');
    process.exit();
}
app.listen(port, () => console.log(`Server running on port ${port}`));