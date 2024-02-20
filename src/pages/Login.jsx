import React  from 'react'
import Add from "../img/addAvatar.png"
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"


const Login = () => {

    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")

        }
        catch(err)
        {
            console.log("ERROR herecvsd :")
            console.log(err)
            setErr(true)
        }
    };



    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chatter-Box</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <button>Sign In</button>
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
                {err && <span>Something went wrong!</span>}
            </div>
        </div>
    )
}

export default Login