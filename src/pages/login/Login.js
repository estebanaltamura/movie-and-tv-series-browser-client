import { LoginRegisterForm } from "../../components/loginForm/LoginRegisterForm"
import logo from '../../assets/logo.png'
import './Login.css'


export const Login = ()=>{
  return(
    <div className="loginContainer">
      <div className="brandingContainerLogo">
        <img src={logo} />
        <h1 className="brandingTitleLogo">FlixFinder</h1>
      </div>
      <h2 className="greetingsLogin">Good to see you again</h2>
      <LoginRegisterForm />
    </div>
  )
}  