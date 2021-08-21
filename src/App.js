import React,{Fragment} from 'react'
import {Router, Route,Switch} from 'react-router'
import {history} from './helpers'
import Signup from './Pages/Signuppage/Signup'
import Activation from './Pages/Activationpage/Activation'
import Activate from './Pages/Activationpage/Activate'
import Login from './Pages/Loginpage/Login'
import PasswordRest from './Pages/passwordreset/PasswordReset'
import passwordResetLink from './Pages/passwordreset/passwordResetLink'
import PasswordResetConfirm from './Pages/passwordrestconfirm/PasswordResetConfirm'
import Home from './Pages/Homepage/Home'
import {Provider} from 'react-redux'
import store from './store'
import GlobalStyle from './theme/globalStyles'
const App = () => (
  <Fragment>
    <GlobalStyle/>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
          <Route exact path='/' component={Home}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/activate' component={Activate}/>
            <Route exact path='/activate/:uid/:token' component={Activation}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/password-reset' component={PasswordRest}/>
            <Route exact path='/password-reset-link' component={passwordResetLink}/>

            <Route exact path='/password/reset/confirm/:uid/:token' component={PasswordResetConfirm}/>
          </Switch>
        </Router>
      </Provider>
  </Fragment>
  );
export default App;
