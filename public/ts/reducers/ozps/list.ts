'use strict';

/**
 * Ozp reducer
 * @description contain ozp action handler
 */

import { FETCH_OZP } from '../../actions/ozp';

const nameInitialState: {
    ozps: any[],
    ozpsShifts: any[]
} = {
    ozps: [],
    ozpsShifts: []
};

export default (state = nameInitialState, action: any) => {
    switch (action.type) {
        case FETCH_OZP:
            return {
                ...action
            };
        default:
            return state;
    }
};