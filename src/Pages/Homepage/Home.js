import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { logout } from '../../actions/authentication';
import Login from '../Loginpage/Login';


const Home = ({logout}) => {
const [redirect, setRedirect] = useState(false)
const logout_user = () => {
logout();
setRedirect(true)
}
if(redirect){
    return <Redirect to = '/login'/>
}

return (
<div>
   {localStorage.getItem('access') ?  <button onClick={logout_user}>Logout</button>: <Login/> }
</div>
)
}
const mapDispatchToProps = {
logout : logout
}
export default connect(null, mapDispatchToProps)(Home)
