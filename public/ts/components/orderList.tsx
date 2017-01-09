'use strict';

/// <reference path="../interfaces.d.ts" />


/**
 * OrderList
 * @description render order index page
 */

import * as React from 'react';
import * as moment from 'moment';

/**
 * Components
 */

import RemoveButton from './buttons/remove';
import ShowButton from './buttons/show';

/**
 * Expos
 */

const OrderListItem = (props: any) => {
  const user: any         = props.user,
        order: any        = props.item,
        limit: number     = 8,
        access: string    = props.access,
        selected: number  = props.pageSelected,
        start: number     = selected === 0 ? 1 : selected * limit + 1;

  let   removeButton: any = null;

  if (access === 'accountant') {
    removeButton = <RemoveButton url={`/dashboard/orders/destroy/${order._id}`} />;
  }

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
        <ShowButton url={`/dashboard/orders/show/${order._id}`} />
        {removeButton}
      </td>
    </tr>
  );
};

const OrderList = (props: any) => {
  return (
    <tbody>
      {props.items.map((item: any, index: number) => {
        return <OrderListItem key={index} index={index} item={item} access={props.access} user={props.users[item.user]} pageSelected={ props.pageSelected }/>;
      })}
    </tbody>
  );
};

export default OrderList;