import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer,
         AppBar,
         Divider }            from 'material-ui';

import Paper                  from 'material-ui/Paper';
import FontIcon               from 'material-ui/FontIcon';
import Menu                   from 'material-ui/Menu';
import MenuItem               from 'material-ui/MenuItem';

        

/* component styles */
import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators   from 'core/actions/actions-ui';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
  }

  closeNav=() => {
    this.props.actions.ui.closeNav();
  }

  render() {
    return (
      <div className={styles} >
        <Drawer
          docked={false}
          open={this.props.ui.leftNavOpen}
          onRequestChange={this.closeNav}>
          <AppBar title="Navigate" />
          <Divider />
          <Paper>
            <Menu>
              <MenuItem primaryText="CV Details"/>
              <MenuItem primaryText="Register CV"/>
              <Divider />
              <MenuItem primaryText="Company Details"/>
              <MenuItem primaryText="Register Company"/>
              <Divider />
              <MenuItem primaryText="Education Institute"/>
              <MenuItem primaryText="Register Institute"/>              
            </Menu>
          </Paper>
        </Drawer>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui   : bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavBar);