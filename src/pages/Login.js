import React from "react";
import {Form, withFormik} from "formik";

const LoginForm = () => {
    return (
        <Form>
            LOGIN
        </Form>
    )
};

export const Login = withFormik()(LoginForm);