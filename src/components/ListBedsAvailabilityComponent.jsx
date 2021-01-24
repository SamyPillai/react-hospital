import React, { Component } from 'react'
import AdminService from '../services/AdminService'

export default class ListBedsAvailabilityComponent extends Component {
    constructor(props){
        const bedsAvailability = [];
        super(props)
            this.state = {
                bedId: this.props.match.params.id,
                bedsAvailability: []
            }
            
        this.addBedsAvaiability = this.addBedsAvaiability.bind(this);
        this.editBedsAvaiability = this.editBedsAvaiability.bind(this);
        this.deleteBedsAvaiability = this.deleteBedsAvaiability.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    viewBedsAvailability(id,date,time,available){
        this.props.history.push(`/view-availability/${id}`, {bedId: id, date: date, 
            time: time, available: available, title: "View Availability"});
    } 

    addBedsAvaiability(){
        this.props.history.push(`/add-beds-availability/${this.state.bedId}`);
    }

    editBedsAvaiability(id,date,time,available){
        this.props.history.push(`/update-beds-availability/${id}`, {bedId: id, date: date, 
            time: time, available: available, title: "Edit Availability"});
    }

    deleteBedsAvaiability(id,date,time){
        AdminService.deleteBedsAvailability(id,date,time).then( res=> {
            this.setState({bedsAvailability: this.state.bedsAvailability.filter(bedsAvailability => bedsAvailability.date != date)});
        });
    }

    componentDidMount(){ 
        AdminService.getBedsAvailabilityById(this.state.bedId).then((res) => {    
            this.setState({ bedsAvailability: res.data });            
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Availability</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addBedsAvaiability}> Add Availability</button>
                </div>
                <div className="row">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Available</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.bedsAvailability.map(bedsAvailability =>
                                    <tr key = {bedsAvailability.bedId}>
                                        <td> {bedsAvailability.date} </td>
                                        <td> {bedsAvailability.time} </td>
                                        <td> {bedsAvailability.available} </td>
                                        <td>
                                            <button onClick={ () => this.viewBedsAvailability(bedsAvailability.bedId,bedsAvailability.date,bedsAvailability.time,bedsAvailability.available) } className="btn btn-info">View</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.editBedsAvaiability(bedsAvailability.bedId,bedsAvailability.date,bedsAvailability.time,bedsAvailability.available) } className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBedsAvaiability(bedsAvailability.bedId,bedsAvailability.date,bedsAvailability.time) } className="btn btn-danger">Delete</button>
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
