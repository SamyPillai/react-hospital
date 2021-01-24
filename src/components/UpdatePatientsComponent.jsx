import React, { Component } from 'react';
import PatientsService from '../services/PatientsService';

export default class UpdatePatientsComponent extends Component {

    constructor(props){
        const patientsHealth = [];
        super(props)
        this.state = {
            patientId: this.props.match.params.id,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            weight: '',
            height: '',
            contactNumber: '',
            emailId: '',
            profession: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            isDisabled: false,
            isHidden: false,
            title:'',
            patientsHealth: []
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeDateofBirthHandler = this.changeDateofBirthHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeWeightHandler = this.changeWeightHandler.bind(this);
        this.changeHeightHandler = this.changeHeightHandler.bind(this);
        this.changeContactNumberHandler = this.changeContactNumberHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.changeProfessionHandler = this.changeProfessionHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeZipCodeHandler = this.changeZipCodeHandler.bind(this);
        this.updatePatients = this.updatePatients.bind(this);
        this.viewPatientsHealth = this.viewPatientsHealth.bind(this);
    }

    componentDidMount(){
        var currentLocation = window.location.pathname;
        console.log("lalalalallaaa.....");
        PatientsService.getPatientsById(this.state.patientId).then( (res) => {
            let patients = res.data;
            this.setState({firstName: patients.firstName,
                lastName: patients.lastName,
                dateOfBirth: patients.dateOfBirth,
                gender: patients.gender,
                weight: patients.weight,
                height: patients.height,
                contactNumber: patients.contactNumber,
                emailId: patients.emailId,
                profession: patients.profession,
                address: patients.address,
                city: patients.city,
                state: patients.state,
                zipCode: patients.zipCode,
                title: 'Update Patients'
            });
            if (currentLocation.substring(1,14) == 'view-patients')
            {
                this.setState({
                    patientId: this.props.match.params.id,
                    isDisabled: true,
                    isHidden: true,
                    title:'View Patients'
                })
            }
        }); 
        console.log("Patients ID in Update Patients Component:" +this.props.match.params.id);
    }

    updatePatients = (e) => {
        e.preventDefault();
        let patient = {firstName: this.state.firstName,
        lastName: this.state.lastName,
        dateOfBirth: this.state.dateOfBirth,
        gender: this.state.gender,
        weight: this.state.weight,
        height: this.state.height,
        contactNumber: this.state.contactNumber,
        emailId: this.state.emailId,
        profession: this.state.profession,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode};
        console.log("Patients is : " +JSON.stringify(patient));
        PatientsService.updatePatients(patient, this.state.patientId).then( res=> {
            this.props.history.push('/patients');
        });
    }

    cancel(){
        this.props.history.push('/patients');
    }

    viewPatientsHealth(id){
        console.log("Id inside view patients health : "+id);
        this.props.history.push(`/view-patients-health/${id}`);
    }

    viewPatientsDiseases(id){
        this.props.history.push(`/view-patients-diseases/${id}`);
    }

    changeFirstNameHandler=(event) => {
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler=(event) => {
        this.setState({lastName: event.target.value});
    }
    changeDateofBirthHandler=(event) => {
        this.setState({dateOfBirth: event.target.value});
    }    
    changeGenderHandler=(event) => {
        this.setState({gender: event.target.value});
    }
    changeWeightHandler=(event) => {
        this.setState({weight: event.target.value});
    }
    changeHeightHandler=(event) => {
        this.setState({height: event.target.value});
    }
    changeContactNumberHandler=(event) => {
        this.setState({contactNumber: event.target.value});
    }
    changeEmailIdHandler=(event) => {
        this.setState({emailId: event.target.value});
    }
    changeAddressHandler=(event) => {
        this.setState({address: event.target.value});
    }
    changeProfessionHandler=(event) => {
        this.setState({profession: event.target.value});
    }
    changeCityHandler=(event) => {
        this.setState({city: event.target.value});
    }
    changeStateHandler=(event) => {
        this.setState({state: event.target.value});
    }
    changeZipCodeHandler=(event) => {
        this.setState({zipCode: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-1">
                            <button class="btn btn-success" onClick={ () => this.viewPatientsHealth(this.state.patientId) }
                            style={{height : '40px', width : '80px', marginLeft : '5px'}}> Health </button>
                            </div>
                            <div class="form-group col-md-3">
                            <button class="btn btn-success" onClick={ () => this.viewPatientsDiseases(this.state.patientId) }
                            style={{height : '40px', width : '90px', marginLeft : '5px'}}> Diseases </button>
                            </div>
                            <div class="form-group col-md-4">
                            <h1 style={{textAlign: 'right'}}> {this.state.title} </h1>
                            </div>
                        </div>
                    
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label>First Name</label>
                            <input placeholder="First Name" className="form-control"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>                            
                            </div>
                            <div class="form-group col-md-6">
                            <label>Last Name</label>
                            <input placeholder="Last Name" name="lastName" className="form-control" id="lastName"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                            <label>Date of Birth</label>
                            <input type="date" placeholder="Date of Birth" name="dateOfBirth" className="form-control" id="dateOfBirth"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.dateOfBirth} onChange={this.changeDateofBirthHandler}/>                        
                            </div>
                            <div class="form-group col-md-3">
                            <label>Gender</label>
                            <select placeholder="Gender" name="gender" className="form-control" id="gender"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.gender} onChange={this.changeGenderHandler}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                            </select>
                            </div>
                            <div class="form-group col-md-3">
                            <label>Weight</label>
                            <input type="number" placeholder="Weight" name="weight" className="form-control" id="weight"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.weight} onChange={this.changeWeightHandler}/>                            
                            </div>
                            <div class="form-group col-md-3">
                            <label>Height</label>
                            <input type="number" placeholder="Height" name="height" className="form-control" id="height"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.height} onChange={this.changeHeightHandler}/>                        
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label>Contact Number</label>
                            <input type="tel" placeholder="Contact Number" name="contactNumber" className="form-control" id="contactNumber"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={this.state.contactNumber} onChange={this.changeContactNumberHandler}/>
                            </div>
                            <div className="form-group col-md-8">
                            <label>E-mail</label>
                            <input type="email" placeholder="E-mail" name="emailId" className="form-control" id="emailId"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label>Profession</label>
                            <input placeholder="Profession" name="profession" className="form-control" id="profession"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.profession} onChange={this.changeProfessionHandler}/>                            
                            </div>
                            <div class="form-group col-md-8">
                            <label>Address</label>
                            <input placeholder="Address" name="address" className="form-control" id="address"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.address} onChange={this.changeAddressHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label>City</label>
                            <input placeholder="City" name="city" className="form-control" id="city"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.city} onChange={this.changeCityHandler}/>                            
                            </div>
                            <div class="form-group col-md-4">
                            <label>State</label>
                            <input placeholder="State" name="state" className="form-control" id="state"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.state} onChange={this.changeStateHandler}/>
                            </div>
                            <div class="form-group col-md-4">
                            <label>Zip Code</label>
                            <input placeholder="Zip Code" name="zipCode" className="form-control" id="zipCode"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.zipCode} onChange={this.changeZipCodeHandler}/>                            
                            </div>
                        </div> 
                        <div className="form-row">
                        <div className="form-group col-md-2">
                        <button className="btn btn-success" onClick={this.updatePatients} disabled={this.state.isDisabled}
                        hidden={this.state.isHidden}
                        style={{height : '40px', width : '100px', marginLeft : '350px'}}>Save</button>
                        </div>
                        <div className="form-group col-md-2">
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
