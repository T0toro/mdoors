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
import { connect } from 'react-redux';


/**
 * Expo
 */

class OzpTotal extends React.Component<any, OzpTotalState> {
  constructor() {
    super();
  }

  // TODO: Refactor
  render() {
    let shiftsCount  = 0,
        shiftsAmount = 0,
        shifts    = this.props.shifts;

    if (shifts && !!shifts.length) {
      shiftsCount = shifts[shifts.length - 1].count,
      shiftsAmount = shifts[shifts.length - 1].amount;
    }

    return (
      <table className='table table-bordered'>
        <tbody>
          <tr>
            <td>Итого:</td>
            <td>{this.props.ozpsSumm}р.</td>
          </tr>
          <tr>
            <td>Аванс:</td>
            <td>{shiftsAmount}</td>
          </tr>
          <tr>
            <td>Кол-во смен:</td>
            <td>{shiftsCount}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default connect(
  state => ({
    ozpsSumm: state.list.ozpsSumm,
    shifts: state.list.ozpShifts
  })
)(OzpTotal);
