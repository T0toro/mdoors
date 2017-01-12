'use strict';

/**
 * OzpHeader
 * @description render ozp page header
 */

import * as React from 'react';
import { connect } from 'react-redux';

/**
 * Components
 */

import AddOzp from './AddOzp';
import AddShifts from './AddShift';

/**
 * Expos
 */

class OzpHeader extends React.Component<any, any> {
  render() {
    return (
        <header>
          <h2>Отчет о ЗП
            <button type='button' data-toggle='modal' data-target='#modalOzp' className='btn btn-primary pull-right'>Добавить</button>
            <button type='button' data-toggle='modal' data-target='#modalOzpShift' className='btn btn-primary pull-right' style={{ marginRight: '15px' }}>Аванс/Смены</button>
            <button className='btn btn-primary pull-right' style={{ marginRight: '15px' }}>Отправить отчет</button>
          </h2>
          <AddOzp />
          <AddShifts />
        </header>
    );
  }
};

export default connect(
  state => ({

  })
)(OzpHeader);
