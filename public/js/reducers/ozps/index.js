'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ozp reducers
 * @description combine ozp reducers
 */
var redux_1 = require("redux");
var list_1 = require("./list");
var ozpApp = redux_1.combineReducers({
    list: list_1.default
});
exports.default = ozpApp;
