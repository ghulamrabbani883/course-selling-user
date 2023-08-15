import { useEffect } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { BASE_URL, CourseType, courseState, parseToken } from "../state/atoms/useratoms";
import Loader from "./Loader";

const ShowCourse = () => {
  const token = parseToken();
  const [{allCourse, isCourseLoading}, setCourseState] = useRecoilState(courseState)

  useEffect(() => {
    const fetchCourses = async () => {
      axios.defaults.headers.common["bearertoken"] = token;
      setCourseState((prev)=>{
        return {...prev, isCourseLoading:true}
      })
      const res = await axios.get(BASE_URL + `/courses/`);
      setCourseState((prev)=>{
        return {...prev, allCourse:res.data.courses, isCourseLoading:false}
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
            All Courses
          </Typography>
          <Container maxWidth="lg">
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              {allCourse.length === 0 ? (
                <Typography variant="h5">No course available yet</Typography>
              ) : (
                allCourse.map((course: CourseType) => {
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
                            {course.title}
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
                            to={{
                              pathname: `/courses/${course.courseid}`,
                            }}
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

export default ShowCourse;
