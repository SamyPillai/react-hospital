import React, { Component } from 'react'
import PatientsService from '../services/PatientsService';

export default class CreatePatientsHealthComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            patientId: this.props.match.params.id,
            date: '',
            time: '',
            symptoms: '',
            additionalInfo: '',
            isDisabled: false,
            isHidden: false,
            title: 'Add Patients Health'
        }

        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeTimeHandler = this.changeTimeHandler.bind(this);
        this.changeSymptomsHandler = this.changeSymptomsHandler.bind(this);
        this.changeAdditionalInfoHandler = this.changeAdditionalInfoHandler.bind(this);
        this.savePatientsHealth = this.savePatientsHealth.bind(this);
    }

    savePatientsHealth = (e) => {
        e.preventDefault();
        let patientsHealth = {
        patientId: this.props.match.params.id,
        date: this.state.date,
        time: this.state.time,
        symptoms: this.state.symptoms,
        additionalInfo: this.state.additionalInfo};
        console.log("Saving Patients....");
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,20) == 'add-patients-health')
        {
            console.log("PATIENT ID IS:"+this.state.patientId);
            console.log("Patients is : " +JSON.stringify(patientsHealth));
            PatientsService.createPatientsHealth(patientsHealth).then(res =>{
                this.props.history.push(`/view-patients-health/${this.state.patientId}`);
            });
        }
        else
        {
            console.log("Saving the Health", this.state);
            PatientsService.updatePatientsHealth(patientsHealth, this.state.patientId).then(res =>{
                this.props.history.push(`/view-patients-health/${this.state.patientId}`);
            });
        }
    }

    cancel(){
        this.props.history.push(`/view-patients-health/${this.state.patientId}`);
    }

    changeDateHandler=(event) => {
        this.setState({date: event.target.value});
    }
    changeTimeHandler=(event) => {
        this.setState({time: event.target.value});
    }
    changeSymptomsHandler=(event) => {
        this.setState({symptoms: event.target.value});
    }    
    changeAdditionalInfoHandler=(event) => {
        this.setState({additionalInfo: event.target.value});
    }
    componentDidMount(){ 
        console.log("Patient Id in Health:"+this.state.patientId );
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,20) == 'add-patients-health')
        {
            console.log("Its inside Create");
            return;
        } else if(currentLocation.substring(1,12) == 'view-health')
        {
            console.log("Its inside View..");
            this.setState(this.props.location.state);
            this.setState({
                patientId: this.props.match.params.id,
                isDisabled: true,
                isHidden: true,
                title:'View Patients Health'
            })
        }
        else
        {
            this.setState(this.props.location.state);
            console.log("Its inside Update"+this.state.symptoms);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form>
                    <h1 style={{textAlign: 'center'}}> {this.state.title} </h1>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label>Date</label>
                            <input type="date" placeholder="Date" className="form-control" id="date"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.date} onChange={this.changeDateHandler}/>
                            </div>
                            <div class="form-group col-md-6">
                            <label>Time</label>
                            <input type="time"  placeholder="Time" name="time" className="form-control" id="time"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.time} onChange={this.changeTimeHandler}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                            <label>Symptoms</label>
                            <input type="text" placeholder="Symptoms" name="symptoms" className="form-control" id="symptoms"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.symptoms} onChange={this.changeSymptomsHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-12">
                            <label>Additional Information</label>
                            <input type="text" placeholder="Additional Information" name="additionalInfo" className="form-control" id="additionalInfo"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.additionalInfo} onChange={this.changeAdditionalInfoHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                        <div class="form-group col-md-2">
                        <button className="btn btn-success" onClick={this.savePatientsHealth} disabled={this.state.isDisabled}
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
