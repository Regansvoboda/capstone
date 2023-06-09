import React from "react";
import styled from '@emotion/styled';
import { Avatar, Box, Button, ButtonGroup, TextField, Typography , IconButton } from '@mui/material'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import * as yup from "yup"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const StyledBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 5px #ffffff",
  })
  
  const StyledHeader = styled(Typography)({
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "40px",
  })
  
  const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#88d4c3",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#555",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ffffff",
    },
    "&:hover fieldset": {
      borderColor: "#555",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#EBCCB6",
    },
  },
})

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#121212',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#fff'
  },
}));

function Signup({ onLogin, setUser }) {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    first_last: yup.string().required("First and Last Name are required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      first_last: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Signup failed");
        })
        .then((user) => {
          setUser(user);
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  

const handleGoBack = () => {
  navigate(-1);
};
return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", minHeight: "100vh" }}>
  <header className='toppage'>
  <IconButton onClick={handleGoBack} style={{ marginRight: '10px' }}>
    <h4>Already have an account? Sign in!</h4>
            <ArrowBackIcon />
  </IconButton>
  </header>
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 0" }}>
    <StyledBox>
      <StyledHeader>Sign Up</StyledHeader>
      <form onSubmit={formik.handleSubmit} style={{width: "100%"}}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 3 }}>
        </Box>
        <StyledTextField
          sx={{ width: "100%", mb: 2 }}
          inputProps={{ style: { color: "#ffffff" } }}
          id="username"
          label="Username"
          variant="outlined"
          onChange={formik.handleChange}
        />
        {/* <p style={{ color: "red" }}> {formik.errors.username}</p> */}
        <StyledTextField
          sx={{ width: "100%", mb: 2 }}
          inputProps={{ style: { color: "#ffffff" } }}
          multiline
          id="email"
          label="Email"
          variant="outlined"
          onChange={formik.handleChange}
        />
        {/* <p style={{ color: "red" }}> {formik.errors.email}</p> */}
        <StyledTextField
        sx={{ width: "100%", mb: 2 }}
        inputProps={{ style: { color: "#ffffff" } }}
        multiline
        id="password"
        label="Password"
        variant="outlined"
        onChange={formik.handleChange}
      />
      <p style={{ color: "red" }}> {formik.errors.password}</p>
      <StyledTextField
        sx={{ width: "100%", mb: 2 }}
        inputProps={{ style: { color: "#ffffff" } }}
        multiline
        id="first_last"
        label="First and Last"
        variant="outlined"
        onChange={formik.handleChange}
      />
      {/* <p style={{ color: "red" }}> {formik.errors.first_name}</p> */}         
            <SubmitButton type="submit">Create Account</SubmitButton>
          </form>
        </StyledBox>
      </Box>
      <footer className='buttpage'>
      </footer>
    </Box>
    );
}

export default Signup;