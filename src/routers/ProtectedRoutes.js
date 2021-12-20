import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedRoutes = (props) => { 
    const { isAuth } = props;
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

ProtectedRoutes.propTypes = {
    isAuth: PropTypes.bool.isRequired,    
}

export default ProtectedRoutes;