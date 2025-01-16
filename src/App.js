import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Loader } from './Firebase/fetchData';
import Tostify from './Components/common/Tostify';
import CurrentUser from './Context/CurrentUser';
import RouterSetup from './RouterSetup/RouterSetup';


const App = () => {

  return (
    <>
      <Tostify />
      <CurrentUser>
        <Loader>
          <Router>
            <RouterSetup />
          </Router>
        </Loader>
      </CurrentUser>
    </>
  )
}

export default App
