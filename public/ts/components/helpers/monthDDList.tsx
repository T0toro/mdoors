/**
 * Month List
 * @description render simple dropDown list contains month
 */

/**
 * Vendor
 */

import * as React from 'react';

/**
 * Expo
 */

const MonthList = () => {
  return (
    <div className='form-group'>
      <label htmlFor='odds-month'>Месяц:</label>
      <select name='month' id='odds-month' className='form-control'>
        <option value='1'>Январь</option>
        <option value='2'>Февраль</option>
        <option value='3'>Март</option>
        <option value='4'>Апрель</option>
        <option value='5'>Май</option>
        <option value='6'>Июнь</option>
        <option value='7'>Июль</option>
        <option value='8'>Август</option>
        <option value='9'>Сентябрь</option>
        <option value='10'>Октябрь</option>
        <option value='11'>Ноябрь</option>
        <option value='12'>Декабрь</option>
      </select>
    </div>
  );
};

export default MonthList;
