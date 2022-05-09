import './App.css';
import { Employes } from './Components/PageServices/employes'; 
import { Users } from './Components/PageServices/users';
import { Home } from './Components/home'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { EmployeHome } from './Components/PageServices/EmployeeService/employeeHome';
import { MainHeader } from './Components/Headers/mainHeader';
import { UserHome } from './Components/PageServices/UserService/userHome';
import { NewUser } from './Components/PageServices/UserService/NewUser/newUser';
import { useNavigate } from 'react-router-dom';
import { Emprunt } from './Components/PageServices/UserService/Emprunts/emprunt';
import { Retour } from './Components/PageServices/UserService/Retours/retours';

function App() {
  const [employees, setEmployes] = useState([]);
  const [users, setUsers] = useState([]);

  let navigate = useNavigate();


  const submitNewUser = async (client) => {
    let request = await fetch("http://localhost:8080/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(client)
    })
    if (request.ok) {
      navigate("/users")
      getUsers();
    } else {
      const errorJson = await request.json()
      const errors = errorJson.errors;
      console.log(errors)
    }
  }

  const getUser = (clientNumber) =>{
    let user;
    users.map((client) => {
      if (client.clientNumber == clientNumber)
        user = client;
    })
    return user;
  }
  const getRequest = async (path) => {
    let request = await fetch("http://localhost:8080" + path)
    let data = await request.json();
    return data;
  }

  const getEmployees = async () => {
    const emp = await getRequest("/employees");
    setEmployes(emp);
  }
  const getUsers = async () => {
    const users = await getRequest("/users")
    setUsers(users);
  }
  useEffect(() => {
    getEmployees();
    getUsers();
  }, [])

  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="users" element={<Users users={users} />}></Route>
        <Route path="users/:id" element={<UserHome getUser={getUser} />}></Route>
        <Route path="users/:id/emprunter" element={<Emprunt getUser={getUser} />}></Route>
        <Route path="users/:id/retourner" element={<Retour getUser={getUser}/>}></Route>
        <Route path="employes" element={<Employes employes={employees} />}></Route>
        <Route path="employes/:id" element={<EmployeHome employes={employees} />}></Route>
        <Route path="newUser" element={<NewUser submit={submitNewUser} />}></Route>
      </Routes>
    </>
  );
}


export default App;

