import { SchoolOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState, useEffect, MouseEvent } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, courseState, parseToken } from "../state/atoms/useratoms";
import { useRecoilState } from "recoil";
import Loader from "./Loader";

const SingleCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate()
  const isPurchased = false
  const token = parseToken();
  const [{singleCourse, isCourseLoading}, setCourseState] = useRecoilState(courseState)
  const arr = [1,2,3,4,5,6,7,8,9,10]

  const handlePurchasedClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const publicId = localStorage.getItem('publicId');
    axios.defaults.headers.common["bearertoken"] = token;
    setCourseState((prev)=>{
      return {...prev, isCourseLoading:true}
    })
    const res = await axios.post(BASE_URL + `/purchase/${courseId}`, {
      publicid: publicId,
    });
    console.log(res.data)
    setCourseState((prev)=>{
      return {...prev, isCourseLoading:false}
    })
    alert('Course is added to your purchased list');
    navigate('/purchased')
    console.log(res.data);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      setCourseState((prev)=>{
        return {...prev, isCourseLoading:true}
      })
      const res = await axios.get(BASE_URL + `/courses/${courseId}`);
      console.log(res.data.course)
      setCourseState((prev)=>{
        return {...prev, singleCourse:res.data.course, isCourseLoading:false}
      })
    };
    fetchCourse();
  }, [courseId]);

  if(isCourseLoading){
    return <Loader />
  }
  return (
    <>
      <CssBaseline>
        <Container
          maxWidth="xl"
          sx={{ minHeight: "90vh", padding: "50px 70px" }}
        >
          {/* <Box component="div" sx={{ margin: "50px 70px" }}> */}
          <Container maxWidth="md">
            <Grid container spacing={10} alignItems="center">
              <Grid item xs={12} sm={12} md={6}>
                <Card variant="outlined">
                  <CardMedia
                    sx={{ height: 200 }}
                    image="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                    title="Course Selling"
                  />
                  <CardContent>
                    <Typography variant="h5" color="primary">
                      {singleCourse?.title}
                    </Typography>
                    <Typography component="p" color="grey">
                      {singleCourse?.description}
                    </Typography>
                  </CardContent>
                  {!isPurchased ? (
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h6" color="secondary">
                        $ {singleCourse?.price}
                      </Typography>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={handlePurchasedClick}
                      >
                        Buy Now
                      </Button>
                    </CardActions>
                  ) : (
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button variant="contained" color="success">
                        Purchased
                      </Button>
                        
                    </CardActions>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Card sx={{ bgcolor: "primary.dark" }}>
                  <CardHeader
                    title="Course Details"
                    sx={{ color: "white", textAlign: "center" }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <List
                      dense
                      sx={{ bgcolor: "white", width: "80%", borderRadius: 2 }}
                    >
                      {arr.map((a) => (
                        <ListItem key={a}>
                          <ListItemIcon>
                            <SchoolOutlined />
                          </ListItemIcon>
                          <ListItemText primary="150+ hours of recorded videos" />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions></CardActions>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
          {/* </Box> */}
        </Container>
      </CssBaseline>
    </>
  );
};

export default SingleCourse;
