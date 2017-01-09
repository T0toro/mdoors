'use strict';

/// <reference path="../../interfaces.d.ts" />

/**
 * Show button
 * @description simple show btn blank
 */

import * as React from 'react';

const ShowButton = (props: any) => {
    return (
        <a href={props.url}
          className='btn btn-primary'>
          <i className='fa fa-eye'></i>
        </a>
    );
};

export default ShowButton;
