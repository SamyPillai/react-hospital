import React, { Component } from 'react'
import AdminService from '../services/AdminService';

export default class CreateRoomsComponent extends Component {
    constructor(props){
        const room_entries = [];
        super(props)
        this.state = {
            room_entries: [],
            roomId: this.props.match.params.id,
            floorNumber: '',
            roomNumber: '',
            roomType: '',            
            charges: '',
            isDisabled: false,
            isHidden: false,
            readOnly: false,
            floorNumberError: '',
            roomNumberError: '',
            roomTypeError: '',
            chargesError: '',
            title: 'Add Rooms'
        }
        this.changeRoomTypeHandler = this.changeRoomTypeHandler.bind(this);
        this.changeFloorNumberHandler = this.changeFloorNumberHandler.bind(this);
        this.changeRoomNumberHandler = this.changeRoomNumberHandler.bind(this);
        this.changeChargesHandler = this.changeChargesHandler.bind(this);
        this.saveRooms = this.saveRooms.bind(this);
    }

    validate = () => {
        let floorNumberError = "";
        let roomTypeError = "";
        let roomNumberError = "";
        let chargesError = "";

        console.log("Floor Number",this.state.floorNumber);

        if(this.state.floorNumber == "")
        {
            floorNumberError = "Enter a Floor";
        }
        else{
            floorNumberError = "";
            this.setState({floorNumberError});
        }

        if(this.state.roomNumber == "")
        {
            roomNumberError = "Enter a Room";
        }else if(this.state.roomNumber != "")
        {
            const index = this.state.room_entries.findIndex((room)=>{
            return (room.floorNumber == this.state.floorNumber && room.roomNumber == this.state.roomNumber)
        });
            if(index != -1){
                roomNumberError = "Room Number "+this.state.roomNumber+" already exists";
            }else{
                roomNumberError = "";
                this.setState({roomNumberError});
            }
        }
        else{
            roomNumberError = "";
            this.setState({roomNumberError});
        }

        if(this.state.roomType == "")
        {
            roomTypeError = "Enter a Type";
        }else{
            roomTypeError = "";
            this.setState({roomTypeError});
        }

        if(this.state.charges == "")
        {
            chargesError = "Enter the Charges";
        }else{
            chargesError = "";
            this.setState({chargesError});
        }

        if(floorNumberError){
            this.setState({floorNumberError});
            return false;
        }

        if(roomNumberError){
            this.setState({roomNumberError});
            return false;
        }

        if(roomTypeError){
            this.setState({roomTypeError});
            return false;
        }

        if(chargesError){
            this.setState({chargesError});
            return false;
        }

        return true;

    }

    saveRooms = (e) => {
        e.preventDefault();
        let rooms = {
        roomId: this.props.match.params.id,
        floorNumber: this.state.floorNumber,
        roomNumber: this.state.roomNumber,
        roomType: this.state.roomType,
        charges: this.state.charges};

        const isValid = this.validate();

        console.log("Room Data is :",rooms);    

        if(isValid)
        {
            var currentLocation = window.location.pathname;
            if (currentLocation.substring(1,10) == 'add-rooms')
            {
                console.log("Patients is : " +JSON.stringify(rooms));
                AdminService.createRooms(rooms).then(res =>{
                    this.props.history.push('/rooms');
                });
            }
            else    
            {
                console.log("Saving the Rooms", this.state);
                AdminService.updateRooms(rooms, this.state.roomId).then(res =>{
                    this.props.history.push('/rooms');
                });
            }
        }    
    }

    viewRoomsAvailability(id){        
        console.log("Listing Rooms Availability :", id);
        this.props.history.push(`/view-rooms-availability/${id}`);
    }

    viewBeds(id,roomNumber){        
        this.props.history.push(`/view-beds/${id}`,{ roomNumber: roomNumber});
    }

    cancel(){
        this.props.history.push(`/view-rooms/${this.state.roomId}`);
    }

    changeRoomTypeHandler=(event) => {
        this.setState({roomType: event.target.value});
    }    
    changeFloorNumberHandler=(event) => {
        this.setState({floorNumber: event.target.value});
    }    
    changeRoomNumberHandler=(event) => {
        this.setState({roomNumber: event.target.value});
    }
    changeChargesHandler=(event) => {
        this.setState({charges: event.target.value});
    }    

    componentDidMount(){ 
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,10) == 'add-rooms')
        {
            console.log("Its inside Create");
            this.setState({room_entries:this.props.location.state.room_entries});
            return;
        } else if (currentLocation.substring(1,11) == 'view-rooms')
        {
            console.log("Its inside View..");
            this.setState(this.props.location.state);
            this.setState({
                roomId: this.props.match.params.id,
                isDisabled: true,
                isHidden: true,
                title:'View Rooms'
            })
        }
        else
        {
            console.log("Updating....");
            this.setState({
                readOnly: true,
            })
            this.setState(this.props.location.state);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-1.5">
                            <button class="btn btn-success" onClick={ () => this.viewRoomsAvailability(this.state.roomId) }
                            style={{height : '40px', width : '100px'}}> Availability </button>
                            </div>
                            <div class="form-group col-md-2">
                            <button class="btn btn-success" onClick={ () => this.viewBeds(this.state.roomId,this.state.roomNumber) }
                            style={{height : '40px', width : '60px'}}> Beds </button>
                            </div>
                            <div class="form-group col-md-4">
                            <h1 style={{textAlign: 'center'}}> {this.state.title} </h1>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-2">
                            <label>Floor</label>
                            <input type="text" placeholder="Floor" name="floor" className="form-control" id="floor"
                            style={{height : '35px'}} disabled={this.state.isDisabled} readOnly={this.state.readOnly}
                            value={this.state.floorNumber} onChange={this.changeFloorNumberHandler}/>
                            {this.state.floorNumberError ? (<div style={{ fontSize:12, color:'red' }}>
                                {this.state.floorNumberError}</div>):null}
                            </div>
                            <div class="form-group col-md-2">
                            <label>Room</label>
                            <input type="text" placeholder="Room" name="room" className="form-control" id="room"
                            style={{height : '35px'}} disabled={this.state.isDisabled} readOnly={this.state.readOnly}
                            value={this.state.roomNumber} onChange={this.changeRoomNumberHandler}/>
                            {this.state.roomNumberError ? (<div style={{ fontSize:12, color:'red' }}>
                                {this.state.roomNumberError}</div>):null}
                            </div>
                            <div class="form-group col-md-6">
                            <label>Type</label>
                            <select placeholder="Type" name="type" className="form-control" id="type"
                            style={{height : '35px'}} disabled={this.state.isDisabled}
                            value={this.state.roomType} onChange={this.changeRoomTypeHandler}>
                            <option value="Semi-Deluxe">Semi-Deluxe</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="General">General</option>
                            <option value="Special">Special</option>
                            </select>
                            {this.state.roomTypeError ? (<div style={{ fontSize:12, color:'red' }}>
                                {this.state.roomTypeError}</div>):null}
                            </div>
                            <div class="form-group col-md-2">
                            <label>Charges</label>
                            <input type="number" placeholder="Charges" name="charges" className="form-control" id="charges"
                            style={{height : '35px'}} disabled={this.state.isDisabled}
                            value={this.state.charges} onChange={this.changeChargesHandler}/>
                            {this.state.chargesError ? (<div style={{ fontSize:12, color:'red' }}>
                                {this.state.chargesError}</div>):null}
                            </div>
                        </div> 
                        <div class="form-row">
                        <div class="form-group col-md-2">
                        <button className="btn btn-success" onClick={this.saveRooms} disabled={this.state.isDisabled}
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
