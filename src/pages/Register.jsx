import React  from 'react'
import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db} from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        console.log(file)

        try{
            console.log("Entered outer try");
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    setErr(true);
                }, 
                () => {
                    try{
                        console.log("Entered Arrow function");
                        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                            try{
                                await updateProfile(res.user,{
                                    displayName,
                                    photoURL:downloadURL
                                });
                                console.log("await setDoc");
                                await setDoc(doc(db, "users", res.user.uid),{
                                    uid : res.user.uid,
                                    displayName,
                                    email,
                                    photoURL : downloadURL
                                });
                                console.log("Exited Arrow function");
                                await setDoc(doc(db,"userChats", res.user.uid), {});
                                navigate("/")
                                // start here
                            }
                            catch(err)
                            {
                                console.log("Error");
                            }
                            finally{
                                await setDoc(doc(db,"userChats", res.user.uid), {});
                                navigate("/")
                            }

                        });
                    }
                    catch(exp)
                    {
                        console.log("Error in inner try");
                    }
                }
            );


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
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='display-name'/>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <input style={{display : "none"}} type="file" id='file'/>
                    <label htmlFor="file">
                        <img src={Add} alt="avatar image" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span>Something went wrong!</span>}
                </form>
                <p>You do have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register