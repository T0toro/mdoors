'use strict';

/// <reference path="../interfaces.d.ts" />

/**
 * Ozp List
 * @description component render ozp list
 */

/**
 * Vendor
 */

import * as React from 'react';
import { connect } from 'react-redux';

/**
 * Expo
 */

const OzpListItem = () => {
    return (
        <tr>
            <td></td>
        </tr>
    );
};


const OzpList = (props: any) => {
    console.info(props);
    return (
        <tbody>
            <OzpListItem />
        </tbody>
    );
};

export default connect(
    state => ({
        store: state
    })
)(OzpList);
