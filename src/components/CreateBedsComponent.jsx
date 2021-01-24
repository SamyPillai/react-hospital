import React, { Component } from 'react'
import AdminService from '../services/AdminService';

export default class CreateBedsComponent extends Component {
    constructor(props){
        const beds = [];
        super(props)
        this.state = {
            beds: [],
            bedId: '',
            roomId: this.props.location.state.roomId,//this.props.match.params.id,
            roomNumber: '',
            bedNumber: '',
            isDisabled: false,
            isHidden: false,
            readOnly: false,
            bedNumberError: '',
            title: 'Add Beds'
        }
        this.changeBedNumberHandler = this.changeBedNumberHandler.bind(this);
        this.saveBeds = this.saveBeds.bind(this);
    }

    validate = () => {
        let bedNumberError = "";

        if(this.state.bedNumber == "")
        {
            bedNumberError = "Enter a Bed";
        }else if(this.state.bedNumber != "")
        {
            const index = this.state.beds.findIndex((beds)=>{
            return (beds.roomId == this.state.roomId && beds.bedNumber == this.state.bedNumber)
        });
            console.log("The Index is : ", index);
            console.log("Beds are : ", this.state.beds);
            console.log("The Room & Bed are : ", this.state.roomId, this.state.bedNumber);
            if(index != -1){
                bedNumberError = "Bed Number "+this.state.bedNumber+" already exists";
            }else{
                bedNumberError = "";
                this.setState({bedNumberError});
            }
        }
        else{
            bedNumberError = "";
            this.setState({bedNumberError});
        }

        if(bedNumberError){
            this.setState({bedNumberError});
            return false;
        }

        return true;

    }

    saveBeds = (e) => {
        e.preventDefault();
        let bed = {
        bedId: this.props.match.params.id,
        roomId: this.state.roomId,
        bedNumber: this.state.bedNumber};

        console.log("Bed is :", bed);    

        const isValid = this.validate();

        if(isValid)
        {
            var currentLocation = window.location.pathname;
            if (currentLocation.substring(1,9) == 'add-beds')
            {
                AdminService.createBeds(bed).then(res =>{
                    this.props.history.push(`/view-beds/${this.state.roomId}`);
                });
            }
            else    
            {
                console.log("Bed is: ", bed);
                console.log("Bed ID is:",this.state.bedId); 
                AdminService.updateBeds(bed,this.state.bedId).then(res =>{
                    this.props.history.push(`/view-beds/${this.state.roomId}`);
                });
            }
        }    
    }

    cancel(){
        this.props.history.push(`/view-beds/${this.state.roomId}`);
    }

    viewBedsAvailability(id){        
        console.log("Listing Rooms Availability :", id);
        this.props.history.push(`/view-beds-availability/${id}`);
    }

    viewBeds(id){        
        this.props.history.push(`/view-beds/${id}`);
    }

    changeBedNumberHandler=(event) => {
        this.setState({bedNumber: event.target.value});
    }    

    componentDidMount(){ 
        var currentLocation = window.location.pathname;
        if (currentLocation.substring(1,9) == 'add-beds')
        {
            console.log("RoomID is :",this.props.location.state.roomId);
            this.setState({roomId: this.props.location.state.roomId, beds: this.props.location.state.beds, roomNumber: this.props.location.state.roomNumber});
            console.log("RoomID inside Mount:", this.state.roomId);
            return;
        } else if (currentLocation.substring(1,9) == 'view-bed')
        {
            console.log("Its inside View..");
            this.setState(this.props.location.state);
            this.setState({
                roomId: this.props.location.state.roomId,
                roomNumber: this.props.location.state.roomNumber,
                isDisabled: true,
                isHidden: true,
                title:'View Beds'
            })
        }
        else
        {
            console.log("Updating....");
            this.setState(this.props.location.state);
            this.setState({
                roomId: this.props.location.state.roomId,
                roomNumber: this.props.location.state.roomNumber,
                readOnly: true,
            })
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-2">
                            <button class="btn btn-success" onClick={ () => this.viewBedsAvailability(this.state.bedId) }
                            style={{height : '40px', width : '100px'}}> Availability </button>
                            </div>
                            <div class="form-group col-md-4">
                            <h1 style={{textAlign: 'center'}}> {this.state.title} </h1>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-2">
                            <label>Room</label>
                            <input type="text" placeholder="Room" name="room" className="form-control" id="room"
                            style={{height : '35px'}} readOnly={this.state.readOnly} disabled={this.state.isDisabled}
                            value={this.state.roomNumber}/>
                            </div>
                            <div class="form-group col-md-2">
                            <label>Bed</label>
                            <input type="text" placeholder="Bed" name="bed" className="form-control" id="bed"
                            style={{height : '35px'}} disabled={this.state.isDisabled}
                            value={this.state.bedNumber} onChange={this.changeBedNumberHandler}/>
                            {this.state.bedNumberError ? (<div style={{ fontSize:12, color:'red' }}>
                                {this.state.bedNumberError}</div>):null}
                            </div>
                        </div> 
                        <div class="form-row">
                        <div class="form-group col-md-2">
                        <button className="btn btn-success" onClick={this.saveBeds} disabled={this.state.isDisabled}
                        hidden={this.state.isHidden}
                        style={{height : '40px', width : '100px', marginLeft : '350px'}}>Save</button>
                        </div>
                        <div class="form-group col-md-2">
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} disabled={this.state.isDisabled}
                        hidden={this.state.isHidden} disabled={this.state.isDisabled}
                        style={{height : '40px', width : '100px', marginLeft : '300px'}}>Cancel</button>
                        </div>
                        </div>
                    </form>
                </div>                
            </div>
        )
    }
    
}
