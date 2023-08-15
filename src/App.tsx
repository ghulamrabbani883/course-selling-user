import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ShowCourse from "./components/ShowCourse";
import Landing from "./components/Landing";
import SingleCourse from "./components/SingleCourse";
import Purchased from "./components/Purchased";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SecureRoute from "./SecureRoute";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/:courseId" element={<SingleCourse />} />
        <Route path="/courses" element={<ShowCourse />} />
        <Route
          path="/courses/purchased"
          element={
            <SecureRoute>
              <Purchased />
            </SecureRoute>
          }
        />
        <Route path="*" element={<Error404 />} /> 
      </Routes>
      <Footer />
    </>
  );
};

export default App;
