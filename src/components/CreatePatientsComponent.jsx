import React, { Component } from 'react'
import PatientsService from '../services/PatientsService';

export default class CreatePatientsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
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
            zipCode: ''
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
        this.savePatients = this.savePatients.bind(this);
    }

    savePatients = (e) => {
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
        PatientsService.createPatients(patient).then(res =>{
            this.props.history.push('/patients');
        });
    }

    cancel(){
        this.props.history.push('/patients');
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
                    <h1 style={{textAlign: 'center'}}> Add Patients</h1>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="firstName">First Name</label>
                            <input placeholder="First Name" name="firstName" className="form-control" id="firstName"
                            style={{height : '30px'}}
                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                            </div>
                            <div class="form-group col-md-6">
                            <label for="lastName">Last Name</label>
                            <input placeholder="Last Name" name="lastName" className="form-control" id="lastName"
                            style={{height : '30px'}}
                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                            <label for="dateOfBirth">Date of Birth</label>
                            <input type="date" placeholder="Date of Birth" name="dateOfBirth" className="form-control" id="dateOfBirth"
                            style={{height : '30px'}}
                            value={this.state.dateOfBirth} onChange={this.changeDateofBirthHandler}/>
                            </div>
                            <div class="form-group col-md-3">
                            <label for="gender">Gender</label>
                            <select placeholder="Gender" name="gender" className="form-control" id="gender"
                            style={{height : '30px'}}
                            value={this.state.gender} onChange={this.changeGenderHandler}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                            </select>
                            </div>
                            <div class="form-group col-md-3">
                            <label for="weight">Weight</label>
                            <input type="number" placeholder="Weight" name="weight" className="form-control" id="weight"
                            style={{height : '30px'}}
                            value={this.state.weight} onChange={this.changeWeightHandler}/>
                            </div>
                            <div class="form-group col-md-3">
                            <label for="height">Height</label>
                            <input type="number" placeholder="Height" name="height" className="form-control" id="height"
                            style={{height : '30px'}}
                            value={this.state.height} onChange={this.changeHeightHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label for="contactNumber">Contact Number</label>
                            <input type="tel" placeholder="Contact Number" name="contactNumber" className="form-control" id="contactNumber"
                            style={{height : '30px'}}
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={this.state.contactNumber} onChange={this.changeContactNumberHandler}/>
                            </div>
                            <div class="form-group col-md-8">
                            <label for="emailId">E-mail</label>
                            <input type="email" placeholder="E-mail" name="emailId" className="form-control" id="emailId"
                            style={{height : '30px'}}
                            value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label for="profession">Profession</label>
                            <input placeholder="Profession" name="profession" className="form-control" id="profession"
                            style={{height : '30px'}}
                            value={this.state.profession} onChange={this.changeProfessionHandler}/>
                            </div>
                            <div class="form-group col-md-8">
                            <label for="address">Address</label>
                            <input placeholder="Address" name="address" className="form-control" id="address"
                            style={{height : '30px'}}
                            value={this.state.address} onChange={this.changeAddressHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label for="city">City</label>
                            <input placeholder="City" name="city" className="form-control" id="city"
                            style={{height : '30px'}}
                            value={this.state.city} onChange={this.changeCityHandler}/>
                            </div>
                            <div class="form-group col-md-4">
                            <label for="state">State</label>
                            <input placeholder="State" name="state" className="form-control" id="state"
                            style={{height : '30px'}}
                            value={this.state.state} onChange={this.changeStateHandler}/>
                            </div>
                            <div class="form-group col-md-4">
                            <label for="zipCode">Zip Code</label>
                            <input placeholder="Zip Code" name="zipCode" className="form-control" id="zipCode"
                            style={{height : '30px'}}
                            value={this.state.zipCode} onChange={this.changeZipCodeHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                        <div class="form-group col-md-2">
                        <button className="btn btn-success" onClick={this.savePatients}
                        style={{height : '40px', width : '100px', marginLeft : '350px'}}>Save</button>
                        </div>
                        <div class="form-group col-md-2">
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                        style={{height : '40px', width : '100px', marginLeft : '300px'}}>Cancel</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
