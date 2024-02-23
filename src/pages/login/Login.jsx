import React, {useState, useEffect} from "react";
import './Login.css';
import '../../common/styles/CommonStyles.css';
import LoginImg from '../../resources/images/loginVector.png'
import PATHS from "../../common/paths/paths";
import axios from 'axios';
import { projectCode, loginUrl } from "../../controllers/baseUrl";
import LoadingIndicator from "../../components/LoadingIndicator";


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const [loginLoading, setLoginLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const [navOnline,setNavOnline] = useState(true)


const handleLogin = async (event) => {
    event.preventDefault();

    let newErrors = {};
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`${loginUrl}userLogin`, {
          email: email,
          password: password,
          project_code: projectCode, 
        });

        const authToken = response.data.data.token;
        localStorage.setItem('lb_auth_token', authToken);
        localStorage.setItem('loginStatus', true);
        const tokenGeneratedTime = Date.now(); 
        localStorage.setItem("tokenGeneratedTime", tokenGeneratedTime.toString());
        setLoginLoading(false);
        window.location.replace(PATHS.orderLunch); 
      } catch (error) {
        if(!navOnline){
          alert("Please check Your Internet Connection")
        }else{
          alert("Please check the Username and Password again")
          console.error('Login Error:', error);
        }
      }
    }
  };

  const handleKeyPress = (event) => {
    setLoginLoading(true);
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('loginStatus')==='true')
       setIsLogged(true);
   }, []);

   useEffect(() => {
    if(navigator.onLine){
        setNavOnline(true);
    }else{
        setNavOnline(false);
    }
}, [navigator.onLine]);

 function handleLogout(){
    const tokenGeneratedTime = parseInt(localStorage.getItem("tokenGeneratedTime"), 10);

    const currentTime = Date.now() + 3550000;
    const tokenExpiryTime = tokenGeneratedTime + 3550000;

    if (currentTime >= tokenExpiryTime) {
      localStorage.setItem('loginStatus', false);
      window.location.replace(PATHS.login); 
    }

  }

    return (
        <>
            {isLogged ? <div className="isLogged-content">
            <div className="isLogged-content-notifi"> You Are Already Logged In! </div>
            <button className="isLogged-content-logout-btn" onClick={handleLogout}> Logout </button>
            </div>:
            <div className="full-container">
                <div className="login-form-container">
                    <div className="login-form-container-left">
                <form onSubmit={handleLogin}>
                <div className="login-form-input-content">
                    <h2>Login</h2>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Username"
                                className="login-form-input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        <div>
                                <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="login-form-input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>
                        <br />
                            <button type="submit" className="login-submit-button">Login</button>
                        </div>
                        </form>
                    </div>
                    <div>
                        <img src={LoginImg} alt="login vector" className="login-img" />
                    </div>
                </div>
                {loginLoading && <LoadingIndicator/>}
            </div>}
        </>
    );
}

