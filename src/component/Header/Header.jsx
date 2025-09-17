import { useDispatch, useSelector } from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import { useEffect } from "react";
import Container from "../container/Container.jsx";
import {Logo, Button} from "../index.js";
import LogoutBtn from "./LogoutBtn.jsx";
// import Signup from "../../pages/Signup.jsx";
// import Login from "../../pages/Login.jsx";

const Header = () => {
    const authStatus = useSelector((state) => state.auth.isAuthenticated);

    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        // {
        //     name: 'UserProfile',
        //     slug: '/userProfile',
        //     active: true
        // }
    ]

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>

                    <ul className="flex ml-auto">
                        {navItems.map((item) => 
                        item.active ? (
                            <li key={item.name} className="mx-3">
                                <Button
                                    onClick={() => navigate(item.slug)}
                                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                >
                                    {item.name}
                                </Button>
                            </li>
                        ) : null
                        )}

                        { authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;