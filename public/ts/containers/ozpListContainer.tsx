'use strict';

/// <reference path='../interfaces.d.ts' />


/**
 * Ozp List
 * @description :: render ozp list
 */

/**
 * Vendor
 */

import * as React from 'react';
import { ajax as request } from 'jquery';

/**
 * My code
 */

import YearDDList from '../components/yearDDList';
import MonthDDList from '../components/monthDDList';
import OzpTotal from '../components/ozp/total';

/**
 * Expo
 */

class OzpListContainer extends React.Component<OzpListContainerProps, OzpListContainerState> {
  state: OzpListContainerState;
  filterHandle: any;

  constructor() {
    super();

    this.state = {
      ozps: [],
      ozpsShifts: []
    };

    // Method Binding
    this.filterHandle = this._filterHandle.bind(this);
  }

  _filterHandle() {
    request({
      url: '/dashboard/ozp/filter'
    }).done((data) => {
      console.info(data);
    });
  }

  componentDidMount() {
    request({
      url: '/dashboard/uozp.json'
    }).done((data) => {
      if (data.code !== 200) return false;

      this.setState({
        ozps: data.ozps,
        ozpsShifts: data.ozpsShifts
      });
    });
  }

  render() {
    const ozps: any[] = this.state.ozps;

    return (
      <article>
        <header>
          <h2>Отчет о ЗП
            <button type='button' data-toggle='modal' data-target='#modalOzp' className='btn btn-primary pull-right'>Добавить</button>
            <button type='button' data-toggle='modal' data-target='#modalOzpShift' className='btn btn-primary pull-right'>Аванс/Смены</button>
          </h2>
        </header>
        <table className='table table-bordered'>
          <thead>
            <tr className='no-print'>
              <th colSpan={7}>
                <form name='odds' id='form-odds-filter' method='POST' className='form-inline form-clear'>
                  <fieldset>
                    <YearDDList />
                    <MonthDDList />
                    <div className='form-group pull-right'>
                      <input type='submit' name='submit' value='Показать' className='btn btn-primary btn-odds-filter' onClick={this.filterHandle} />
                    </div>
                  </fieldset>
                </form>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Дата</th>
              <th>Сумма (р.)</th>
              <th>Предоплата (р.)</th>
              <th>Адрес доставки или номер и дата заказа на самовывоз</th>
              <th colSpan={2} width='230'></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} className='text-center'><i className='fa fa-cart'></i>На данный момент отчетов нет</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}></td>
              <td colSpan={3}>
                <OzpTotal items={ozps} />
              </td>
            </tr>
          </tfoot>
        </table>
      </article>
    );
  }
}

export default OzpListContainer;