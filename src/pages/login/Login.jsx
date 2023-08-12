import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import '../../common/styles/CommonStyles.css';
import LoginImg from '../../resources/images/loginVector.png'
import PATHS from "../../common/paths/paths";
import axios from 'axios';



export default function Login() {


        const validationSchema = Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        });
        const [projectCode, setProjectCode] = useState('64a7aec4932166ca272cd176AVT60UVT4300');
      
        const handleLogin = async (values) => {
            try {
              const response = await axios.post('https://fmrlw0xn6h.execute-api.ap-south-1.amazonaws.com/dev/userLogin', {
                email: values.email,
                password: values.password,
                project_code: projectCode,
              });
        
              const authToken = response.data.data.token;
              console.log('Authentication Token:', authToken);
              localStorage.setItem('authToken', authToken);
              window.location.replace(PATHS.orderLunch); 
            } catch (error) {
              console.error('Login Error:', error);
            }
          };

    return (
        <>
            <div className="full-container" >
                <div className="login-form-container">
                    <div className="login-form-container-left">
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleLogin}
                        >
                            <Form>
                                <div className="login-form-input-content">
                                    <h2>Login</h2>
                                    <div >
                                        <Field type="email" name="email" placeholder="Username" className="login-form-input-field"/>
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>
                                    <div >
                                        <Field type="password" name="password" placeholder="Password" className="login-form-input-field"/>
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>
                                    <br />
                                    <button type="submit" className="login-submit-button">Submit</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <div>
                        <img src={LoginImg} alt="login vector" className="login-img" />
                    </div>
                </div>
            </div>
        </>
    );
}
