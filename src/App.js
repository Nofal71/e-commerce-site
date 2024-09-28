import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Loader } from './Firebase/fetchData';
import Tostify from './Components/common/Tostify';
import CurrentUser from './Context/CurrentUser';
import RouterSetup from './RouterSetup/RouterSetup';


const App = () => {

  return (
    <>
      <Tostify />
      <Provider store={store}>
        <CurrentUser>
          <Loader>
            <Router>
              <RouterSetup />
            </Router>
          </Loader>
        </CurrentUser>
      </Provider>
    </>
  )
}

export default App
