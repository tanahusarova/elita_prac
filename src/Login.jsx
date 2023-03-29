import {useState, useRef, useEffect, useContext} from "react"
const LOGIN_URL = '/auth';

export const Login = (props) => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
    }

    return (
        <div>
            {success ? (
                props.onFormSwitch('calendar')
        ) : (
        <div className="front-pages">
        <div className="auth-form-container">
        <warning ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</warning>

        <napis>ELITA</napis>
        <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="email">email</label>
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                ref={userRef}
                placeholder="elitak@gmail.com" 
                id="email" 
                name="email" 
                autoComplete="off" 
                required
            />
            <label htmlFor="password">password</label>
            <input 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                type="password" 
                placeholder="••••••••" 
                id="password"  
                name="password" 
                required 
                />
        <button 
            className="button-front-page" 
            type="submit" >Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
        </div>
        )}
        </div>
    )
}