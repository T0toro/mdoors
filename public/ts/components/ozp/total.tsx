'use strict';

/// <reference path="../../interfaces.d.ts" />


/**
 * Ozp Total
 * @description отображает итоговую сумму на основе кол-во смен и аванса
 */

/**
 * Vendor
 */
import * as React from 'react';

/**
 * Expo
 */

class OzpTotal extends React.Component<OzpTotalProps, OzpTotalState> {
  render() {
    return (
      <table className='table table-bordered'>
        <tbody>
          <tr>
            <td>Итого:</td>
            <td>р.</td>
          </tr>
          <tr>
            <td>Аванс:</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Кол-во смен:</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default OzpTotal;