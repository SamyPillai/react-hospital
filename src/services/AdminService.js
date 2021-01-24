import axios from 'axios';

const GET_ADMINS_API_URL = "http://localhost:8083/admin/get_all/";
const ADMINS_API_BASE_URL = "http://localhost:8083/admin/";

class AdminService{
    getRooms(){
        return axios.get(GET_ADMINS_API_URL);
    }
    getBeds(roomId){
        console.log("Room ID is : ", roomId);
        return axios.get(ADMINS_API_BASE_URL + 'beds_get/'+roomId);
    }
    getRoomsAvailabilityById(roomId){
        console.log(ADMINS_API_BASE_URL + 'availability_get/'+roomId);
        return axios.get(ADMINS_API_BASE_URL + 'availability_get/'+roomId);
    }
    getBedsAvailabilityById(bedId){
        console.log(ADMINS_API_BASE_URL + 'beds_avail_get/'+bedId);
        return axios.get(ADMINS_API_BASE_URL + 'beds_avail_get/'+bedId);
    }
    createRooms(rooms){
        return axios.post(ADMINS_API_BASE_URL + 'rooms_insert/',rooms);
    }
    createBeds(beds){
        console.log("Path is : ",ADMINS_API_BASE_URL + 'beds_insert/');
        return axios.post(ADMINS_API_BASE_URL + 'beds_insert/',beds);
    }
    createRoomsAvailability(roomsAvailability){
        console.log(ADMINS_API_BASE_URL + 'availability_insert/',roomsAvailability);
        return axios.post(ADMINS_API_BASE_URL + 'availability_insert/',roomsAvailability);
    }
    createBedsAvailability(bedsAvailability){
        console.log(ADMINS_API_BASE_URL + 'beds_avail_insert/',bedsAvailability);
        return axios.post(ADMINS_API_BASE_URL + 'beds_avail_insert/',bedsAvailability);
    }
    updateRooms(rooms,roomId){
        return axios.put(ADMINS_API_BASE_URL + 'rooms_update/'+roomId,rooms);
    }
    updateBeds(beds,bedId){
        console.log(ADMINS_API_BASE_URL + 'beds_update/'+bedId);
        return axios.put(ADMINS_API_BASE_URL + 'beds_update/'+bedId,beds);
    }
    updateRoomsAvailability(roomsAvailability,roomId){
        return axios.put(ADMINS_API_BASE_URL + 'availability_update/'+roomId,roomsAvailability);
    }
    updateBedsAvailability(bedsAvailability,bedId){
        return axios.put(ADMINS_API_BASE_URL + 'beds_avail_update/'+bedId,bedsAvailability);
    }
    deleteRoomsAvailability(roomId,date,time){
        console.log(ADMINS_API_BASE_URL + 'rooms_avail_delete/'+roomId+ ','+date+','+time);
        return axios.delete(ADMINS_API_BASE_URL + 'rooms_avail_delete/'+roomId+ ','+date+','+time);
    }
    deleteBedsAvailability(bedId,date,time){
        console.log(ADMINS_API_BASE_URL + 'beds_avail_delete/'+bedId+ ','+date+','+time);
        return axios.delete(ADMINS_API_BASE_URL + 'beds_avail_delete/'+bedId+ ','+date+','+time);
    }
    deleteRooms(roomId){
        return axios.delete(ADMINS_API_BASE_URL + 'rooms_delete/' +roomId);
    }
    deleteBeds(bedId){
        return axios.delete(ADMINS_API_BASE_URL + 'bed_delete/' +bedId);
    }
}

export default new AdminService()