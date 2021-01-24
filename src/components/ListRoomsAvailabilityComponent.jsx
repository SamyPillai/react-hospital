import React, { Component } from 'react'
import AdminService from '../services/AdminService'

export default class ListRoomsAvailabilityComponent extends Component {
    constructor(props){
        const roomsAvailability = [];
        super(props)
            this.state = {
                roomId: this.props.match.params.id,
                roomsAvailability: []
            }
            
        this.addRoomsAvaiability = this.addRoomsAvaiability.bind(this);
        this.editRoomsAvaiability = this.editRoomsAvaiability.bind(this);
        this.deleteRoomsAvaiability = this.deleteRoomsAvaiability.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    viewRoomsAvailability(id,date,time,available){
        this.props.history.push(`/view-availability/${id}`, {roomId: id, date: date, 
            time: time, available: available, title: "View Availability"});
    } 

    addRoomsAvaiability(){
        this.props.history.push(`/add-rooms-availability/${this.state.roomId}`);
    }

    editRoomsAvaiability(id,date,time,available){
        this.props.history.push(`/update-availability/${id}`, {roomId: id, date: date, 
            time: time, available: available, title: "Edit Availability"});
    }

    deleteRoomsAvaiability(id,date,time){
        AdminService.deleteRoomsAvailability(id,date,time).then( res=> {
            this.setState({roomsAvailability: this.state.roomsAvailability.filter(roomsAvailability => roomsAvailability.date != date)});
        });
    }

    componentDidMount(){ 
        AdminService.getRoomsAvailabilityById(this.state.roomId).then((res) => {    
            // var newData = this.state.roomsAvailability.concat([res.data]);        
            this.setState({ roomsAvailability: res.data });            
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Availability</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addRoomsAvaiability}> Add Availability</button>
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
                                this.state.roomsAvailability.map(roomsAvailability =>
                                    <tr key = {roomsAvailability.roomId}>
                                        <td> {roomsAvailability.date} </td>
                                        <td> {roomsAvailability.time} </td>
                                        <td> {roomsAvailability.available} </td>
                                        <td>
                                            <button onClick={ () => this.viewRoomsAvailability(roomsAvailability.roomId,roomsAvailability.date,roomsAvailability.time,roomsAvailability.available) } className="btn btn-info">View</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.editRoomsAvaiability(roomsAvailability.roomId,roomsAvailability.date,roomsAvailability.time,roomsAvailability.available) } className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteRoomsAvaiability(roomsAvailability.roomId,roomsAvailability.date,roomsAvailability.time) } className="btn btn-danger">Delete</button>
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
