/**
 * OzpHeader
 * @description render ozp page header
 */

import { post } from 'jquery';
import * as React from 'react';
import { connect } from 'react-redux';

/**
 * Components
 */

import AddOzp from './AddOzp';
import AddShift from './AddShift';

/**
 * Expos
 */

class OzpHeader extends React.Component<any, any> {
  public csrf: any;

  constructor() {
    super();
  }

  public sendReport() {
    post('/dashboard/ozp/sendOrder', {
      data: this.props.ozps,
    });
  }

  public render() {
    return (
      <header>
        <h2>Отчет о ЗП
          <button
            type='button'
            data-toggle='modal'
            data-target='#modalOzp'
            className='btn btn-primary pull-right'>Добавить</button>
          <button
            type='button'
            data-toggle='modal'
            data-target='#modalOzpShift'
            className='btn btn-primary pull-right'
            style={{ marginRight: '15px' }}>Аванс/Смены</button>
          <button
            className='btn btn-primary pull-right'
            style={{ marginRight: '15px' }}
            onClick={this.sendReport.bind(this)}>Отправить отчет</button>
        </h2>
        <AddOzp />
        <AddShift />
      </header>
    );
  }
}

export default connect(
  state => ({
    ozps: state.list,
  }),
)(OzpHeader);
