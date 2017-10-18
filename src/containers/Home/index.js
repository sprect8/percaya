import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'

/* component styles */
import { styles } from './styles.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        <RaisedButton label="Yes" />
        <RaisedButton label="No" />
      </div>
    );
  }
}
