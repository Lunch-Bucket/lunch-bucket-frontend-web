import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import '../../common/styles/CommonStyles.css';
import LoginImg from '../../resources/images/loginVector.png'

export default function Login() {
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = (values) => {
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
                                    <div className="login-form-input-field">
                                        <Field type="text" name="username" placeholder="Username" />
                                        <ErrorMessage name="username" component="div" className="error-message" />
                                    </div>
                                    <div className="login-form-input-field">
                                        <Field type="password" name="password" placeholder="Password" />
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
