'use strict';

/**
 * Ozp reducers
 * @description combine ozp reducers
 */

import { combineReducers } from 'redux';
import list from './list';

const ozpApp = combineReducers({
    list
});

export default ozpApp;