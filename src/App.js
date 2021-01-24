import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Tabs,Tab,TabList,TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListPatientsComponent from './components/ListPatientsComponent'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreatePatientsComponent from './components/CreatePatientsComponent';
import UpdatePatientsComponent from './components/UpdatePatientsComponent';
import ListPatientsHealthComponent from './components/ListPatientsHealthComponent';
import CreatePatientsHealthComponent from './components/CreatePatientsHealthComponent';
import CreatePatientsDiseaseComponent from './components/CreatePatientsDiseaseComponent';
import ListPatientsDiseasesComponent from './components/ListPatientsDiseasesComponent';
import ListEmployeesComponent from './components/ListEmployeesComponent';
import CreateEmployeesComponent from './components/CreateEmployeesComponent';
import CreateBedsComponent from './components/CreateBedsComponent';
import ListEmployeesSpecializationComponent from './components/ListEmployeesSpecializationComponent';
import CreateEmployeesSpecializationComponent from './components/CreateEmployeesSpecializationComponent';
import ListRoomsComponent from './components/ListRoomsComponent';
import ListBedsComponent from './components/ListBedsComponent';
import ListRoomsAvailabilityComponent from './components/ListRoomsAvailabilityComponent';
import ListBedsAvailabilityComponent from './components/ListBedsAvailabilityComponent';
import CreateRoomsComponent from './components/CreateRoomsComponent';
import CreateRoomsAvailabilityComponent from './components/CreateRoomsAvailabilityComponent';
import CreateBedsAvailabilityComponent from './components/CreateBedsAvailabilityComponent';

export default function App() {
  const [value,setValue] = React.useState(0)
  const handleTabs=(e,val)=>{
    console.warn(val)
    setValue(val)
  }

  return (
    <div>
      <Router>
            <HeaderComponent></HeaderComponent>
              <div className="container"> 
                <Tabs>
                  <TabList>
                    <Tab>
                      Patients
                    </Tab>

                    <Tab>
                      Admin
                    </Tab>

                    <Tab>
                      Employees
                    </Tab>
                  </TabList>
                  
                  <TabPanel>  
                  <Switch>
                  <Route path="/" exact component={ListPatientsComponent}></Route>                  
                  <Route path="/patients" exact component={ListPatientsComponent}></Route>
                  <Route path="/add-patients" exact component={CreatePatientsComponent}></Route>
                  <Route path="/view-patients/:id" exact component={UpdatePatientsComponent}></Route>
                  <Route path="/view-patients-health/:id" exact component={ListPatientsHealthComponent}></Route>
                  <Route path="/view-patients-diseases/:id" exact component={ListPatientsDiseasesComponent}></Route>
                  <Route path="/add-patients-health/:id" exact component={CreatePatientsHealthComponent}></Route>
                  <Route path="/view-health/:id" exact component={CreatePatientsHealthComponent}></Route>
                  <Route path="/update-patients-health/:id" exact component={CreatePatientsHealthComponent}></Route>
                  <Route path="/view-diseases/:id" exact component={CreatePatientsDiseaseComponent}></Route>
                  <Route path="/add-patients-diseases/:id" exact component={CreatePatientsDiseaseComponent}></Route>
                  <Route path="/update-patients-diseases/:id" exact component={CreatePatientsDiseaseComponent}></Route>
                  <Route path="/update-patients/:id" exact component={UpdatePatientsComponent}></Route>
                  </Switch>
                  </TabPanel>

                  <TabPanel>  
                  <Switch>
                  <Route path="/" exact component={ListRoomsComponent}></Route>             
                  <Route path="/rooms" exact component={ListRoomsComponent}></Route>
                  <Route path="/add-rooms" exact component={CreateRoomsComponent}></Route>
                  <Route path="/add-beds" exact component={CreateBedsComponent}></Route>
                  <Route path="/view-rooms/:id" exact component={CreateRoomsComponent}></Route>
                  <Route path="/view-beds/:id" exact component={ListBedsComponent}></Route>
                  <Route path="/view-rooms-availability/:id" exact component={ListRoomsAvailabilityComponent}></Route>
                  <Route path="/view-beds-availability/:id" exact component={ListBedsAvailabilityComponent}></Route>
                  <Route path="/add-rooms-availability/:id" exact component={CreateRoomsAvailabilityComponent}></Route>
                  <Route path="/add-beds-availability/:id" exact component={CreateBedsAvailabilityComponent}></Route>
                  <Route path="/view-availability/:id" exact component={CreateRoomsAvailabilityComponent}></Route>
                  <Route path="/update-availability/:id" exact component={CreateRoomsAvailabilityComponent}></Route>
                  <Route path="/update-beds-availability/:id" exact component={CreateBedsAvailabilityComponent}></Route>
                  <Route path="/update-rooms/:id" exact component={CreateRoomsComponent}></Route>
                  <Route path="/update-bed/:id" exact component={CreateBedsComponent}></Route>
                  <Route path="/view-bed/:id" exact component={CreateBedsComponent}></Route>
                  </Switch>
                  </TabPanel>
                  
                  <TabPanel>  
                  <Switch>
                  <Route path="/" exact component={ListEmployeesComponent}></Route>             
                  <Route path="/employees" exact component={ListEmployeesComponent}></Route>
                  <Route path="/view-employees/:id" exact component={CreateEmployeesComponent}></Route>
                  <Route path="/view-employees-specialization/:id" exact component={ListEmployeesSpecializationComponent}></Route>
                  <Route path="/view-specialization/:id" exact component={CreateEmployeesSpecializationComponent}></Route>
                  <Route path="/add-employees" exact component={CreateEmployeesComponent}></Route>
                  <Route path="/add-employees-specialization/:id" exact component={CreateEmployeesSpecializationComponent}></Route>
                  <Route path="/update-employees-specialization/:id" exact component={CreateEmployeesSpecializationComponent}></Route>
                  <Route path="/update-employees/:id" exact component={CreateEmployeesComponent}></Route>
                  </Switch>
                  </TabPanel>

                </Tabs>
              </div>
            <FooterComponent></FooterComponent>
      </Router>
    </div>
  );
  
}

