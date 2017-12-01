import React, { Component }         from 'react';
import RaisedButton                 from 'material-ui/RaisedButton'
import { connect }                  from 'react-redux';
import CVView                       from 'containers/CVContainer';
import { bindActionCreators }       from 'redux';
/* component styles */
import { styles }                   from './styles.scss';
/* actions */
import * as providerActionCreators  from 'core/actions/actions-provider';
// home will check if the person has a CV already loaded (active account)
// if no CV, then they can create their own

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentCV: null
    };
  }

  render() {
    return (
      <div className={styles}>        
        <CVView/>
      </div>
    );
  }
}

function mapStateToPropsHome(state) {  
  return {
    oracle: state.provider.oracle,
    web3: state.provider.provider
  };
}

function mapDispatchToPropsHome(dispatch) {  
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToPropsHome, mapDispatchToPropsHome)(Home);