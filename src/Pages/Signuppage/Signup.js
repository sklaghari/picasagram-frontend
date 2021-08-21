import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { registration, googleLogin,facebookLogin } from '../../actions/authentication'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { Redirect } from 'react-router';
import styled from 'styled-components'
import ReactGoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import appStores from '../../../public/images/appstore.png'


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
const TopDiv = styled.div`
display:grid;
grid-column-gap : 0;
grid-row-gap : 0;
grid-template-columns : repeat(12, 1fr);
background-color:white;
width:300px;
height:130px;
padding:30px;
margin-top:5px;
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
const H2 = styled.h2`
font-family:"Style Script";
color:black;
font-size:40px;
padding:0;
margin:0;
`
const FbButton = styled.button`
background: #4267b2;
border: none;
color: white;
width:100%;
height:30px;
padding: 5px;
border-radius:5px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 14px;
cursor: pointer;
margin-top: 5px;
font-family:Roboto Medium
`;
const GoogleBtn = styled.button`
background: #db3236;
border: none;
color: white;
width:100%;
height:30px;
padding: 5px;
border-radius:5px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 14px;
cursor: pointer;
margin-top: 5px;
font-family:Roboto Medium;
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
const SecondDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
background-color:white;
padding: 20px;
width:320px;
border-radius:2px;
margin-top:10px;
border 1px solid #ECECEC;
color:#262626;
text-align:center;
`

const ThirdDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
border-radius:2px;
color:#262626;
font-family:Roboto light;
display:flex;
justify-content:center;
flex-direction:column;
text-align:center;
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


let SignupSchema = yup.object().shape({
    first_name: yup.string().required('First Name is required').matches(/^[A-Za-z]+$/, 'must be only aphabets').min(2, 'First Name is too short'),
    last_name:  yup.string().required('Last Name is Required').matches(/^[A-Za-z]+$/, 'must be only aphabets'),
    email: yup.string().email().required('Email is required'),
    password:yup.string().required('please enter password').min(8, "Password is too short - should be 8 chars minimum.")
})
const Signup = ({registering, registration, googleLogin, facebookLogin, isSignedup, errMsg,status}) =>{
const {register, handleSubmit, formState: { errors, isValid}} =useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onChange" ,
})
const responseFacebook = (response) => {
    let fbResponse  =  facebookLogin(response.accessToken)
    console.log(fbResponse);
  }
const responseGoogle = response => {
    let googleResponse  =  googleLogin(response.accessToken)
    console.log(googleResponse)
  }
const onSubmit = (data) => {
registration(...Object.values(data))
}
if(localStorage.getItem('access')){
    return <Redirect to='/'/>
}
if(isSignedup){
    return <Redirect to='/activate'/>
}
return (
<Wrapper>
    <Div>
        <TopDiv>
            <FormDiv>
                <H2>Picsagram</H2>
            </FormDiv>
            <FormDiv>
                <ReactGoogleLogin
                    clientId="563646483738-3pblqrcm9uang431ja99qu8ke2kv13ob.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    render={renderProps => (
                        <GoogleBtn
                        onClick={renderProps.onClick}>
                        Continue With Google
                        </GoogleBtn>
                        )}
                        />
                    </FormDiv>
                    <FormDiv>
                    <FacebookLogin
                        appId="550250432986199"
                        fields="name,email,picture"
                        callback={responseFacebook}
                        render={renderProps => (
                        <FbButton
                            onClick={renderProps.onClick}>
                            Continue With Facebook
                        </FbButton>
                        )}
                        />
            </FormDiv>
            <FormDiv>
                    <H4>Or</H4>
            </FormDiv>
            </TopDiv>
            <Form onSubmit = {handleSubmit(onSubmit)}>
                <FormDiv>
                    <Input  {...register("first_name")} placeholder ='First Name' />
                </FormDiv>
                <FormDiv>
                    <Input  {...register("last_name")} placeholder = 'Last Name' />
                </FormDiv>
                <FormDiv>
                    <Input type= 'email' {...register("email")} placeholder = 'Email' />
                </FormDiv>
                <FormDiv>
                    <Input  type='password' {...register("password")} placeholder = 'password'/>
                </FormDiv>
                <ErroDiv>
                    {errors.first_name && <p>{errors.first_name.message}</p>}
                    {errMsg && errMsg.first_name && `${errMsg.first_name.join()}`}
                    {errors.last_name && <p>{errors.last_name.message}</p>}
                    {errMsg && errMsg.last_name && `${errMsg.last_name.join()}`}
                    {errors.email && <p>{errors.email.message}</p>}
                    {errMsg && errMsg.email && `${errMsg.email.join()}`}
                    {errors.password && <p>{errors.password.message}</p>}
                    {errMsg && errMsg.password && `${errMsg.password.join()}`}
                    {status===500 && 'User with this email is already registered without Facebook or Google account'}
                </ErroDiv>
                <FormDiv>
                    {isValid ? <Button type='submit'>{registering?<Spinner/>:'Sign up'}</Button>:<DisabledButton>Sign up</DisabledButton>}
                </FormDiv>  
            </Form>
            <SecondDiv>Already have an account?<Link to='/login' style={{ textDecoration: 'none', color:'#0095F6' }}> Login</Link></SecondDiv>
            <ThirdDiv>
                <p>Get the app.</p>
                <img style={{ width:'300px', marginLeft:'30px'}} src={appStores} alt='Get the app'/>
            </ThirdDiv>   
        </Div>
        {isSignedup && <Redirect to='/activate'/>}
</Wrapper>
)
}
const mapStateToProps = state => {
    return {
        registering: state.registrationReducer.registering,
        isSignedup:state.registrationReducer.isSignedup,
        errMsg: state.errorReducer.msg,
        status: state.errorReducer.status,
        errStatus: state.errorReducer.status
    }
}
const mapDispatchToProps = {
registration:registration,
googleLogin:googleLogin,
facebookLogin:facebookLogin
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
