import React, { Component } from 'react'
import EmployeesService from '../services/EmployeesService';

export default class CreateEmployeesSpecializationComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            employeeId: this.props.match.params.id,
            specialization: '',
            yearsOfExperience: '',
            isDisabled: false,
            isHidden: false,
            errorMessage: '',
            title: 'Add Employees Specialization'
        }
        this.changeSpecializationHandler = this.changeSpecializationHandler.bind(this);
        this.changeYearsOfExperienceHandler = this.changeYearsOfExperienceHandler.bind(this);
        this.saveEmployeesSpecialization = this.saveEmployeesSpecialization.bind(this);
    }

    saveEmployeesSpecialization = (e) => {
        e.preventDefault();
        let employeeSpecialization = {
        employeeId: this.props.match.params.id,
        specialization: this.state.specialization,
        yearsOfExperience: this.state.yearsOfExperience};
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,29) == 'add-employees-specialization')
        {
            console.log("Patients is : " +JSON.stringify(employeeSpecialization));
            EmployeesService.createEmployeesSpecialization(employeeSpecialization).then(res =>{
                this.props.history.push(`/view-employees-specialization/${this.state.employeeId}`);
            });
        }
        else
        {
            console.log("Saving the Disease", this.state);
            EmployeesService.updateEmployeesSpecialization(employeeSpecialization, this.state.employeeId).then(res =>{
                this.props.history.push(`/view-employees-specialization/${this.state.employeeId}`);
            });
        }
    }

    cancel(){
        this.props.history.push(`/view-employees-specialization/${this.state.employeeId}`);
    }

    changeSpecializationHandler=(event) => {
        this.setState({specialization: event.target.value});
    }    
    changeYearsOfExperienceHandler=(event) => {
        this.setState({yearsOfExperience: event.target.value});
    }

    componentDidMount(){ 
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,29) == 'add-employees-specialization')
        {
            console.log("Its inside Create");
            return;
        } else if (currentLocation.substring(1,20) == 'view-specialization')
        {
            console.log("Its inside View..");
            this.setState(this.props.location.state);
            this.setState({
                employeeId: this.props.match.params.id,
                isDisabled: true,
                isHidden: true,
                title:'View Employees Specialization'
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
                            <label>Specialization</label>
                            <input type="text" placeholder="Specialization" name="specialization" className="form-control" id="specialization"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.specialization} onChange={this.changeSpecializationHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                            <div class="form-group col-md-12">
                            <label>Years of Experience</label>
                            <input type="text" placeholder="Years of Experience" name="yearsOfExperience" className="form-control" id="yearsOfExperience"
                            style={{height : '30px'}} disabled={this.state.isDisabled}
                            value={this.state.yearsOfExperience} onChange={this.changeYearsOfExperienceHandler}/>
                            </div>
                        </div> 
                        <div class="form-row">
                        <div class="form-group col-md-2">
                        <button className="btn btn-success" onClick={this.saveEmployeesSpecialization} disabled={this.state.isDisabled}
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
