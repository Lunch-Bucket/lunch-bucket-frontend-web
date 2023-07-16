import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import '../../common/styles/CommonStyles.css';
import LoginImg from '../../resources/images/loginVector.png'
import PATHS from "../../common/paths/paths";



export default function Login() {

    localStorage.setItem('loginStatus', 'false');

    const initialValues = {
        username: '',
        password: '',
    };
    const userName = "admin";
    const Pwd = "admin@123";


    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = (values) => {
        const { username, password } = values;
        if((username === userName) && (password === Pwd)){
            localStorage.setItem('loginStatus', 'true');
            console.log("login success!");
            window.location.replace(PATHS.orderLunch); 
        }
        else{
            localStorage.setItem('loginStatus', 'false');
            window.location.reload();
            alert("You have entered wrong credentials!")
        }
        console.log(values);
        
        
    };

    return (
        <>
            <div className="full-container" >
                <div className="login-form-container">
                    <div className="login-form-container-left">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="login-form-input-content">
                                    <h2>Login</h2>
                                    <div >
                                        <Field type="text" name="username" placeholder="Username" className="login-form-input-field"/>
                                        <ErrorMessage name="username" component="div" className="error-message" />
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
