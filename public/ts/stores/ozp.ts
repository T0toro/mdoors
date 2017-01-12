'use strict';

/**
 * Ozp store
 * @description contain ozp and ozpShifts
 */

import { createStore } from 'redux';
import ozpApp from '../reducers/ozps/index';

let store = createStore(ozpApp);

export default store;