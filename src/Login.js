 import { useRef, useState, useEffect } from 'react';
 import useAuth from './hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

 import axios from './api/axios';

 const LOGIN_URL = '/admin/auth/login';

 const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loginStatus, setLoginStatus] = useState('Sign in');

    
    useEffect(() => {
        emailRef.current.focus();
    }, []) 

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoginStatus('Signing in ...')
        
        try {
            const body = { 
                email, 
                password : pwd,
            };

            console.log(body);
            
            const response = await axios.post(LOGIN_URL,
                body,
                {
                    headers: { 'Accept' : 'application/json' }
                }
            );
            console.log(body);
            console.log(response);
            
            const token = response?.data?.accessToken;
            setAuth({ email, pwd, token });
            //alert(response?.data?.message);
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });

            // clear input fields
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(err.response?.data?.message);
            }
            errRef.current.focus();
        }

        setLoginStatus('Sign in');
    }

    return (
        <>
        <div className="auth">
            <div className="auth-container">
                <div className="card">
                    <header className="auth-header">
                        <h1 className="auth-title">
                            <div className="logo">
                                <span className="l l1"></span>
                                <span className="l l2"></span>
                                <span className="l l3"></span>
                                <span className="l l4"></span>
                                <span className="l l5"></span>
                            </div>
                        </h1>
                    </header>
                    <section>
                        <div className="auth-content">

                            <p ref={errRef} className={errMsg ? "errmsg mb-4" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <form onSubmit={handleSubmit}>
                                
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="email">
                                            Email:
                                        </label>
                                        <input 
                                            type="text"
                                            id="email"
                                            ref={emailRef}
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            className="form-control underlined"
                                        />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="password">
                                            Password:
                                        </label>
                                        <input 
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            required
                                            className="form-control underlined"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button 
                                        disabled={!email || !pwd ? true : false}
                                        className="btn btn-block btn-primary mt-3"
                                    >
                                        {loginStatus}
                                    </button>
                                </div>
                            </form>

                            <p>
                                Need an Account? 
                                <span className="line ml-2">
                                    {/*put router link here*/}
                                    <Link to="/">Sign Up</Link>
                                </span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </>
    )
 }

 export default Login