import "core-js/stable";
import "regenerator-runtime/runtime";

require("dotenv").config();
console.log(process.env.API_KEY);

import * as model from "./model.js";
