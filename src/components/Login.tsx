import { LoginOutlined } from "@mui/icons-material";
import { ChangeEvent,MouseEvent, useState } from "react";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BASE_URL, userState } from "../state/atoms/useratoms";
import Loader from "./Loader";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const {isUserLoading} = useRecoilValue(userState)

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
      const {name, value}  = e.target;
      setLoginData((prev)=>{
        return {...prev,[name]:value}
      })
  }
  const handleLoginClick = async (e:MouseEvent<HTMLElement>)=>{
    e.preventDefault();
    setUser((prev)=>{
      return {...prev, isUserLoading:true}
    })
    const res = await axios.post(BASE_URL + "/login", loginData);
    if(res.data.token !== ''){
      localStorage.setItem('courseToken', res.data.token)
      localStorage.setItem('publicId', res.data.data?.id)
      setUser((prev)=>{
        return {...prev, isUserLoading:false, isAuthenticated:true, user:res.data.data}
      })
      alert(res.data.msg)
      navigate('/courses/purchased')
    }else{
      alert(res.data.msg)
    }
    setLoginData({email:"", password:""})
  }

  if(isUserLoading){
    return <Loader />
  }
  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
        // disableGutters
      >
        <CssBaseline>
          <Box
            display="flex"
            border="1px solid grey"
            borderRadius={2}
            boxShadow={5}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            minHeight={400}
            width={350}
            alignSelf="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton color="primary" size="large">
                <LoginOutlined sx={{ fontSize: "36px" }} />
              </IconButton>
              <Typography variant="h5" align="center">
                Login
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={3}
              flexDirection="column"
              alignItems="center"
              width={"100%"}
              padding={3}
            >
              <TextField
                required
                id="outlined-basic"
                label="Email"
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Email"
              ></TextField>
              <TextField
                required
                variant="outlined"
                label="Password"
                fullWidth
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter password"
              ></TextField>
              <Button type="button" variant="contained" fullWidth onClick={handleLoginClick}>
                Login
              </Button>
            </Box>
            <Typography>
              <Link to="/register">New User | Register</Link>
            </Typography>
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};

export default Login;
