import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";



function Header() {
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sleep = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    useEffect(() => {
        console.log(userData);
        const body = document.querySelector('header');
        console.log(body);
        body.style.backgroundImage = "linear-gradient(162deg, rgb(221, 51, 92) 0%, rgb(2, 6, 23) 29%, white)"
    }, [])
    return (
        <header className="text-7xl mx-auto text-white mb-10 rounded-xl">
            <div className="w-[80vw] mx-auto p-4 flex justify-between">
                <h1 className="">BlogPost</h1>
                <button
                    type="submit"
                    className={`text-2xl ${userData === null ? 'scale-0' : 'scale-100'}  text-blue-950 border-2 border-blue-900 rounded-xl p-3 hover:scale-80 hover:text-[1.3rem] duration-1000`}
                    onClick={async () => {
                        const body = document.querySelector('body');
                        body.classList.add('pageTransition');
                        await sleep(500);
                        body.classList.remove('pageTransition');
                        body.classList.add('pageUptransition');
                        navigate('/login')
                        await sleep(500);
                        body.classList.remove('pageUptransition');
                        await sleep(100)
                        dispatch(logout());
                    }}
                >LogOut</button>
            </div>
        </header>
    )
}

// 


export default Header