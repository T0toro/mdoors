import '../interfaces.d.ts';

/**
 * Ozp List
 * @description component render ozp list
 */

/**
 * Vendor
 */

import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

/**
 * Expo
 */

const OzpListItem = (props: any) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{moment(props.date).locale('ru').format('L')}</td>
      <td>{props.amount}</td>
      <td>{props.payment}</td>
      <td>{props.address}</td>
      <td className='table-controls no-print'>
        <a href={`/dashboard/ozp/edit/${props._id}`} className='btn btn-primary'>
          <i className='fa fa-pencil'></i>
        </a>
      </td>
    </tr>
  );
};

const OzpList = (props: any) => {
  return (
    <tbody>
      {props.items.ozps.map((item: any, index: number) => {
        return <OzpListItem key={index} index={index} {...item} />;
      })}
    </tbody>
  );
};

export default OzpList;
