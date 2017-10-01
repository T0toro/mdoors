'use strict';

/**
 * Ozp store
 * @description contain ozp and ozpShifts
 */

import { createStore } from 'redux';
import app from '../reducers/ozps/app';

const store = createStore(app);

export default store;
