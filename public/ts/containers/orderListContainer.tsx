'use strict';

/// <reference path="../interfaces.d.ts" />


/**
 * OrderListContainer
 * @description fetch data for OrderList and render
 */

/**
 * Vendor
 */

import { get } from 'jquery';
import * as React from 'react';
import * as ReactPaginate from 'react-paginate';

/**
 * My code
 */

import OrderList from '../components/orderList';

/**
 * Expos
 */

class OrderListContainer extends React.Component<OrderListContainerProps, OrderListContainerState> {
  state: OrderListContainerState;
  handlePageClick: any;

  constructor() {
    super();

    this.state = {
      orders: [],
      pages: 1,
      users: {},
      access: 'seller',
      pageSelected: 0
    };

    // Method binding
    this.handlePageClick = this._handlePageClick.bind(this);
  }

  componentDidMount () {
    get('/dashboard/orders.json')
      .done((data) => {
        this.setState({
          orders: data.orders,
          users: data.users,
          pages: Math.ceil(data.records / 10),
          access: data.access
        });
      });

  }

  _handlePageClick(page: any) {
    get('/dashboard/orders.json', {
      page: page.selected
    }).done((data) => {
      this.setState({
        orders: data.orders,
        pageSelected: page.selected
      });
    });
  }

  render() {
    const orders: any = this.state.orders,
          users:  any = this.state.users;

    return (
      <article>
        <header>
          <h1>Заказы
            <a href='/dashboard/orders/create' className='btn btn-primary pull-right'>
              <i className='fa fa-plus'></i>
              Создать заказ
            </a>
          </h1>
        </header>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Создан</th>
              <th>Отдел</th>
              <th>Продавец</th>
              <th>Продукт</th>
              <th>Адрес доставки</th>
              <th>Телефон</th>
              <th colSpan={2} width='230'></th>
            </tr>
          </thead>
          <OrderList items={orders} users={users} pageSelected={ this.state.pageSelected } access={ this.state.access } />
        </table>
        <div className='pagination-wrap'>
          <ReactPaginate previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={<a href=''>...</a>}
                        breakClassName={'break-me'}
                        pageCount={this.state.pages}
                        onPageChange={this.handlePageClick}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'} />
        </div>
      </article>
    );
  }
}

export default OrderListContainer;
