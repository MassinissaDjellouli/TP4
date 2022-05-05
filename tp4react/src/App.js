import './App.css';
import { Employes } from './Components/PageServices/employes';
import { Users } from './Components/PageServices/users';
import { Home } from './Components/home'
import { Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react'
import { EmployeHome } from './Components/PageServices/EmployeeService/employeeHome';
import { MainHeader } from './Components/Headers/mainHeader';

function App() {
  const fetchEmployees = async () => {
    let request = await fetch("http://localhost:8080/employees")
    let data = await request.json();
    return data;
  }
  const [employees, setEmployes] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const emp = await fetchEmployees();
      setEmployes(emp);
    }
    getEmployees();
  }, [])
  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="users" element={<Users />}></Route>
        <Route path="employes" element={<Employes employes={employees} />}></Route>
        <Route path="employes/:id" element={<EmployeHome employes={employees} />}></Route>
        <Route path="23" element={<EmployeHome employes={employees} />}></Route>
      </Routes>


    </>
  );
}


export default App;

