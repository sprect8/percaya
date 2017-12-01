/**
 * CV Viewer
 * Load / Edit / Create New CV depending on system state
 * CV is managed by the Smart Contracts and accessible by
 * the application
 */

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';

/* actions */
import * as contractUIActionCreators from 'core/actions/actions-contract-ui-state';
import * as providerActionCreators from 'core/actions/actions-provider';

/* component styles */
import { styles } from './styles.scss';
import { Button } from 'components/Button';
import CVViewer   from 'components/CVViewer';

export class CVContainer extends Component {
  constructor(props) {
    super(props);    
  }

  componentWillReceiveProps(nextProps) {    
    /*console.log("Loading props", nextProps);
    if (nextProps.oracle) {      
      nextProps.actions.contractState.contractLoading();
      nextProps.oracle.getJCV.call().then((address)=>{
        if(address == "0x0000000000000000000000000000000000000000") {
          console.log("This is a new state");
          nextProps.actions.contractState.setContractNewState();
        }
        else {
          // how do i load this?
          console.log("Load it ", address);
          nextProps.actions.contractState.contractLoaded(address);
        }
      })
    }  */
  }

  render() {
    console.log(this.props, "Runner");
    return (
      <div className={styles}>
        <CVViewer/>
      </div>
    );
  }
}

function mapStateToPropsCV(state) {  
  return {
    oracle        : state.provider.oracle,
    web3          : state.provider.provider,
    contractState : state.currentState
  };
}

function mapDispatchToPropsCV(dispatch) {  
  return {
    actions: {
      provider      : bindActionCreators(providerActionCreators, dispatch),
      contractState : bindActionCreators(contractUIActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToPropsCV, mapDispatchToPropsCV)(CVContainer);