import React, { Component } from 'react'
import AdminService from '../services/AdminService'

export default class ListRoomsComponents extends Component {
    constructor(props){
        const rooms = [];
        super(props)
            this.state = {
                rooms: []
            }
            
        this.addRooms = this.addRooms.bind(this);
        this.editRooms = this.editRooms.bind(this);
        this.deleteRooms = this.deleteRooms.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    addRooms(){
        this.props.history.push('/add-rooms',{room_entries: this.state.rooms});
    }

    editRooms(id,floorNumber,roomNumber,roomType,charges){
        this.props.history.push(`/update-rooms/${id}`,{ roomId: id, floorNumber: floorNumber, 
            roomNumber: roomNumber, roomType: roomType, charges: charges , title: "Update Rooms"});
    }

    viewRooms(id,floorNumber,roomNumber,roomType,charges){
        this.props.history.push(`/view-rooms/${id}`, {roomId: id, floorNumber: floorNumber, 
            roomNumber: roomNumber, roomType: roomType , charges: charges, title: "View Rooms"});
    }

    deleteRooms(id){
        AdminService.deleteRooms(id).then( res=> {
            this.setState({rooms: this.state.rooms.filter(room => room.roomId !== id)});
        });
    }

    componentDidMount(){ 
        AdminService.getRooms().then((res) => {
            console.log(res.data);            
            this.setState({ rooms: res.data });
        });
    }

    render() {
                
        return (
                    <div>
                        <h2 className="text-center">Rooms List</h2>
                        <div className="row">
                            <button className="btn btn-primary" onClick={this.addRooms}> Add Rooms</button>
                        </div>
                        <div className="row">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Floor</th>
                                        <th>Room</th>
                                        <th>Type</th>
                                        <th>Charges</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.rooms.map(
                                            rooms =>
                                            <tr key = {rooms.roomId}>
                                                <td> {rooms.floorNumber} </td>
                                                <td> {rooms.roomNumber} </td>
                                                <td> {rooms.roomType} </td>
                                                <td> {rooms.charges} </td>
                                                <td>
                                                    <button onClick={ () => this.viewRooms(rooms.roomId,rooms.floorNumber,rooms.roomNumber,rooms.roomType,rooms.charges) } className="btn btn-info">View</button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.editRooms(rooms.roomId,rooms.floorNumber,rooms.roomNumber,rooms.roomType,rooms.charges) } className="btn btn-info">Update</button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteRooms(rooms.roomId) } className="btn btn-danger">Delete</button>
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
