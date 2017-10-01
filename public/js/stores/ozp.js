'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ozp store
 * @description contain ozp and ozpShifts
 */
var redux_1 = require("redux");
var index_1 = require("../reducers/ozps/index");
var store = redux_1.createStore(index_1.default);
exports.default = store;
