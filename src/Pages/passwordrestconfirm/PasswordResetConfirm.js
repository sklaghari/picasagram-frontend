import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { passwordresetconfirm } from '../../actions/authentication'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

let PasswordResetConfirmSchema = yup.object().shape({
    new_password:yup.string().required('please enter password')
})
const PasswordResetConfirm = ({passwordresetconfirm, isLoading, match, passwordChanged, errMsg}) =>{
    const {register, handleSubmit, formState: { errors, isValid}} =useForm({
        resolver: yupResolver(PasswordResetConfirmSchema),
        mode: "onChange" ,
    })
const uid = match.params.uid
const token = match.params.token
const onSubmit = (data) => {passwordresetconfirm(uid, token, ...Object.values(data))}
    return (
        <div>
            <h5>Please enter new password</h5>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <input  type='password' {...register("new_password")} placeholder = 'password'/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    {isLoading && '...Loading'}
                    <button type='submit' disabled={!isValid}>Submit</button>
                    {passwordChanged && <Redirect to='/login'/>}
                </div>       
                {errMsg &&  errMsg.new_password}
            </form>
        </div>
    )
}
const mapStateToProps = state =>{
    return {
        isLoading : state.passwordresetConfirmReducer.isLoading,
        passwordChanged: state.passwordresetConfirmReducer.passwordChanged,
        errMsg: state.errorReducer.msg
    }
}
const mapDispatchToProps ={
    passwordresetconfirm : passwordresetconfirm
}
export default connect(mapStateToProps,mapDispatchToProps)(PasswordResetConfirm)