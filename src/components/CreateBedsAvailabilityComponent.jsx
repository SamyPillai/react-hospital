import React, { Component } from 'react'
import AdminService from '../services/AdminService';

export default class CreateBedsAvailabilityComponent extends Component {
    constructor(props){
        const bedAvailability = [];
        super(props)
        this.state = {
            bedsAvailability: [],
            bedId: this.props.match.params.id,
            date: '',
            time: '',
            available: '',            
            isDisabled: false,
            isHidden: false,
            readOnly: false,
            dateError: '',
            timeError: '',
            availableError: '',
            title: 'Add Availability'
        }
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeTimeHandler = this.changeTimeHandler.bind(this);
        this.changeAvailableHandler = this.changeAvailableHandler.bind(this);
        this.saveBedsAvailability = this.saveBedsAvailability.bind(this);
    }

    validate = () => {
        let dateError = "";
        let timeError = "";
        let availableError = "";

        if(this.state.date == "")
        {
            dateError = "Enter a Date";
        }
        else{
            dateError = "";
            this.setState({dateError});
        }

        if(this.state.time == "")
        {
            timeError = "Enter a Time";
        }else{
            timeError = "";
            this.setState({timeError});
        }

        if(this.state.available == "")
        {
            availableError = "Enter the Availability";
        }else{
            availableError = "";
            this.setState({availableError});
        }

        if(dateError){
            this.setState({dateError});
            return false;
        }

        if(timeError){
            this.setState({timeError});
            return false;
        }

        if(availableError){
            this.setState({availableError});
            return false;
        }

        return true;

    }

    saveBedsAvailability = (e) => {
        e.preventDefault();
        let bedsAvailability = {
        bedId: this.props.match.params.id,
        date: this.state.date,
        time: this.state.time,
        available: this.state.available};


        const isValid = this.validate();

        if(isValid)
        {
            var currentLocation = window.location.pathname;
            if (currentLocation.substring(1,22) == 'add-beds-availability')
            {
                console.log("creating..");
                AdminService.createBedsAvailability(bedsAvailability).then(res =>{
                    this.props.history.push(`/view-beds-availability/${this.state.bedId}`);
                });
            }
            else    
            {
                console.log("updating..");
                AdminService.updateBedsAvailability(bedsAvailability, this.state.bedId).then(res =>{
                    this.props.history.push(`/view-beds-availability/${this.state.bedId}`);
                });
            }
        }    
    }

    viewBedsAvailability(id){        
        console.log("Listing Rooms Availability :", id);
        this.props.history.push(`/view-beds-availability/${id}`);
    }

    cancel(){
        this.props.history.push(`/view-beds-availability/${this.state.bedId}`);
    }

    changeDateHandler=(event) => {
        this.setState({date: event.target.value});
    }    
    changeTimeHandler=(event) => {
        this.setState({time: event.target.value});
    }    
    changeAvailableHandler=(event) => {
        this.setState({available: event.target.value});
    }

    componentDidMount(){ 
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,22) == 'add-beds-availability')
        {
            console.log("Its inside Create");
            return;
        } else if (currentLocation.substring(1,18) == 'view-beds-avail')
        {
            console.log("Its inside View..");
            this.setState(this.props.location.state);
            this.setState({
                bedId: this.props.match.params.id,
                isDisabled: true,
                isHidden: true,
                title:'View Availability'
            })
        }
        else
        {
            console.log("Updating....");
            this.setState({
                readOnly: true,
            })
            this.setState(this.props.location.state);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form>
                        <h1 style={{textAlign: 'center'}}> {this.state.title} </h1>                                            
                        <div class="form-row">
                            <div class="form-group col-md-2">
                            <label>Date</label>
                            <input type="date" placeholder="Date" name="date" className="form-control" id="date"
                            style={{height : '35px'}} disabled={this.state.isDisabled} readOnly={this.state.readOnly}
                            value={this.state.date} onChange={this.changeDateHandler}/>
                            {this.state.dateError ? (<div style={{ fontSize:12, color:'red' }}>
                                {this.state.dateError}</div>):null}
                            </div>
                            <div class="form-group col-md-2">
                            <label>Time</label>
                            <input type="time" placeholder="Time" name="time" className="form-control" id="time"
                            style={{height : '35px'}} disabled={this.state.isDisabled} readOnly={this.state.readOnly}
                            value={this.state.time} onChange={this.changeTimeHandler}/>
                            {this.state.timeError ? (<div style={{ fontSize:12, color:'red' }}>
                                {this.state.timeError}</div>):null}
                            </div>
                            <div class="form-group col-md-6">
                            <label>Available</label>
                            <select placeholder="Available" name="available" className="form-control" id="available"
                            style={{height : '35px'}} disabled={this.state.isDisabled}
                            value={this.state.available} onChange={this.changeAvailableHandler}>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                            </select>
                            {this.state.availableError ? (<div style={{ fontSize:12, color:'red' }}>
                                {this.state.availableError}</div>):null}
                            </div>
                        </div> 
                        <div class="form-row">
                        <div class="form-group col-md-2">
                        <button className="btn btn-success" onClick={this.saveBedsAvailability} disabled={this.state.isDisabled}
                        hidden={this.state.isHidden}
                        style={{height : '40px', width : '100px', marginLeft : '350px'}}>Save</button>
                        </div>
                        <div class="form-group col-md-2">
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} disabled={this.state.isDisabled}
                        hidden={this.state.isHidden}
                        style={{height : '40px', width : '100px', marginLeft : '300px'}}>Cancel</button>
                        </div>
                        </div>
                    </form>
                </div>                
            </div>
        )
    }
}
