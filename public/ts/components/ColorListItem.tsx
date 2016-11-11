'use strict';

import * as React from 'react';
import { Component } from 'react';

interface MyProps {
    name: string
}

interface MyState {}

class ColorListItem extends React.Component<MyProps, MyState> {
    render() {
        return (
            <option value={this.props.name}>{this.props.name}</option>
        );
    }
}

export default ColorListItem;
