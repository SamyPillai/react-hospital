import React, { Component } from 'react'
import EmployeesService from '../services/EmployeesService'

export default class ListEmployeesComponent extends Component {
    constructor(props){
        const employees = [];
        super(props)
            this.state = {
                employees: []
            }
            
        this.addEmployees = this.addEmployees.bind(this);
        this.editEmployees = this.editEmployees.bind(this);
        this.deleteEmployees = this.deleteEmployees.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    addEmployees(){
        this.props.history.push('/add-employees');
    }

    editEmployees(id,firstName,lastName,type,designation,dateOfBirth,gender,contactNumber,emailId,address,
        city,state,zipCode,salary){
        this.props.history.push(`/update-employees/${id}`,{ employeeId:id, firstName:firstName, lastName:lastName,
        type:type,designation:designation,dateOfBirth:dateOfBirth,gender:gender,contactNumber:contactNumber,
        emailId:emailId, address:address,city:city,state:state,zipCode:zipCode,salary:salary, title:"Update Employees"});
    }

    viewEmployees(id,firstName,lastName,type,designation,dateOfBirth,gender,contactNumber,emailId,address,
        city,state,zipCode,salary){
        this.props.history.push(`/view-employees/${id}`, { employeeId:id, firstName:firstName, lastName:lastName,
            type:type,designation:designation,dateOfBirth:dateOfBirth,gender:gender,contactNumber:contactNumber,
            emailId:emailId, address:address,city:city,state:state,zipCode:zipCode,salary:salary, title:"View Employees"});
    }

    deleteEmployees(id){
        EmployeesService.deleteEmployees(id).then( res=> {
            this.setState({employees: this.state.employees.filter(employees => employees.employeeId !== id)});
        });
    }

    componentDidMount(){ 
        console.log("Inside here...");
        EmployeesService.getEmployees().then((res) => {
            console.log(res.data);            
            this.setState({ employees: res.data });
        });
    }

    handleEmpty(employees,iden) {
        employees.filter((entry) => entry.firstName === iden );
        console.log("Inside....")
        this.state.setState(employees);
    }

    render() {
                
        return (
                    <div>
                        <h2 className="text-center">Employees List</h2>
                        <div className="row">
                            <button className="btn btn-primary" onClick={this.addEmployees}> Add Employees</button>
                        </div>
                        <div className="row">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Designation</th>
                                        <th>Contact</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.employees.filter(employees => employees.firstName != null ).map(
                                            employees =>
                                            <tr key = {employees.employeeId}>
                                                <td> {employees.firstName+" "+employees.lastName} </td>
                                                <td> {employees.type} </td>
                                                <td> {employees.designation} </td>
                                                <td> {employees.contactNumber} </td>
                                                <td>
                                                    <button onClick={ () => this.viewEmployees(employees.employeeId,employees.firstName,employees.lastName,
                                                        employees.type,employees.designation,employees.dateOfBirth,employees.gender,employees.contactNumber,
                                                        employees.emailId,employees.address,employees.city,employees.state,employees.zipCode,employees.salary) } 
                                                    className="btn btn-info">View</button>
                                                    <button style={{marginLeft: "10px"}} 
                                                    onClick={ () => this.editEmployees(employees.employeeId,employees.firstName,employees.lastName,
                                                        employees.type,employees.designation,employees.dateOfBirth,employees.gender,employees.contactNumber,
                                                        employees.emailId,employees.address,employees.city,employees.state,employees.zipCode,employees.salary) } 
                                                    className="btn btn-info">Update</button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployees(employees.employeeId) } className="btn btn-danger">Delete</button>
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
