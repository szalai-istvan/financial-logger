import express from "express";
import dotenv from "dotenv";
import path from "path";

import { getMonthlyData } from "./rest/monthlyRest.js";
import { currentMonthlyView, monthlyView } from "./view/monthlyView.js";
import { downloadScript } from "./view/downloadScript.js";

const envFile = '.env.dev';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app = express();
app.use(express.json());

app.get('/scripts/:subdirectory/:filename', downloadScript);
app.get('/monthly/view/:year/:month', monthlyView);
app.get('/monthly/:year/:month', getMonthlyData);
app.get('/', currentMonthlyView);

const port = process.env.PORT;
if (!port) {
    console.error('Missing environment variable: port!');
    process.exit();
}
app.listen(port, () => console.log(`Server running on port ${port}`));