import React, { Component } from 'react'
import PatientsService from '../services/PatientsService';

export default class CreatePatientsDiseaseComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            patientId: this.props.match.params.id,
            disease: '',
            additionalInfo: '',
            isDisabled: false,
            isHidden: false,
            title: 'Add Patients Disease'
        }
        this.changeDiseaseHandler = this.changeDiseaseHandler.bind(this);
        this.changeAdditionalInfoHandler = this.changeAdditionalInfoHandler.bind(this);
        this.savePatientsDisease = this.savePatientsDisease.bind(this);
    }

    savePatientsDisease = (e) => {
        e.preventDefault();
        let patientsDisease = {
        patientId: this.props.match.params.id,
        disease: this.state.disease,
        additionalInfo: this.state.additionalInfo};
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,22) == 'add-patients-diseases')
        {
            console.log("PATIENT ID IS:"+this.state.patientId);
            console.log("Patients is : " +JSON.stringify(patientsDisease));
            PatientsService.createPatientsDisease(patientsDisease).then(res =>{
                this.props.history.push(`/view-patients-diseases/${this.state.patientId}`);
            });
        }
        else
        {
            console.log("Saving the Disease", this.state);
            PatientsService.updatePatientsDisease(patientsDisease, this.state.patientId).then(res =>{
                this.props.history.push(`/view-patients-diseases/${this.state.patientId}`);
            });
        }
    }

    cancel(){
        this.props.history.push(`/view-patients-diseases/${this.state.patientId}`);
    }

    changeDiseaseHandler=(event) => {
        this.setState({disease: event.target.value});
    }    
    changeAdditionalInfoHandler=(event) => {
        this.setState({additionalInfo: event.target.value});
    }

    componentDidMount(){ 
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,22) == 'add-patients-diseases')
        {
            console.log("Its inside Create");
            return;
        } else if(currentLocation.substring(1,14) == 'view-diseases')
        {
            console.log("Its inside View..");
            this.setState(this.props.location.state);
            this.setState({
                patientId: this.props.match.params.id,
                isDisabled: true,
                isHidden: true,
                title:'View Patients Diseases'
            })
        }
        else
        {
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
                            <div class="form-group col-md-12">
                            <label>Disease</label>
                            <input type="text" placeholder="Disease" name="disease" className="form-control" id="disease"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.disease} onChange={this.changeDiseaseHandler}/>
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
                        <button className="btn btn-success" onClick={this.savePatientsDisease} disabled={this.state.isDisabled}
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
