import React from "react";
import {Form, withFormik} from "formik";
import classes from "./Common.module.css";
import Input from "@material-ui/core/Input/Input";
import {signInWithGoogle, signUp} from "../utils/authUtils";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import {NavLink, Redirect} from "react-router-dom";

const SignUpFormik = ({errors, touched, setFieldTouched, handleBlur, handleChange, authenticated, setErrors}) => {
    if (authenticated) return <Redirect to="/chat"/>;
    const googleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setErrors({'password': error.message})
        }
    };
    return (
        <Form className={classes.login__form}>
            <h2>SignUp to <NavLink to="/">chat</NavLink></h2>
            <p>Fill in the form below to create an account</p>
            <div>
                <Input name="email"
                       onChange={handleChange}
                       placeholder="Email here"
                       error={Boolean(touched.email && errors.email)}
                       onFocus={() => setFieldTouched('email', false)}
                       onBlur={handleBlur}/>
            </div>
            {touched.email && errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
            <div>
                <Input name="password"
                       onChange={handleChange}
                       type="password"
                       placeholder="Password here"
                       error={Boolean(touched.password && errors.password)}
                       onFocus={() => setFieldTouched('password', false)}
                       onBlur={handleBlur}/>
            </div>
            {touched.password && errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
            <Button variant="contained" color="primary" type="submit">SignUp</Button>
            <p>or</p>
            <Button variant="contained" color="primary" onClick={googleSignIn}>Sign Up with Google</Button>

            <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
        </Form>
    )
};

const formikValues = {
    email: "",
    password: ""
};

export const SignUp = withFormik({
    mapPropsToValues: () => formikValues,
    validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(5, 'Too short').max(20, 'Too long').required()
    }),
    handleSubmit: (values, formikBag) => {
        signUp(values.email, values.password)
            .catch(error => formikBag.setErrors({'password': error.message}))
    }
})(SignUpFormik);