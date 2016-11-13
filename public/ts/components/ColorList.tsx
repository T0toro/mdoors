'use strict';

import * as React from "react";
import { Component } from "react";

import ColorListItem from './ColorListItem';

interface MyProps {}
interface MyState {}

class ColorList extends React.Component<MyProps, MyState> {
  state: {
    items: any[]
  } = {
    items: []
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <select name="doorColor" placeholder="Зеленый" id="door-colors" className="form-control">
        <option value="нет">нет</option>
        {this.state.items.map(function(item) {
          return (
            <ColorListItem name={ item.name } />
          );
        })}
      </select>
    );
  }
}

export default ColorList;
