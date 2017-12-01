import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import injectTapEventPlugin       from 'react-tap-event-plugin';
import darkBaseTheme              from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme                from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider           from 'material-ui/styles/MuiThemeProvider';
import { HashRouter, Route }      from 'react-router-dom'
import * as OfflinePluginRuntime  from 'offline-plugin/runtime';
import Web3                       from 'web3';
import TruffleContract            from 'truffle-contract';
import * as d3                    from 'd3';
//import $                          from 'jquery';
// global styles for entire app
import './styles/app.scss';

/* application containers */
import Header     from 'containers/Header';
import LeftNavBar from 'containers/LeftNavBar';
import Home       from 'containers/Home';

/* actions */
import * as providerActionCreators from 'core/actions/actions-provider';

injectTapEventPlugin();

OfflinePluginRuntime.install();

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;
    const currentProvider = window.web3.currentProvider;
    var web3Provider;

    if (typeof window.web3 !== 'undefined') {
      web3Provider = new Web3(currentProvider);
      console.log("Loading from meta mask");
    } else {
      // alert('You must install MetaMask!')
      console.log("Loading from localhost");
      web3Provider = new Web3(new web3Provider.providers.HttpProvider("http://localhost:8545"));
    }
    actions.provider.specifyProvider(web3Provider);
    this.initContract(currentProvider);
  }

  initContract=(currentProvider)=>{
    d3.json('/contracts/JobCVOracle.json', (data) => {
     
      d3.json('/contracts/JobCV.json', (jcvdata) => {
        console.log(this.props, this.state);
        var oracle = TruffleContract(data);
        // actions.provider.specifyOracle(oracle)
        oracle.setProvider(currentProvider);
        console.log(this.props.web3);
        this.props.web3.eth.getAccounts().then(console.log);
        console.log(oracle, this.props, "Dafaqul");
  
        // deploy 
        oracle.deployed().then((instance) => {                  
          this.props.actions.provider.specifyCVNBI(jcvdata);
          this.props.actions.provider.specifyOracle(instance);                          
        });
        
      });
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <HashRouter>
          <div>
            <Header />
            <div className="container">
              <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/CreateContract" component={Home}/>
              </div>
            </div>
            <LeftNavBar />
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {  
  return {
    oracle: state.provider.oracle,
    web3: state.provider.provider
  };
}

function mapDispatchToProps(dispatch) {
  
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);