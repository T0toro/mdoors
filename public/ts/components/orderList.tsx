'use strict';

/// <reference path="../interfaces.d.ts" />


/**
 * OrderList
 * @description render order index page
 */

import * as React from 'react';
import * as moment from 'moment';

const OrderListItem = (props: any) => {
  const user     = props.user,
        order    = props.item,
        limit    = 8,
        selected = props.pageSelected,
        start    = selected === 0 ? 1 : selected * limit + 1;

  return (
    <tr>
      <td>{start + props.index}</td>
      <td>{moment(order.createdAt).locale('ru').format('L')}</td>
      <td>{order.departament}</td>
      <td>{user}</td>
      <td>{order.product}</td>
      <td>{order.address.slice(0, 20)}...</td>
      <td>{order.telephone.slice(0, 15)}...</td>
      <td className='table-controls'>
        <a href={`/dashboard/orders/show/${props.id}`}
          className='btn btn-primary'>
          <i className='fa fa-eye'></i>
        </a>
        <a href={`/dashboard/orders/destroy/${props.id}`}
           className='btn btn-danger'>
          <i className='fa fa-trash'></i>
        </a>
      </td>
    </tr>
  );
};

const OrderList = (props: any) => {
  console.info(props);
  return (
    <tbody>
      {props.items.map((item: any, index: number) => {
        return <OrderListItem key={index} index={index} item={item} user={props.users[item.user]} pageSelected={ props.pageSelected }/>;
      })}
    </tbody>
  );
};

export default OrderList;