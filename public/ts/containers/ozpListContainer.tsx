'use strict';

/// <reference path='../interfaces.d.ts' />


/**
 * Ozp List
 * @description :: render ozp list
 */

/**
 * Vendor
 */

import * as React from 'react';

/**
 * My Components
 */

import OzpHeader from '../components/ozp/Header';
import OzpTable from '../components/ozp/Table';

/**
 * Expo
 */

const OzpListContainer = () => {
    return (
      <article>
        <OzpHeader />
        <OzpTable />
      </article>
    );
}

export default OzpListContainer;
