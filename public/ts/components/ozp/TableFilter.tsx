'use strict';

/// <reference path="../../interfaces.d.ts" />


/**
 * TableFilter
 * @description TableFilter representation
 */

import * as React from 'react';

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

  constructor() {
    super();
  }

  componentDidMount() {
    this.csrf.value = $('meta[name="_csrf"]').attr('content');
  }

  render() {
    return (
      <form action="/dashboard/ozp/filter" name='odds' id='form-odds-filter' method='POST' className='form-inline form-clear'>
        <input type="hidden" name="_csrf" ref={(input) => { this.csrf = input; }} />
        <fieldset>
          <YearDDList />
          <MonthDDList />
          <div className='form-group pull-right'>
            <input type='submit' name='submit' value='Показать' className='btn btn-primary btn-odds-filter' />
          </div>
        </fieldset>
      </form>
    );
  }
}

export default TableFilter;
