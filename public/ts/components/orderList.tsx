import '../interfaces.d.ts';

/**
 * OrderList
 * @description render order index page
 */

import * as moment from 'moment';
import * as React from 'react';

/**
 * Components
 */

import RemoveButton from './buttons/remove';
import ShowButton from './buttons/show';

/**
 * Expos
 */

const OrderListItem = (props: any) => {
  const user: any = props.user;
  const order: any = props.item;
  const limit: number = 8;
  const access: string = props.access;
  const selected: number = props.pageSelected;
  const start: number = selected === 0 ? 1 : selected * limit + 1;

  let removeButton: any = null;
  let orderStatus;

  switch (order.status) {
    case 0:
      orderStatus = <span style={{ color: '#089de3' }}>ожидает отправки</span>;
      break;

    case 1:
      orderStatus = <span style={{ color: '#92CD00' }}>доставлено</span>;
      break;

    case 2:
      orderStatus = <span style={{ color: '#CC0000' }}>ошибка доставки</span>;
      break;

    default:
      break;
  }

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
      <td style={{ textAlign: 'center' }}>{orderStatus}</td>
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
        return <OrderListItem
                  key={index}
                  index={index}
                  item={item}
                  access={props.access}
                  user={props.users[item.user]}
                  pageSelected={ props.pageSelected }
               />;
      })}
    </tbody>
  );
};

export default OrderList;
