'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ozp reducer
 * @description contain ozp action handler
 */
var ozp_1 = require("../../actions/ozp");
var initialState = {
    ozps: [],
    ozpsShifts: [],
    ozpsSumm: 0
};
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ozp_1.FETCH_OZP:
            var ozpsSumm_1 = 0;
            if (Array.isArray(action.data.ozps) && !!action.data.ozps.length) {
                action.data.ozps.forEach(function (ozp) { return ozpsSumm_1 += ozp.amount; });
            }
            return __assign({}, action.data, { ozpsSumm: ozpsSumm_1 });
        default:
            return state;
    }
};
