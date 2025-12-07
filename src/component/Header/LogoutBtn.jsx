import { logoutUser } from "../../store/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {Button} from "../index.js";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth.isAuthenticated)

    const logoutHandler = () => {
        if (authStatus) {
            
            dispatch(logoutUser());
        }
    }

    return (
        <Button 
            onClick={logoutHandler}
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        >Logout</Button>
    )
}

export default LogoutBtn;