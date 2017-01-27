'use strict';

/// <reference path="../../interfaces.d.ts" />


/**
 * TableFilter
 * @description TableFilter representation
 */

import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { ajax as request } from 'jquery';

/**
 * Actions
 */

import { FETCH_OZP } from '../../actions/ozp';

/**
 * Components
 */

import YearDDList from '../helpers/yearDDList';
import MonthDDList from '../helpers/monthDDList';

/**
 * Expos
 */

class TableFilter extends React.Component<any, any> {
    csrf: any;
    month: number;
    year: number;

  constructor() {
    super();
  }

  componentDidMount() {
    this.csrf.value = $('meta[name="_csrf"]').attr('content');
  }

  _ozpFilter(e: any) {
    e.preventDefault();

    let data = $('#form-odds-filter').serialize();

    request({
      method: 'POST',
      url: '/dashboard/ozp/filter',
      data: data
    }).done((data: any) => {
      if (data.code !== 200) return false;

      this.props.ozpStoreUpdate(data);
    });
  }

  render() {
    return (
      <form action="/dashboard/ozp/filter" name='odds' id='form-odds-filter' method='POST' className='form-inline form-clear'>
        <input type="hidden" name="_csrf" ref={(input) => { this.csrf = input; }} />
        <fieldset>
          <YearDDList />
          <MonthDDList />
          <div className='form-group pull-right'>
            <input type='submit' name='submit' value='Показать' className='btn btn-primary btn-odds-filter' onClick={ this._ozpFilter.bind(this) } />
          </div>
        </fieldset>
      </form>
    );
  }
}

export default connect(
  state => ({
    items: state.list
  }),
  dispatch => ({
    ozpStoreUpdate: (data: any) => {
      dispatch({
        type: FETCH_OZP,
        data: {
          ozps: data.ozps,
          ozpShifts: data.ozpShifts
        }
      });
    }
  })
)(TableFilter);
