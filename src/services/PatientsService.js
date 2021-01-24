import axios from 'axios';

const GET_PATIENTS_API_URL = "http://localhost:8082/patients/get_all/";
const PATIENTS_API_BASE_URL = "http://localhost:8082/patients/";
// /health_get/{id}
class PatientsService{
    getPatients(){
        return axios.get(GET_PATIENTS_API_URL);
    }

    createPatients(patients){
        return axios.post(PATIENTS_API_BASE_URL, patients);
    }

    createPatientsHealth(patientsHealth){
        return axios.post(PATIENTS_API_BASE_URL + 'health_insert/', patientsHealth);
    }

    updatePatientsHealth(patientsHealth, patientsId){
        return axios.put(PATIENTS_API_BASE_URL + 'health_update/'+patientsId, patientsHealth);
    }

    updatePatientsDisease(patientsDisease, patientsId){
        return axios.put(PATIENTS_API_BASE_URL + 'disease_update/'+patientsId, patientsDisease);
    }

    deletePatientsHealth(patientsId,symptoms,date){
        console.log(PATIENTS_API_BASE_URL + 'health_delete/'+patientsId+symptoms+date);
        return axios.delete(PATIENTS_API_BASE_URL + 'health_delete/'+patientsId+','+symptoms+','+date);
    }

    deletePatientsDiseases(patientsId,disease){
        console.log(PATIENTS_API_BASE_URL + 'disease_delete/'+patientsId+disease);
        return axios.delete(PATIENTS_API_BASE_URL + 'disease_delete/'+patientsId+','+disease);
    }

    getPatientsById(patientsId){
        return axios.get(PATIENTS_API_BASE_URL + patientsId);
    }

    getPatientsDiseasesById(patientsId){
        return axios.get(PATIENTS_API_BASE_URL + 'disease_get/' +patientsId);
    }

    createPatientsDisease(patientsDisease){
        return axios.post(PATIENTS_API_BASE_URL + 'disease_insert/', patientsDisease);
    }

    getPatientsHealthById(patientsId){
        console.log(PATIENTS_API_BASE_URL + 'health_get/' +patientsId);
        return axios.get(PATIENTS_API_BASE_URL + 'health_get/' +patientsId);
    }

    updatePatients(patients, patientsId){
        return axios.put(PATIENTS_API_BASE_URL + patientsId, patients);
    }

    deletePatients(patientsId){
        return axios.delete(PATIENTS_API_BASE_URL + 'delete/' +patientsId);
    }
}

export default new PatientsService()