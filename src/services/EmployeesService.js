import axios from 'axios';

const GET_EMPLOYEES_API_URL = "http://localhost:8085/employees/get_all/";
const EMPLOYEES_API_BASE_URL = "http://localhost:8085/employees/";

class EmployeesService{
    getEmployees(){
        return axios.get(GET_EMPLOYEES_API_URL);
    }
    getEmployeesSpecializationById(employeeId){
        return axios.get(EMPLOYEES_API_BASE_URL + 'specialization_get/' +employeeId);
    }
    createEmployees(employees){
        return axios.post(EMPLOYEES_API_BASE_URL+ 'employee_insert/', employees);
    }
    createEmployeesSpecialization(employeesSpecialization){
        return axios.post(EMPLOYEES_API_BASE_URL + 'specialization_insert/', employeesSpecialization);
    }
    updateEmployees(employees,employeeId){
        return axios.put(EMPLOYEES_API_BASE_URL + 'employee_update/'+employeeId, employees);
    }
    updateEmployeesSpecialization(employeesSpecialization, employeeId){
        return axios.put(EMPLOYEES_API_BASE_URL + 'specialization_update/'+employeeId, employeesSpecialization);
    }
    deleteEmployees(employeeId){
        return axios.delete(EMPLOYEES_API_BASE_URL + 'delete/' +employeeId);
    }
    deleteEmployeesSpecialization(employeeId,employeesSpecialization){
        console.log(EMPLOYEES_API_BASE_URL + 'specialization_delete/'+employeeId+employeesSpecialization);
        return axios.delete(EMPLOYEES_API_BASE_URL + 'specialization_delete/'+employeeId+','+employeesSpecialization);
    }
}

export default new EmployeesService()