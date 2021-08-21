import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { activation } from '../../actions/authentication'

const Activation = ({activating, activation, match, isActivated, errMsg}) =>{
    const activate = e => {
        const uid = match.params.uid
        const token = match.params.token
        activation(uid, token)
    }
    return (
        <div>
            <h1>Please verify the account</h1>
            <button onClick={activate}>verify</button>
            {activating && '...loading'}
            {isActivated && <Redirect to='/'/>}
            {errMsg && errMsg.detail === "Stale token for given user." && <div>User is already verified go to <Link>Login</Link></div>}
        </div>
    )
}
const mapStateToProps = state =>{
    return {
        activating : state.activationReducer.activating,
        isActivated: state.activationReducer.isActivated,
        errMsg: state.errorReducer.msg
    }
}
const mapDispatchToProps ={
    activation : activation
}
export default connect(mapStateToProps,mapDispatchToProps)(Activation)