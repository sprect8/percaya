/**
 * AppBar
 */

import React                   from 'react';
import { AppBar as MuiAppBar } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
/* component styles */
import { styles } from './styles.scss';
import { Button } from '../Button'
export default function AppBar(props) {
  return (
    <div className={styles}>
      <MuiAppBar {...props} className="app-bar" title="JCV - My Jobcoin CV">
      </MuiAppBar>
    </div>
  );
}