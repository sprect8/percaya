/**
 * CV Viewer
 * Load / Edit / Create New CV depending on system state
 * CV is managed by the Smart Contracts and accessible by
 * the application
 */

import React, { Component }           from 'react';
import RaisedButton                   from 'material-ui/RaisedButton'
import { connect }                    from 'react-redux';
import { bindActionCreators }         from 'redux';

/* actions */
import * as contractUIActionCreators  from 'core/actions/actions-contract-ui-state';
import * as providerActionCreators    from 'core/actions/actions-provider';

/* component styles */
import { styles }                     from './styles.scss';

import Text                           from 'material-ui/TextField';
import Button                         from 'material-ui/RaisedButton';

import Const                          from 'core/const';
import { activeFields }               from 'core/fields';
import { Drawer,
  AppBar,
  Divider }                           from 'material-ui';

import { ValidatorForm }              from 'react-form-validator-core';
import { TextValidator }              from 'react-material-ui-form-validator';
import TruffleContract                from 'truffle-contract';
import * as d3                        from 'd3';

import ChipInput                      from 'material-ui-chip-input';
import LinearProgress                 from 'material-ui/LinearProgress';

import axios                          from 'axios';
import Snackbar                       from 'material-ui/Snackbar';


console.log (Const, activeFields, "BOBOBOBO");
export class CVViewer extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      details: {},
      snackShowing: false
    }
    this.textChanged = this.textChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createField(item, props) {
    let value = "";    
    if (this.state.details[item.field])
      value = this.state.details[item.field];
    if (item.type) {
      switch(item.type) {
        case "List":
        case "Check":
        case "Radio":
        case "Toggle":  
        case "Tag":
        return <ChipInput floatingLabelText={item.tag}/>      
      }
    }
    return <div>
      <TextValidator
            floatingLabelText={item.tag} 
            onChange={this.textChanged.bind(this, item.field)}
            name = {item.field}
            value = {value}
            validators={['required']}
            errorMessages={["This field is required"]}
            disabled={!(this.props.creating || this.props.editing)}
            />
    </div>    
  }

  textChanged(field, obj, newVal) {    
    let details = this.state.details;
    details[field] = newVal;
    //this.currState.details = details;
    this.setState({details:details});
  }

  loadFromAddress(address, nextProps) {

    // how do i load this?  
    console.log("Contract is loaded", address);
    this.loadJCV(address).then((r)=>{
      r.address = address;
      
      r.getResumeDetails.call({from:nextProps.coinbase}).then((results)=> {
        var details = {};
        // [publicData, sensitiveData, jobHistoryRef, educationRef, referencesRef]
        console.log(JSON.stringify(results));
        results = results.map((r) => {return r.trim()});
        axios.get("/loadFromIPFS?items="+JSON.stringify(results))
        .then((response)=>{
          console.log("Created", response);
          // merge
          d3.keys(response.data).forEach((k)=>{
            var json = JSON.parse(response.data[k]);
            d3.keys(json).forEach((kk)=>{
              details[kk] = json[kk];
            });
          })

          console.log("Details is ", details);
          this.setState({"details":details});
        })
        .catch((error)=>{
          this.setState({
            snackShowing: true,
            message: "Failed to Save with error " + error
          })
        })
      });
    });
  }

  componentWillReceiveProps(nextProps) {    
    console.log(nextProps.editing, nextProps.creating);
    if (nextProps.oracle && !nextProps.editing && !nextProps.creating) {      
      nextProps.actions.contractState.contractLoading();
      nextProps.oracle.getJCV.call({from:nextProps.coinbase}).then((address)=>{
        if(address == "0x0000000000000000000000000000000000000000") {          
          nextProps.actions.contractState.setContractNewState();
        }
        else {
          nextProps.actions.contractState.setContractEditState();          
          this.loadFromAddress(address, nextProps);          
          //nextProps.actions.contractState.contractLoaded(address, null);
        }
      })
    }
    
    if (nextProps.web3 && !this.props.coinbase) {      
      nextProps.web3.eth.getCoinbase((e, addr) => {                
        nextProps.web3.eth.getBalance(addr, (error, balance) => {
          console.log("My Balance is currently ");
          nextProps.actions.contractState.setCurrentCoinBase(addr, web3.fromWei(balance, 'ether'));
        })
      })      
    }
  }

  loadJCV=(address)=>{
    // load details of resume
    console.log(this.props, "Properties");
    let dataObj = JSON.parse(JSON.stringify(this.props.cvnbi));
    console.log(dataObj);
    // dataObj.address = address;
    var oracle = TruffleContract(dataObj);
    console.log(oracle);    
    // actions.provider.specifyOracle(oracle)
    oracle.setProvider(this.props.web3.currentProvider);    
    // deploy 
    return new Promise((done) => oracle.deployed().then((inst)=>{
      oracle.address = address; 
      oracle.at(address); 
      oracle.deployed().then((inst)=>{
        console.log(oracle, inst, address);      
        done(inst)
      });
    }));
  }

  updateJCV=(details, address)=>{
    /*
    details.publicInfo, 
      details.sensitive, 
      details.hist, 
      details.education, 
      details.ref,

    */
    this.loadJCV(address).then((instance)=>{
      instance.address = address;
      instance.updateResume(details.sensitive, 
        details.ref, 
        details.hist, 
        details.education, 
        details.publicInfo, 
        {from: this.props.coinbase}
      ).then((res)=>{
        console.log(res);
        // loaded?
      }).catch((error)=>{
        console.log(error, "Failed to upload");
      })
    })

  }

  createContract=(details)=>{
    this.props.oracle.deployJCV(details.sensitive, 
      details.ref, 
      details.hist, 
      details.education, 
      details.publicInfo,
      {from: this.props.coinbase})
    .then((result)=>{
      console.log("Successfully created contract");
      this.props.oracle.getJCV({from: this.props.coinbase}).then((result)=>{
        //this.updateJCV(details, result);
        console.log("JCV retrieved with coinbase as ", result);
      });
    }).catch((e)=>{
      console.log("Failed", e);
    });      
  }

  handleSubmit() {
    // logic
    console.log("Submitting");

    if (this.props.creating)
      this.props.actions.contractState.contractCreating();
    else if (this.props.editing)
      this.props.actions.contractState.contractUpdating();

    axios.post("/saveResume", this.state.details)
    .then((response)=>{
      console.log("Created Contract", response);
      this.setState({
        snackShowing: true,
        message: "Successfully persisted into IPFS"
      });

      // now i need to create a new contract
      if (this.props.creating) {
        this.createContract(response.data);
      }
      else {
        this.updateJCV(response.data);
      }
    })
    .catch((error)=>{
      this.setState({
        snackShowing: true,
        message: "Failed to Save with error " + error
      })
    })
  }
  handleRequestClose =()=>{
    this.setState({
      snackShowing: false
    })
  }

  handleActionTouchTap =() => {
    this.setState({
      snackShowing: false
    })
  }

  render() {    
    let editing  = this.props.editing;
    let creating = this.props.creating;
    let saving   = this.props.saving;
    let loading  = this.props.loading;
    console.log("Saving / Loading", editing, creating, saving, loading);
    return (
      <div style = {styles}>
        <h2>My JCV</h2>
        <h4>{this.props.coinbase}</h4>
        <h4>{this.props.amount}</h4>
        <legend style={{"display":creating?"block":"none"}}>Creating a new CV</legend>
        <legend style={{"display":editing && !creating?"block":"none"}}>Editing existing CV</legend>
        <legend style={{"display":saving && !creating?"block":"none"}}>Saving CV</legend>
        <legend style={{"display":saving && !creating?"block":"none"}}>Loading CV</legend>
        <LinearProgress style={{"display":saving || loading ? "block":"none"}} mode="indeterminate"/>
        <ValidatorForm name="form" onSubmit={this.handleSubmit} onError={errors=>console.log(errors)}>
        {
          activeFields["Public"].map((item)=>{
            return this.createField(item, this.props);
          })          
        }        
        {
          activeFields["Private"].map((item)=>{
            return this.createField(item, this.props);
          })
        }
        <Button label={editing?(creating?"Create CV":"Save CV"):"Edit CV"} type="Submit" />
        </ValidatorForm>
        <Snackbar
          open={this.state.snackShowing}
          message={this.state.message}
          autoHideDuration={3000}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

function mapStateToPropsCV(state) {  
  let editing  = state.contract.currentState == Const.EDIT_CONTRACT || state.contract.currentState == Const.NEW_CONTRACT;
  let creating = state.contract.currentState == Const.NEW_CONTRACT;   
  let saving   = state.contract.currentState == Const.UPDATING || state.contract.currentState == Const.CREATING;
  let loading  = state.contract.currentState == Const.LOADING;

  console.log("Saving / Loading", editing, creating, saving, loading, state.contract.currentState, state);
  
  return {
    oracle        : state.provider.oracle,
    web3          : state.provider.provider,
    contractState : state.contract.currentState,
    coinbase      : state.contract.coinbase,
    details       : state.contract.details,
    editing       : editing,
    creating      : creating,
    saving        : saving,
    loading       : loading,
    amount        : state.contract.amount,
    cvnbi         : state.provider.cvNBI
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

export default connect(mapStateToPropsCV, mapDispatchToPropsCV)(CVViewer);