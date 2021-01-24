import React, { Component } from 'react'
import EmployeesService from '../services/EmployeesService';

export default class CreateEmployeesComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            type: '',
            designation: '',
            dateOfBirth: '',
            gender: '',
            contactNumber: '',
            emailId: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            salary: '',
            isDisabled: false,
            isHidden: false,
            title: 'Add Employees'
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.changeDateofBirthHandler = this.changeDateofBirthHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeContactNumberHandler = this.changeContactNumberHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeZipCodeHandler = this.changeZipCodeHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.saveEmployees = this.saveEmployees.bind(this);
    }

    saveEmployees = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName,
        lastName: this.state.lastName,
        dateOfBirth: this.state.dateOfBirth,
        gender: this.state.gender,
        type: this.state.type,
        designation: this.state.designation,
        contactNumber: this.state.contactNumber,
        emailId: this.state.emailId,
        profession: this.state.profession,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode,
        salary: this.state.salary};
        console.log("Employee is : " +JSON.stringify(employee));
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,14) == 'add-employees')
        {
            EmployeesService.createEmployees(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }
        else
        {
            EmployeesService.updateEmployees(employee,this.state.employeeId).then(res =>{
                // this.props.history.push(`/view-employees/${this.state.employeeId}`);
                this.props.history.push('/employees');
            });
        }
    
    }

    viewEmployeesSpecialization(id){
        this.props.history.push(`/view-employees-specialization/${id}`);
    }

    cancel(){
        this.props.history.push('/employees');
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
    changeTypeHandler=(event) => {
        this.setState({type: event.target.value});
    }
    changeDesignationHandler=(event) => {
        this.setState({designation: event.target.value});
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
    changeSalaryHandler=(event) => {
        this.setState({salary: event.target.value});
    }

    componentDidMount(){ 
        var currentLocation = window.location.pathname;
        console.log("INSIDE..",currentLocation);
        if (currentLocation.substring(1,14) == 'add-employees')
        {
            console.log("Its inside Create");
            return;
        } else if (currentLocation.substring(1,15) == 'view-employees')
        {
            console.log("SETTING STATE..");
            this.setState(this.props.location.state);
            this.setState({
                employeeId: this.props.match.params.id,
                isDisabled: true,
                isHidden: true,
                title:'View Employees'
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
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <button class="btn btn-success" onClick={ () => this.viewEmployeesSpecialization(this.state.employeeId) }
                            style={{height : '40px', width : '120px', marginLeft : '5px'}}> Specialization </button>
                            </div>
                            <div class="form-group col-md-4">
                            <h1 style={{textAlign: 'center'}}> {this.state.title} </h1>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="firstName">First Name</label>
                            <input placeholder="First Name" name="firstName" className="form-control" id="firstName"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                            </div>
                            <div class="form-group col-md-6">
                            <label for="lastName">Last Name</label>
                            <input placeholder="Last Name" name="lastName" className="form-control" id="lastName"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                            </div>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="type">Type</label>
                            <select placeholder="Type" name="type" className="form-control" id="type"
                            style={{height : '35px'}} disabled={this.state.isDisabled}
                            value={this.state.type} onChange={this.changeTypeHandler}>
                            <option value="Contract">Contract</option>
                            <option value="Permanent">Permanent</option>
                            </select>
                            </div>
                            <div class="form-group col-md-4">
                            <label for="designation">Designation</label>
                            <input placeholder="Designation" name="designation" className="form-control" id="designation"
                            style={{height : '35px'}} disabled={this.state.isDisabled}
                            value={this.state.designation} onChange={this.changeDesignationHandler}/>
                            </div>
                            <div class="form-group col-md-2">
                            <label for="dateOfBirth">Date of Birth</label>
                            <input type="date" placeholder="Date of Birth" name="dateOfBirth" className="form-control" id="dateOfBirth"
                            style={{height : '35px'}} disabled={this.state.isDisabled}
                            value={this.state.dateOfBirth} onChange={this.changeDateofBirthHandler}/>
                            </div>
                            <div class="form-group col-md-2">
                            <label for="gender">Gender</label>
                            <select placeholder="Gender" name="gender" className="form-control" id="gender"
                            style={{height : '35px'}} disabled={this.state.isDisabled}
                            value={this.state.gender} onChange={this.changeGenderHandler}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                            </select>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label for="contactNumber">Contact Number</label>
                            <input type="tel" placeholder="Contact Number" name="contactNumber" className="form-control" id="contactNumber"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={this.state.contactNumber} onChange={this.changeContactNumberHandler}/>
                            </div>
                            <div class="form-group col-md-8">
                            <label for="emailId">E-mail</label>
                            <input type="email" placeholder="E-mail" name="emailId" className="form-control" id="emailId"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-8">
                            <label for="address">Address</label>
                            <input placeholder="Address" name="address" className="form-control" id="address"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.address} onChange={this.changeAddressHandler}/>
                            </div>
                            <div class="form-group col-md-4">
                            <label for="salary">Salary</label>
                            <input type="number" placeholder="Salary" name="salary" className="form-control" id="salary"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.salary} onChange={this.changeSalaryHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label for="city">City</label>
                            <input placeholder="City" name="city" className="form-control" id="city"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.city} onChange={this.changeCityHandler}/>
                            </div>
                            <div class="form-group col-md-4">
                            <label for="state">State</label>
                            <input placeholder="State" name="state" className="form-control" id="state"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.state} onChange={this.changeStateHandler}/>
                            </div>
                            <div class="form-group col-md-4">
                            <label for="zipCode">Zip Code</label>
                            <input placeholder="Zip Code" name="zipCode" className="form-control" id="zipCode"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.zipCode} onChange={this.changeZipCodeHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                        <div class="form-group col-md-2">
                        <button className="btn btn-success" onClick={this.saveEmployees} 
                        hidden={this.state.isHidden} disabled={this.state.isDisabled}
                        style={{height : '40px', width : '100px', marginLeft : '350px'}}>Save</button>
                        </div>
                        <div class="form-group col-md-2">
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                        hidden={this.state.isHidden} disabled={this.state.isDisabled}
                        style={{height : '40px', width : '100px', marginLeft : '300px'}}>Cancel</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
