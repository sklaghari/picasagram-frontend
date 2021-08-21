import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { login,googleLogin, facebookLogin } from '../../actions/authentication';
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { Redirect } from 'react-router';
import ReactGoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import loginImage from '../../../public/images/login_image.PNG'
import appStores from '../../../public/images/appstore.png'
import styled from 'styled-components'

const Wrapper = styled.div `
display : grid;
grid-column-gap : 0;
grid-row-gap : 0;
grid-template-columns : repeat(12, 1fr);
`

const LeftDiv= styled.div`
grid-column-start:1;
grid-column-end: 7;
display:flex;
align-items:flex-end;
flex-direction: column ;
`
const RightDiv = styled.div`
grid-column-start:7;
grid-column-end:13;
display:flex;
justify-content:center;
flex-direction:column;
@media (min-width:320px) and (max-width:480px){
    grid-column-start:1;
    grid-column-end:13;
  }
`
const Form = styled.form`
display:grid;
grid-column-gap : 0;
grid-row-gap : 0;
grid-template-columns : repeat(12, 1fr);
background-color:white;
padding: 30px;
width:300px;
height:170px;
border-radius:2px;
@media (min-width:320px) and (max-width:480px){
    width:320px;
  }
@media (min-width:411px) {
    width:360px;
  }
`
const FormDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
display:flex;
justify-content:center;
`
const H2 = styled.h2`
font-family:"Style Script";
color:black;
font-size:40px;
padding:0;
margin:0;
"
`
const Input = styled.input`
padding:10px;
background-color:#FAFAFA;
width:100%;
height:20px;
margin-bottom:5px;
border 1px solid #EDEDED;
`
const Img = styled.img`
width:60%;
height:100%;
@media (min-width:320px) and (max-width:480px){
    display:none;
  }
  @media (max-width:320px) and (max-width:480px){
    display:none;
  }
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
margin-top: 10px;
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
const ErroDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
width:300px;
text-align:center;
color:red;
font-size:14px;
`
const SocialMediaDiv = styled.div`
display:flex;
align-items:center;
justify-content:flex-start;
flex-direction:column;
width:300px;
padding:30px;
background-color:white;
@media (min-width:320px) and (max-width:480px){
    width:320px;
  }
@media (min-width:411px) {
    width:360px;
  }
`
const SecondDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
background-color:white;
padding: 20px;
width:380px;
border-radius:2px;
margin-top:10px;
border 1px solid #ECECEC;
color:#262626;
text-align:center;
@media (min-width:320px) and (max-width:480px){
    width:340px;
  }
@media (min-width:411px) and (max-width:768px) {
    width:370px;
  }
`

const ThirdDiv = styled.div`
grid-column-start:1;
grid-column-end: 13;
width:300px;
border-radius:2px;
color:#262626;
font-family:Roboto light;
display:flex;
justify-content:center;
flex-direction:column;
text-align:center;
@media (min-width:320px) and (max-width:480px){
    width:320px;
  }
@media (min-width:411px) {
    width:400px;
  }
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


let LoginSchema = yup.object().shape({
    email: yup.string().email().required('Enter Email'),
    password:yup.string().required('Enter password')
})
const Login = ({login,googleLogin, facebookLogin, isLoading, isLoggedIn, errMsg}) =>{
const {register, handleSubmit, formState: { errors, isValid}} =useForm({
    resolver: yupResolver(LoginSchema),
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
login(...Object.values(data))
}
if(localStorage.getItem('access')){
    return <Redirect to='/'/>
}
return (
<Wrapper>
    <LeftDiv>
        <Img src={loginImage} alt='login Image'/>
    </LeftDiv>
    <RightDiv>
        <Form onSubmit = {handleSubmit(onSubmit)}>
                <FormDiv>
                    <H2>Picsagram</H2>
                </FormDiv>
                <FormDiv>
                    <Input type= 'email' {...register("email")} placeholder = 'Email' />
                </FormDiv>
                <FormDiv>
                    <Input  type='password' {...register("password")} placeholder = 'password'/>
                </FormDiv>
                <FormDiv>
                    {isValid ? <Button type='submit'>{isLoading?<Spinner/>:'Log In'}</Button>:<DisabledButton>Log In</DisabledButton>}
                    {isLoggedIn && <Redirect to='/'/>}
                </FormDiv>
            <ErroDiv>
                   {errors.email && errors.email.message} {errors.password && errors.password.message}
                   {errMsg &&  errMsg.non_field_errors}
            </ErroDiv>
        </Form>
        <SocialMediaDiv>
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
            <FormDiv>
                <Link to='password-reset' style={{ textDecoration: 'none', fontSize:'12px', color:'#00376B', marginTop:'5px' }}>Forgot Password?</Link>
            </FormDiv>
        </SocialMediaDiv>
        <SecondDiv>Don't have an account?<Link to='/signup' style={{ textDecoration: 'none', color:'#0095F6' }}> Sign up</Link></SecondDiv>
        <ThirdDiv>
            <p>Get the app.</p>
            <img style={{ width:'300px', marginLeft:'30px'}} src={appStores} alt='Get the app'/>
        </ThirdDiv>
    </RightDiv>
</Wrapper>
)
}
const mapStateToProps = state => {
    return {
        isLoading: state.loginReducer.isLoading,
        isLoggedIn: state.loginReducer.isLoggedIn,
        errMsg: state.errorReducer.msg,
        errStatus: state.errorReducer.status
    }
}
const mapDispatchToProps = {
login:login,
googleLogin:googleLogin,
facebookLogin:facebookLogin
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
