import React, { Component } from 'react'
import PatientsService from '../services/PatientsService';

export default class ListPatientsDiseasesComponent extends Component {
    constructor(props){
        const patientsDiseases = [];
        super(props)
            this.state = {
                patientId: this.props.match.params.id,
                patientsDiseases: []
            }
            
        this.addPatientsDiseases = this.addPatientsDiseases.bind(this);
        this.editPatientsDiseases = this.editPatientsDiseases.bind(this);
        this.deletePatientsDiseases = this.deletePatientsDiseases.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    viewPatientsDisease(id,disease,additionalInfo){
        this.props.history.push(`/view-diseases/${id}`, {patientId: id, disease: disease, 
            additionalInfo: additionalInfo, title: "View Patients Diseases"});
    }   

    addPatientsDiseases(){
        this.props.history.push(`/add-patients-diseases/${this.state.patientId}`);
    }

    editPatientsDiseases(id,disease,additionalInfo){
        this.props.history.push(`/update-patients-diseases/${id}`, { patientId: id, disease: disease, 
            additionalInfo: additionalInfo, title: "Update Patients Diseases"});
    }

    deletePatientsDiseases(id,disease){
        PatientsService.deletePatientsDiseases(id,disease).then( res=> {
            this.setState({patientsDiseases: this.state.patientsDiseases.filter(patientsDiseases => patientsDiseases.disease != disease)});
        });
    }

    componentDidMount(){ 
        PatientsService.getPatientsDiseasesById(this.state.patientId).then((res) => {          
            this.setState({ patientsDiseases: res.data });
        });
    }

    // handleEmpty(patientsHealth,iden) {
    //     patientsHealth.filter((entry) => entry.patientId === iden );
    //     console.log("Inside....")
    //     this.state.setState(patientsHealth);
    // }

    render() {
        return (
            <div>
                <h2 className="text-center">Patients Diseases</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addPatientsDiseases}> Add Disease</button>
                </div>
                <div className="row">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Disease</th>
                                <th>Additional Information</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.patientsDiseases.map(
                                    patientsDiseases =>
                                    <tr key = {patientsDiseases.patientId}>
                                        <td> {patientsDiseases.disease} </td>
                                        <td> {patientsDiseases.additionalInfo} </td>
                                        <td>
                                        <button onClick={ () => this.viewPatientsDisease(patientsDiseases.patientId,patientsDiseases.disease,patientsDiseases.additionalInfo) } className="btn btn-info">View</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.editPatientsDiseases(patientsDiseases.patientId,patientsDiseases.disease,patientsDiseases.additionalInfo) } className="btn btn-info" >Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deletePatientsDiseases(patientsDiseases.patientId,patientsDiseases.disease) } className="btn btn-danger">Delete</button>
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
