import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo} from "../index.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const Auth = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state => state.auth.isAuthenticated));

    const {register, handleSubmit} = useForm();

    const submit = {
        
    };

    return (
        <form >
            
        </form>
    ) 
}

export default Auth;