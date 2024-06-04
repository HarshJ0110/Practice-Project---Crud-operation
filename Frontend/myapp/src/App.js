import './App.css';
import Home from './Components/Home';
import User from './Components/User';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false)

  return (
    <>
      <Home users={users} setUsers={setUsers} modal={modal} setModal={setModal}/>
      <User users={users} setUsers={setUsers} modal={modal} setModal={setModal}/>
    </>
  );
}

export default App;
