import '../interfaces.d.ts';

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

import OzpHeader from '../components/ozp/OzpHeader';
import OzpTable from '../components/ozp/OzpTable';

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
};

export default OzpListContainer;
