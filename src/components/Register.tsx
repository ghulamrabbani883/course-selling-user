import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import {  BASE_URL, userState } from "../state/atoms/useratoms";
import Loader from "./Loader";

const Register = () => {
  const [userData, setUserData] = useState({ name:"", email: "", password: "" });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const {isUserLoading} = useRecoilValue(userState)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUser((prev)=>{
      return {...prev,isUserLoading:true}
    })
    const res = await axios.post(BASE_URL + "/signup", userData);
    if (res.data.token !== "") {
      localStorage.setItem("courseToken", res.data.token);
      localStorage.setItem('publicId', res.data.data.id)
      setUser((prev)=>{
        return {...prev,isUserLoading:false, user:res.data.data}
      })
      alert(res.data.msg);
      navigate("/courses/purchased");
    } else {
      alert(res.data.msg);
    }
    setUserData({ name: "", email:"", password: "" });
  };

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
                <AccountCircleIcon sx={{ fontSize: "36px" }} />
              </IconButton>
              <Typography variant="h5" align="center">
                Register
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
                label="Name"
                fullWidth
                variant="outlined"
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
              ></TextField>
              <TextField
                required
                id="outlined-basic"
                label="Email"
                fullWidth
                name="email"
                value={userData.email}
                onChange={handleChange}
                variant="outlined"
                type="email"
                placeholder="Email"
              ></TextField>
              <TextField
                required
                variant="outlined"
                label="Password"
                fullWidth
                name="password"
                value={userData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
              ></TextField>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Box>
            <Typography>
              <Link to="/login">Already have an account | Login</Link>
            </Typography>
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};

export default Register;
