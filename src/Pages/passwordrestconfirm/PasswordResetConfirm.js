import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { passwordresetconfirm } from '../../actions/authentication'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import styled from 'styled-components'
import logo from '../../../public/images/logo.png'


const Wrapper = styled.div `
display : grid;
grid-column-gap : 0;
grid-row-gap : 0;
grid-template-columns : repeat(12, 1fr);
`
const Div= styled.div`
grid-column-start:1;
grid-column-end: 13;
display:flex;
align-items:center;
justify-contents:center;
flex-direction: column ;
border 1px solid #ECECEC;
margin-top:50px;
`
const Form = styled.form`
display:grid;
grid-column-gap : 0;
grid-row-gap : 0;
grid-template-columns : repeat(12, 1fr);
background-color:white;
padding: 30px;
width:300px;
border-radius:2px;
margin:0;
`
const FormDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
display:flex;
align-items:center;
flex-direction: column ;
`
const Img = styled.img`
width:100px;
margin-bottom:5px;
`
const H2 = styled.h2`
font-family:"Style Script";
color:black;
font-size:40px;
padding:0;
margin:0;
`
const Input = styled.input`
padding:10px;
background-color:#FAFAFA;
border 1px solid #EDEDED;
border-radius:5px;
width:92%;
margin-bottom:5px;
`
const H4 = styled.h4`
color:black;
margin-top:10px;
`

const Button =  styled.button`
display:flex;
justify-content:center;
background-color: #0095F6;
border: none;
color: white;
width:100%;
height:30px;
padding: 5px;
border-radius:5px;
font-size: 16px;
cursor: pointer;
margin-top: 5px;
font-family:Roboto Medium
`
const DisabledButton =  styled.button`
display:flex;
justify-content:center;
background-color: #B2DFFC;
border: none;
color: white;
width:100%;
height:30px;
padding: 5px;
border-radius:5px;
font-size: 16px;
cursor: pointer;
margin-top: 5px;
font-family:Roboto Medium
`
const ErroDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
width:300px;
text-align:center;
color:red;
font-size:14px;
`
const Spinner = styled.div `
border: 5px solid #FAFAFA;
border-radius: 50%;
border-top: 5px solid #2596be;
width: 10px;
height:10px;
-webkit-animation: spin 2s linear infinite; /* Safari */
animation: spin 1s linear infinite;  
  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
`
let PasswordResetConfirmSchema = yup.object().shape({
    new_password:yup.string().required('please enter password').min(8, "Password is too short - should be 8 chars minimum.")
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
        <Wrapper>
            <Div>
                <Img src={logo} alt='password Reset'/>
                <H2>Picsagram</H2>
                <H4>Please enter new password</H4>
                <Form onSubmit = {handleSubmit(onSubmit)}>
                    <FormDiv>
                        <Input  type='password' {...register("new_password")} placeholder = 'password'/>
                    </FormDiv>
                    <FormDiv>
                        {isValid ? <Button type='submit'>{isLoading?<Spinner/>:'Reset Password'}</Button>:<DisabledButton>Reset Password</DisabledButton>}
                        {passwordChanged && <Redirect to='/login'/>}
                    </FormDiv>       
                    <ErroDiv>
                        {errMsg &&  errMsg.new_password}
                        {errors.new_password && <p>{errors.new_password.message}</p>}
                    </ErroDiv>
                </Form>
            </Div>
        </Wrapper>
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