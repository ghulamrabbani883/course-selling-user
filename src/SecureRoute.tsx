import { Navigate, useLocation } from "react-router-dom";
import { parseToken } from "./state/atoms/useratoms";


interface LayoutProps  { 
  children: React.ReactNode
}

const SecureRoute = (props: LayoutProps) => {
    const token = parseToken();
    const location = useLocation()
    if(token === 'null' || token === 'undefined' || !token) {
      return <Navigate to="/login" state={{ from: location}} replace />
  }
  return <>{props.children}</>;
};

export default SecureRoute;
