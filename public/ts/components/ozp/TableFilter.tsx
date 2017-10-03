'use strict';

import '../../interfaces.d.ts';

/**
 * TableFilter
 * @description TableFilter representation
 */

import { ajax as request } from 'jquery';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

/**
 * Actions
 */

import { FETCH_OZP } from '../../actions/ozp';

/**
 * Components
 */

import MonthDDList from '../helpers/MonthDDList';
import YearDDList from '../helpers/YearDDList';

/**
 * Expos
 */

class TableFilter extends React.Component<any, any> {
  public csrf: any;
  public month: number;
  public year: number;

  constructor() {
    super();
  }

  public componentDidMount() {
    this.csrf.value = $('meta[name="_csrf"]').attr('content');
  }

  public ozpFilter(e: any) {
    e.preventDefault();

    const data = $('#form-odds-filter').serialize();

    request({
      data,
      method: 'POST',
      url: '/dashboard/ozp/filter',
    }).done((res: any) => {
      if (res.code !== 200) { return false; }

      this.props.ozpStoreUpdate(res);
    });
  }

  public render() {
    return (
      <form
        action='/dashboard/ozp/filter'
        method='POST'
        name='odds'
        id='form-odds-filter'
        className='form-inline form-clear'>
        <input type='hidden' name='_csrf' ref={(input) => { this.csrf = input; }} />
        <fieldset>
          <YearDDList />
          <MonthDDList />
          <div className='form-group pull-right'>
            <input
              type='submit'
              name='submit'
              value='Показать'
              className='btn btn-primary btn-odds-filter' onClick={ this.ozpFilter.bind(this) } />
          </div>
        </fieldset>
      </form>
    );
  }
}

export default connect(
  state => ({
    items: state.list,
  }),
  dispatch => ({
    ozpStoreUpdate: (data: any) => {
      dispatch({
        type: FETCH_OZP,
        data: {
          ozps: data.ozps,
          ozpShifts: data.ozpShifts,
        },
      });
    },
  }),
)(TableFilter);
