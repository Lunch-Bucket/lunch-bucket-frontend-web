import React, {useState} from "react";
import './Login.css';
import '../../common/styles/CommonStyles.css';
import LoginImg from '../../resources/images/loginVector.png'
import PATHS from "../../common/paths/paths";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Login() {


  const navigate = useNavigate();
  const [projectCode, setProjectCode] = useState('64fef5352733ffb579bdc92dAVT60UVT8600');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validationSchema = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
  };


const handleLogin = async (event) => {
    event.preventDefault();

    let newErrors = {};
    // if (!validationSchema.email.test(email)) {
    //   newErrors.email = 'Invalid email';
    // }
    // if (!validationSchema.password.test(password)) {
    //   newErrors.password = 'Invalid password';
    // }
    setErrors(newErrors);

       if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('https://fw2svr60sl.execute-api.ap-south-1.amazonaws.com/beta/userLogin', {
          email: email,
          password: password,
          project_code: projectCode, 
        });

        const authToken = response.data.data.token;
        localStorage.setItem('authToken', authToken);
        const tokenGeneratedTime = Date.now(); 
        localStorage.setItem("tokenGeneratedTime", tokenGeneratedTime.toString());
        window.location.replace(PATHS.orderLunch); 
      } catch (error) {
        console.error('Login Error:', error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };

    return (
        <>
            <div className="full-container" >
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
                            {/* <button type="submit" className="login-submit-button">Login</button> */}
                        </div>
                        </form>
                    </div>
                    <div>
                        <img src={LoginImg} alt="login vector" className="login-img" />
                    </div>
                </div>
            </div>
        </>
    );
}
