import React, { Component } from 'react'
import PatientsService from '../services/PatientsService'

export default class ListPatientsComponent extends Component {

    constructor(props){
        const patients = [];
        super(props)
            this.state = {
                patients: []
            }
            
        this.addPatients = this.addPatients.bind(this);
        this.editPatients = this.editPatients.bind(this);
        this.deletePatients = this.deletePatients.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    addPatients(){
        this.props.history.push('/add-patients');
    }

    editPatients(id){
        this.props.history.push(`/update-patients/${id}`);
    }

    viewPatients(id){
        this.props.history.push(`/view-patients/${id}`);
    }

    deletePatients(id){
        PatientsService.deletePatients(id).then( res=> {
            this.setState({patients: this.state.patients.filter(patient => patient.patientId !== id)});
        });
    }

    componentDidMount(){ 
        PatientsService.getPatients().then((res) => {
            console.log(res.data);            
            this.setState({ patients: res.data });
        });
    }

    handleEmpty(patients,iden) {
        patients.filter((entry) => entry.firstName === iden );
        console.log("Inside....")
        this.state.setState(patients);
    }

    render() {
                
        return (
                    <div>
                        <h2 className="text-center">Patients List</h2>
                        <div className="row">
                            <button className="btn btn-primary" onClick={this.addPatients}> Add Patients</button>
                        </div>
                        <div className="row">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Contact</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.patients.filter(patients => patients.firstName != null ).map(
                                            patients =>
                                            <tr key = {patients.patientId}>
                                                <td> {patients.firstName+" "+patients.lastName} </td>
                                                <td> {patients.dateOfBirth} </td>
                                                <td> {patients.contactNumber} </td>
                                                <td>
                                                    <button onClick={ () => this.viewPatients(patients.patientId) } className="btn btn-info">View</button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.editPatients(patients.patientId) } className="btn btn-info">Update</button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deletePatients(patients.patientId) } className="btn btn-danger">Delete</button>
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
