import React, { useEffect, useState } from "react";
import { Link, Route, Routes} from "react-router-dom";
import { useFormik } from "formik";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import * as yup from "yup";
import "./styles/CreateAcc.css"

function CreateAcc({ setRegister, onLogin }) {

    const [refreshPage, setRefreshPage] = useState(false)
    const [errors, setErrors] = useState([])


    useEffect(() => {


    }, [refreshPage])


    const formSchema = yup.object().shape({
        username: yup.string().required("must enter a username").max(15),
        password: yup.string().required("must enter a password").max(15),
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Must match "password" field value'),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirm: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            //might want to seterrors to [] here
            console.log("submit is working")
            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            })
                .then((res) => {
                    if (res.ok) {
                        //might want to set refresh page here
                        res.json().then((user) => {
                            //fill this in with return data or set data
                            onLogin(user)
                        })
                    }
                    else {
                        res.json().then((err) => setErrors(err.error))
                    }
                });
        },

    });

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large' onSubmit={formik.handleSubmit}>
                    <Header as='h2' color='black' textAlign='center'>
                        {/* <Image src={logo}  /> */} Register Account
                    </Header>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='User Name'
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <Form.Input
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password Confirmation'
                            type='password'
                            name="confirm"
                            value={formik.values.confirm}
                            onChange={formik.handleChange}
                        />



                        <Button className="login-btn" color='black' fluid size='large'>
                            Register
                        </Button>
                    </Segment>
                    <Message className="message" >
                        Already Have An Account? <Button className="login-btn1" onClick={() => setRegister(false)}>Log In</Button>
                    </Message>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default CreateAcc;