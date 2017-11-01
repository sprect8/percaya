import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import injectTapEventPlugin       from 'react-tap-event-plugin';
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
    console.log(web3Provider.sendAsync);
    actions.provider.specifyProvider(web3Provider);
    initContract(currentProvider);
  }

  initContract(currentProvider) {
    d3.json('/contracts/JobCVOracle.json', (data) => {
      
      var oracle = TruffleContract(data);
      // actions.provider.specifyOracle(oracle)
      oracle.setProvider(currentProvider);
      web3Provider.eth.getAccounts().then(console.log);
      console.log(oracle, this.props, "Dafaqul");

      // deploy 
      oracle.deployed().then(function(instance) {
        console.log("Executed");
        actions.provider.specifyOracle(instance);
        
      });
    });

  }

  checkCVExists() {
    //     0x03c79237c246fAdf9730D3C526F03C0AdFa6Bd80
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
              </div>
            </div>
            <LeftNavBar />
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(App);