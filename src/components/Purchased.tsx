import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL, CourseType, courseState, parseToken } from "../state/atoms/useratoms";
import { useRecoilState } from "recoil";
import Loader from "./Loader";

const Purchased = () => {
  const [purchasedCourse, setPurchasedCourse] = useState([]);
  const token = parseToken();
  const [{isCourseLoading}, setCourseState] = useRecoilState(courseState)

  useEffect(() => {
    const fetchCourses = async () => {
      axios.defaults.headers.common["bearertoken"] = token;
      setCourseState((prev)=>{
        return {...prev, isCourseLoading:true}
      })
      const res = await axios.post(BASE_URL + `/purchasedCourses`, {
        publicid: localStorage.getItem('publicId'),
      });
      console.log(res.data)
      setPurchasedCourse(res.data.courses);
      setCourseState((prev)=>{
        return {...prev, isCourseLoading:false}
      })
    };
    fetchCourses();
  }, []);

  if(isCourseLoading){
    return <Loader />
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          paddingLeft: "100px",
          paddingRight: "100px",
          paddingBottom: "50px",
          //   backgroundColor: "grey",
          "@media screen and (max-width: 600px)": {
            paddingLeft: "50px",
            paddingRight: "50px",
          },
          "@media screen and (max-width: 400px)": {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        }}
      >
        <CssBaseline>
          <Typography
            variant="h3"
            component={"div"}
            padding={"50px 0px"}
            align="center"
          >
            Your Purchased Courses
          </Typography>
          <Container maxWidth="lg">
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              {purchasedCourse.length === 0 ? (
                <Typography variant="h5">
                  You dont have any purchased course
                </Typography>
              ) : (
                purchasedCourse?.map((course: CourseType) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={course.courseid}
                      // sx={{ flexGrow: 1 }}
                    >
                      <Card
                        variant="outlined"
                        sx={{ boxShadow: 3, padding: 1 }}
                      >
                        <CardMedia
                          sx={{ height: 140 }}
                          image={course.imagelink}
                          title={course.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {course.title}{" "}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.description}
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6" color="secondary">
                            $ {course.price}
                          </Typography>
                          <Link
                            to={{ pathname: `/courses/${course.courseid}` }}
                          >
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                            >
                              See Course
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Container>
        </CssBaseline>
      </Container>
    </>
  );
};

export default Purchased;
