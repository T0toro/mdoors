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
  const user            = props.user,
        order           = props.item,
        limit           = 8,
        access          = props.access,
        selected        = props.pageSelected,
        controlButtons  = [<ShowButton key={props.index} url={`/dashboard/orders/show/${order._id}`} />],
        start           = selected === 0 ? 1 : selected * limit + 1;

  if (access === 'manager' || access === 'accountant') {
    controlButtons.push(<RemoveButton key={props.index} url={`/dashboard/orders/destroy/${order._id}`} />);
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
      <td className='table-controls'>{controlButtons}</td>
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