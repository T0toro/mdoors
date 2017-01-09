'use strict';

/// <reference path="../../interfaces.d.ts" />

/**
 * Remove button
 * @description simple remove btn blank
 */

import * as React from 'react';

const RemoveButton = (props: IRemoveButtonProps) => {
    return (
        <a href={props.url}
           className='btn btn-danger'>
          <i className='fa fa-trash'></i>
        </a>
    )
}

export default RemoveButton;