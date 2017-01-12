'use strict';

/**
 * OzpHeader
 * @description render ozp page header
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { post } from 'jquery';

/**
 * Components
 */

import AddOzp from './AddOzp';
import AddShifts from './AddShift';

/**
 * Expos
 */

class OzpHeader extends React.Component<any, any> {
  csrf: any;

  constructor() {
    super();
  }

  sendReport() {
    post('/dashboard/ozp/sendOrder', {
      data: this.props.ozps
    }).done((data) => {
      console.info('test', data);
    });
  }

  render() {
    return (
      <header>
        <h2>Отчет о ЗП
          <button type='button' data-toggle='modal' data-target='#modalOzp' className='btn btn-primary pull-right'>Добавить</button>
          <button type='button' data-toggle='modal' data-target='#modalOzpShift' className='btn btn-primary pull-right' style={{ marginRight: '15px' }}>Аванс/Смены</button>
          <button className='btn btn-primary pull-right' style={{ marginRight: '15px' }} onClick={this.sendReport.bind(this)}>Отправить отчет</button>
        </h2>
        <AddOzp />
        <AddShifts />
      </header>
    );
  }
};

export default connect(
  state => ({
    ozps: state.list
  })
)(OzpHeader);
