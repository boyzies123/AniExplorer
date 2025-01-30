const Login = () =>{
    return (
        <div class="login-bg">
            <div class="login-container">
                <h1>Login</h1>
                <form>
                    <label for="username">Username</label>
                    <br></br>
                    <input class="bar" type="text" id="username" name="username"/>
                    <br></br>
                    <label for="password">Password</label>
                    <br></br>
                    <input class="bar" type="password" id="password" name="password"/>
                    <br></br>
                    <br></br>
                    <button id="login-button">Login</button>
                    {/*Temp link*/}
                    <br></br>
                    <a href="#Forgot Password">Forgot Password?</a>
                    <br></br>
                    Not a user? <a href="#Create Account">Create an account</a>
                </form>
            </div>
        </div>
    )
}
export default Login