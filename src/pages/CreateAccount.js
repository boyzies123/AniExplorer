import {Link } from "react-router-dom";
const CreateAccount = () =>{
    return (
        <div className="bg">
            <div className="login-container">
                <h1>Create an account</h1>
                <form>
                    <label for="username"></label>
                    <input id="username" name="username" type="text" placeholder="Username"/>
                    <br></br>
                    <br></br>
                    <label for="email"></label>
                    <input id="email" name="email" type="text" placeholder="Email"/>
                    <br></br>
                    <br></br>
                    <label for="password"></label>
                    <input id="password" name="password" type="password" placeholder="Password"/>
                    <br></br>
                    <br></br>
                    <label for="confirm-password"></label>
                    <input id="confirm-password" name="confirm-password" type="password" placeholder="Confirm Password"/>
                    <br></br>
                    <br></br>
                    <button id="button">Login</button>
                    <br></br>
                    <br></br>
                    Aleady have an account? <Link to={"/Login"}>Login</Link>
                </form>
            </div>
        </div>
    );
}
export default CreateAccount;