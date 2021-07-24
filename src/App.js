import React from 'react'
import {Router, Route,Switch} from 'react-router'
import {history} from './helpers'
import Signup from './Pages/Signuppage/Signup'
import {Provider} from 'react-redux'
import store from './store'
const App = () => (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/signup' component={Signup}/>
        </Switch>
      </Router>
    </Provider>
  );
export default App;
