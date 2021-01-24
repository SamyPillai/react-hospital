import React, { Component } from 'react'
import AdminService from '../services/AdminService'

export default class ListBedsComponent extends Component {
    constructor(props){
        const beds = [];
        super(props)
            this.state = {
                roomId: this.props.match.params.id,
                roomNumber: '',
                beds: []
            }
            
        this.addBeds = this.addBeds.bind(this);
        this.editBeds = this.editBeds.bind(this);
        this.deleteBeds = this.deleteBeds.bind(this);
    }

    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
      }

    addBeds(){
        console.log("Going from Create : ", this.state.beds);
        this.props.history.push('/add-beds',{beds: this.state.beds, roomId: this.state.roomId, roomNumber: this.state.roomNumber,});
    }

    editBeds(id,roomId,bedNumber){
        this.props.history.push(`/update-bed/${id}`,{ beds: this.state.beds, bedId: id, roomId: roomId, roomNumber: this.state.roomNumber,
            bedNumber: bedNumber, title: "Update Beds"});
    }

    viewBeds(id,roomId,bedNumber){
        this.props.history.push(`/view-bed/${id}`, { bedId: id, roomId: roomId,roomNumber: this.state.roomNumber, 
            bedNumber: bedNumber, title: "View Beds"});
    }

    deleteBeds(id){
        AdminService.deleteBeds(id).then( res=> {
            this.setState({beds: this.state.beds.filter(beds => beds.bedId !== id)});
        });
    }

    componentDidMount(){ 
        AdminService.getBeds(this.state.roomId).then((res) => {
            console.log(res.data);            
            this.setState({ beds: res.data, roomNumber: this.props.location.state.roomNumber});
        });
        // console.log("Inside Mount : ",this.props.location.state.roomNumber);
    }

    render() {
                
        return (
                    <div>
                        <h2 className="text-center">Beds List</h2>
                        <div className="row">
                            <button className="btn btn-primary" onClick={this.addBeds}> Add Beds</button>
                        </div>
                        <div className="row">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Room</th>
                                        <th>Bed</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.beds.map(
                                            beds =>
                                            <tr key = {beds.bedId}>
                                                <td> {this.state.roomNumber} </td>
                                                <td> {beds.bedNumber} </td>
                                                <td>
                                                    <button onClick={ () => this.viewBeds(beds.bedId,beds.roomId,beds.bedNumber) } className="btn btn-info">View</button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.editBeds(beds.bedId,beds.roomId,beds.bedNumber) } className="btn btn-info">Update</button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBeds(beds.bedId) } className="btn btn-danger">Delete</button>
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
