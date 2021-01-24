import React, { Component } from 'react'
import PatientsService from '../services/PatientsService';

export default class ListPatientsHealth extends Component {
    constructor(props){
        const patientsHealth = [];
        super(props)
            this.state = {
                patientId: this.props.match.params.id,
                selectedRowIndex: [],
                patientsHealth: []
            }
            
        this.addPatientsHealth = this.addPatientsHealth.bind(this);
        this.editPatientsHealth = this.editPatientsHealth.bind(this);
        this.deletePatientsHealth = this.deletePatientsHealth.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    viewPatientsHealth(id,symptoms,date,time,additionalInfo){
        this.props.history.push(`/view-health/${id}`, {patientId: id, symptoms: symptoms, 
            date: date, time: time, additionalInfo: additionalInfo, title: "View Patients Health"});
    }   

    addPatientsHealth(){
        this.props.history.push(`/add-patients-health/${this.state.patientId}`);
    }

    editPatientsHealth(id,symptoms,date,time,additionalInfo){
        this.props.history.push(`/update-patients-health/${id}`, { patientId: id, symptoms: symptoms, 
            date: date, time: time, additionalInfo: additionalInfo, title: "Update Patients Health"});
    }

    deletePatientsHealth(id,symptoms,date){
        console.log("Symptom is:" +id+symptoms+date);
        PatientsService.deletePatientsHealth(id,symptoms,date).then( res=> {
            this.setState({patientsHealth: this.state.patientsHealth.filter(patientHealth => (patientHealth.patientId != id && patientHealth.symptoms != symptoms && patientHealth.date != date))});
        });
    }

    componentDidMount(){ 
        console.log("Patient Id in Health:"+this.state.patientId );
        PatientsService.getPatientsHealthById(this.state.patientId).then((res) => {
            console.log(res.data);            
            this.setState({ patientsHealth: res.data });
        });
    }

    handleEmpty(patientsHealth,iden) {
        patientsHealth.filter((entry) => entry.patientId === iden );
        console.log("Inside....")
        this.state.setState(patientsHealth);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Patients Health</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addPatientsHealth}> Add Health</button>
                </div>
                <div className="row">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Symptoms</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Additional Information</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.patientsHealth.map(
                                    patientsHealth =>
                                    <tr key = {patientsHealth.patientId}>
                                        <td> {patientsHealth.symptoms} </td>
                                        <td> {patientsHealth.date} </td>
                                        <td> {patientsHealth.time} </td>
                                        <td> {patientsHealth.additionalInfo} </td>
                                        <td>
                                            <button onClick={ () => this.viewPatientsHealth(patientsHealth.patientId,patientsHealth.symptoms,patientsHealth.date,patientsHealth.time,patientsHealth.additionalInfo) } className="btn btn-info">View</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.editPatientsHealth(patientsHealth.patientId,patientsHealth.symptoms,patientsHealth.date,patientsHealth.time,patientsHealth.additionalInfo) } className="btn btn-info" >Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deletePatientsHealth(patientsHealth.patientId,patientsHealth.symptoms,patientsHealth.date) } className="btn btn-danger">Delete</button>
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
