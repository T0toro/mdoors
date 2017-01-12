'use strict';

/**
 * Year List
 * @description draw simple select list contains year from 2016 to currentYear
 */

import * as React from 'react';

/**
 * Expo
 */

const currentYear: number = new Date().getFullYear();

let options: any = [];

for (let i = 2016; i <= currentYear; i++) {
  options.push(<option key={i}>{i}</option>);
}

const YearDDList = () => {
  return (
    <div className='form-group'>
      <label htmlFor='odds-year'>Год:</label>
      <select name='year' className='form-control'>{options}</select>
    </div>
  );
};

export default YearDDList;