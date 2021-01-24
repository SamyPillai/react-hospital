import React, { Component } from 'react'
import EmployeesService from '../services/EmployeesService'

export default class ListEmployeesSpecializationComponent extends Component {
    constructor(props){
        const employeesSpecialization = [];
        super(props)
            this.state = {
                employeeId: this.props.match.params.id,
                employeesSpecialization: []
            }
            
        this.addEmployeesSpecialization = this.addEmployeesSpecialization.bind(this);
        this.editEmployeesSpecialization = this.editEmployeesSpecialization.bind(this);
        this.deleteEmployeesSpecialization = this.deleteEmployeesSpecialization.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    viewEmployeesSpecialization(id,specialization,yearsOfExperience){
        this.props.history.push(`/view-specialization/${id}`, {employeeId: id, specialization: specialization, 
            yearsOfExperience: yearsOfExperience, title: "View Employees Specializations"});
    } 

    addEmployeesSpecialization(){
        this.props.history.push(`/add-employees-specialization/${this.state.employeeId}`);
    }

    editEmployeesSpecialization(id,specialization,yearsOfExperience){
        this.props.history.push(`/update-employees-specialization/${id}`, { employeeId: id, specialization: specialization, 
            yearsOfExperience: yearsOfExperience, title: "Update Employees Specializations"});
    }

    deleteEmployeesSpecialization(id,specialization){
        EmployeesService.deleteEmployeesSpecialization(id,specialization).then( res=> {
            this.setState({employeesSpecialization: this.state.employeesSpecialization.filter(employeesSpecialization => employeesSpecialization.specialization != specialization)});
        });
    }

    componentDidMount(){ 
        EmployeesService.getEmployeesSpecializationById(this.state.employeeId).then((res) => {          
            this.setState({ employeesSpecialization: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees Specialization</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployeesSpecialization}> Add Specialization</button>
                </div>
                <div className="row">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Specialization</th>
                                <th>Years of Experience</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employeesSpecialization.map(
                                    employeesSpecialization =>
                                    <tr key = {employeesSpecialization.employeeId}>
                                        <td> {employeesSpecialization.specialization} </td>
                                        <td> {employeesSpecialization.yearsOfExperience} </td>
                                        <td>
                                            <button onClick={ () => this.viewEmployeesSpecialization(employeesSpecialization.employeeId,employeesSpecialization.specialization,employeesSpecialization.yearsOfExperience) } className="btn btn-info">View</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.editEmployeesSpecialization(employeesSpecialization.employeeId,employeesSpecialization.specialization,employeesSpecialization.yearsOfExperience) } className="btn btn-info" >Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployeesSpecialization(employeesSpecialization.employeeId,employeesSpecialization.specialization) } className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>    
                </div>
            </div>
        );
    }
}
