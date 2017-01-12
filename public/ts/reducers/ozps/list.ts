'use strict';

/**
 * Ozp reducer
 * @description contain ozp action handler
 */

import { FETCH_OZP } from '../../actions/ozp';

const initialState: {
    ozps: any[],
    ozpsShifts: any[],
    ozpsSumm: number
} = {
    ozps: [],
    ozpsShifts: [],
    ozpsSumm: 0
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_OZP:
        console.info(action.data);
            let ozpsSumm = 0;

            if (Array.isArray(action.data.ozps) && !!action.data.ozps.length) {
                action.data.ozps.forEach((ozp: any) => ozpsSumm += ozp.amount);
            }

            return {
                ...action.data,
                ozpsSumm: ozpsSumm
            };
        default:
            return state;
    }
};
