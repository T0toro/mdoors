/**
 * OzpTable
 * @description representation table in ozp page
 */

import { ajax as request } from 'jquery';
import * as React from 'react';
import { connect } from 'react-redux';

/**
 * MainComponents
 */

import TableFilter from '../ozp/TableFilter';
import TableList from '../ozp/TableList';
import TableTotal from '../ozp/TableTotal';

/**
 * Actions
 */

import { FETCH_OZP } from '../../actions/ozp';

/**
 * Expos
 */

class OzpTable extends React.Component<any, any> {
  public componentDidMount() {
    request({
      url: '/dashboard/uozp.json',
    }).done((data) => {
      if (data.code !== 200) { return false; }

      this.props.ozpFetch(data);
    });
  }

  public render() {
    return (
      <table className='table table-bordered'>
        <thead>
          <tr className='no-print'>
            <th colSpan={7}>
              <TableFilter />
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Сумма (р.)</th>
            <th>Предоплата (р.)</th>
            <th>Адрес доставки или номер и дата заказа на самовывоз</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <TableList items={this.props.items} />
        <tfoot>
          <tr>
            <td colSpan={5}></td>
            <td colSpan={3}>
              <TableTotal />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default connect(
  state => ({
    items: state.list,
  }),
  dispatch => ({
    ozpFetch: (data: any) => {
      dispatch({
        type: FETCH_OZP,
        data: {
          ozps: data.ozps,
          ozpShifts: data.ozpShifts,
        },
      });
    },
  }),
)(OzpTable);
