import {Link} from "react-router-dom";
const Login = () =>{
    return (
        <div className="bg">
            <div className="login-container">
                <h1>Login</h1>
                <form>
                    <label for="username"></label>
                    <br></br>
                    <input type="text" id="username" name="username" placeholder="Username"/>
                    <br></br>
                    <label for="password"></label>
                    <br></br>
                    <input type="password" id="password" name="password" placeholder="Password"/>
                    <br></br>
                    <br></br>
                    <button className="button">Login</button>
                    {/*Temp link*/}
                    <br></br>
                    <a href="#Forgot Password">Forgot Password?</a>
                    <br></br>
                    Not a user? <Link to={"/CreateAccount"}>Create an account</Link>
                </form>
            </div>
        </div>
    )
}
export default Login