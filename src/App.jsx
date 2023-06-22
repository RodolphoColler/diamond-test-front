import { useState } from 'react';
import UserForm from './components/UserForm';
import SideBar from './components/SideBar';
import DepartmentForm from './components/DepartmentForm';
import './App.css'
import Departments from './components/Departments';
import Users from './components/Users';

function App() {
  const [switchPage, setSwitchPage] = useState(false);
  const [shouldRecallApi, setShouldRecallApi] = useState(false);

  return (
    <div className='project-wrapper'>
      <SideBar setSwitchPage={ setSwitchPage }/>
      <main>
        { 
          switchPage ? (
            <>
              <DepartmentForm  setShouldRecallApi={ setShouldRecallApi } />
              <Departments shouldRecallApi={ shouldRecallApi } />
            </>
          ) : (
            <>
              <UserForm setShouldRecallApi={ setShouldRecallApi } />
              <Users shouldRecallApi={ shouldRecallApi }/>
            </>
          ) 
        }
      </main>
    </div>
  )
}

export default App
