import React from 'react'
import { connect } from 'react-redux'
import { passwordreset } from '../../actions/authentication';
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import lock from '../../../public/images/password.png'
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
const Wrapper = styled.div `
display : grid;
grid-column-gap : 0;
grid-row-gap : 0;
grid-template-columns : repeat(12, 1fr);
`
const TopDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
display:flex;
align-items:center;
justify-content:flex-start;
font-family:"Style Script";
color:black;
font-size:40px;
padding:0;
margin-bottom:50px;
background-color:white;
border 1px solid #ECECEC;
`
const Div= styled.div`
grid-column-start:1;
grid-column-end: 13;
display:flex;
align-items:center;
justify-contents:center;
flex-direction: column ;
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
border 1px solid #ECECEC;
`
const FormDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
display:flex;
align-items:center;
flex-direction: column ;
margin-top:5px;
`
const Input = styled.input`
padding:10px;
background-color:#FAFAFA;
border 1px solid #EDEDED;
border-radius:5px;
width:92%;
`
const Img = styled.img`
grid-column-start:1;
grid-column-end: 13;
width:100px;
margin-bottom:5px;
`
const H4 = styled.h4`
color:black;
margin:0;
`
const P = styled.p`
font-size:12px;
text-align:center;
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
const BottomDiv = styled.div`
display:flex;
align-items:center;
justify-content:center;
border 1px solid #EBEBEB;
width:340px;
padding:10px;
`

let PasswordResetSchema = yup.object().shape({
    email: yup.string().email().required('Please enter Email'),
})
const PasswordReset = ({passwordreset,isLoading,linkSent ,errMsg}) =>{
const {register, handleSubmit, formState: { errors, isValid}} =useForm({
    resolver: yupResolver(PasswordResetSchema),
    mode: "onChange" ,
})

const onSubmit = (data) => {
passwordreset(...Object.values(data))
}
if(linkSent){
    return <Redirect to='/password-reset-link'/>
}
return (
<Wrapper>
    <TopDiv>
        Picsagram
    </TopDiv>
    <Div>
        <Form onSubmit = {handleSubmit(onSubmit)}>
            <FormDiv>
                <Img src={lock} alt='password Reset'/>
                <H4>Trouble Logging In?</H4>
                <P>Enter your email and we'll send you a link to get back into your account.</P>
            </FormDiv>
            <FormDiv>
                <Input type= 'email' {...register("email")} placeholder = 'Email' />
            </FormDiv>
            <FormDiv>
                {isValid ? <Button type='submit'>{isLoading?<Spinner/>:'Send Login Link'}</Button>:<DisabledButton>Send Login Link</DisabledButton>}
            </FormDiv>
            <ErroDiv>
                {errors.email && errors.email.message}    
                {errMsg}
            </ErroDiv>
            <FormDiv>
                <H4>Or</H4>
            </FormDiv>
            <FormDiv>
            <Link to='/signup' style={{ textDecoration: 'none', fontSize:'14px', color:"black", marginTop:'5px', fontFamily:'Roboto Medium' }}>Create New Account</Link>
            </FormDiv>
        </Form>
        <BottomDiv>
            <Link to='/login' style={{ textDecoration: 'none', fontSize:'14px', color:"black", marginTop:'5px', fontFamily:'Roboto Medium' }}>Back To Login</Link>
        </BottomDiv>
    </Div>
</Wrapper>
)
}
const mapStateToProps = state => {
    return {
        isLoading: state.passwordresetReducer.isLoading,
        linkSent: state.passwordresetReducer.linkSent,
        errMsg: state.errorReducer.msg,
        errStatus: state.errorReducer.status
    }
}
const mapDispatchToProps = {
passwordreset:passwordreset
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
