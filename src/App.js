import React from 'react'
import RouterSetup from './Pages/RouterSetup/RouterSetup'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Loader } from './Firebase/fetchData';
import Tostify from './Components/common/Tostify';
import HeaderProvider from './Components/admin-page/setting/HeaderProvider';
import CurrentUser from './Context/CurrentUser';


const App = () => {

  return (
    <>
      <Tostify />
      <Provider store={store}>
        <CurrentUser>
          <Loader>
            <HeaderProvider>
              <Router>
                <RouterSetup />
              </Router>
            </HeaderProvider>
          </Loader>
        </CurrentUser>
      </Provider>
    </>
  )
}

export default App
