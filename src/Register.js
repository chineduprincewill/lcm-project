import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from './api/axios';
import { Link } from 'react-router-dom';

//const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const MOBILE_REGEX = /^[0-9]{11,12}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_URL = '/admin/auth/register';

const Register = () => {
    const fnameRef = useRef();
    const lnameRef = useRef();
    const emailRef = useRef();
    const mobileRef = useRef();
    const errRef = useRef();

    const [fname, setFname] = useState('');
    const [setFnameFocus] = useState(false);

    const [lname, setLname] = useState('');
    const [setLnameFocus] = useState(false);

    const [mobile, setMobile] = useState('');
    const [validMobile, setValidMobile] = useState(false);
    const [mobileFocus, setMobileFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
 
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const [registerStatus, setRegisterStatus] = useState('Sign up');


    useEffect(() => {
        fnameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = MOBILE_REGEX.test(mobile);
        console.log(result);
        console.log(mobile);
        setValidMobile(result)
    }, [mobile])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [fname, lname, email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setRegisterStatus('Signing up ...')
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }
        try {
            const body = { 
                first_name : fname,
                last_name : lname,
                email, 
                phone : mobile,
                password : pwd,
                password_confirmation : matchPwd
            };

            console.log(body);
            
            const response = await axios.post(REGISTER_URL,
                body,
                {
                    headers: { 'Accept' : 'application/json' }
                }
            );
            console.log(body);
            console.log(response);
            setSuccess(true);
            setSuccessMsg(response.data.message);
            
            // clear input fields
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(err.response.data.message);
            }
            errRef.current.focus();
        }

        setRegisterStatus('Sign up');
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
                            {success ? <p className={successMsg ? "successmsg mb-4" : "offscreen"} aria-live="assertive">{successMsg}</p> : 
                            <p ref={errRef} className={errMsg ? "errmsg mb-4" : "offscreen"} aria-live="assertive">{errMsg}</p> }
                            <form onSubmit={handleSubmit}>
                                
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="fname">
                                            First Name:
                                            <span className={fname ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                        </label>
                                        <input 
                                            type="text"
                                            id="fname"
                                            ref={fnameRef}
                                            autoComplete="off"
                                            onChange={(e) => setFname(e.target.value)}
                                            required
                                            className="form-control underlined"
                                            aria-invalid={fname ? "false" : "true"}
                                            onFocus={() => setFnameFocus(true)}
                                            onBlur={() => setFnameFocus(false)}
                                        />
                                    </div>

                                    <div className="form-group col-sm-6">
                                        <label htmlFor="lname">
                                            Last Name:
                                            <span className={lname ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                        </label>
                                        <input 
                                            type="text"
                                            id="fname"
                                            ref={lnameRef}
                                            autoComplete="off"
                                            onChange={(e) => setLname(e.target.value)}
                                            required
                                            className="form-control underlined"
                                            aria-invalid={lname ? "false" : "true"}
                                            onFocus={() => setLnameFocus(true)}
                                            onBlur={() => setLnameFocus(false)}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="mobile">
                                            Mobile No.:
                                            <span className={validMobile ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                            <span className={validMobile || !mobile ? "hide" : "invalid"}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </label>
                                        <input 
                                            type="text"
                                            id="mobile"
                                            ref={mobileRef}
                                            autoComplete="off"
                                            onChange={(e) => setMobile(e.target.value)}
                                            required
                                            className="form-control underlined"
                                            aria-invalid={validMobile ? "false" : "true"}
                                            aria-describedby="mobilenote"
                                            onFocus={() => setMobileFocus(true)}
                                            onBlur={() => setMobileFocus(false)}
                                        />
                                        <p id="mobilenote" className={mobileFocus && mobile && !validMobile ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            11 characters. <br />
                                            Must be numbers only.
                                        </p>
                                    </div>

                                    <div className="form-group col-sm-6">
                                        <label htmlFor="email">
                                            Email:
                                            <span className={validEmail ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                            <span className={validEmail || !email ? "hide" : "invalid"}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </label>
                                        <input 
                                            type="text"
                                            id="email"
                                            ref={emailRef}
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="form-control underlined"
                                            aria-invalid={validEmail ? "false" : "true"}
                                            aria-describedby="emailnote"
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                        />
                                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            Email not properly formatted.
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="password">
                                            Password:
                                            <span className={validPwd ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </label>
                                        <input 
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            required
                                            className="form-control underlined"
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            8 to 24 characters.<br />
                                            Must include uppercase and lowercase letters, a number and special character.<br />
                                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                                            <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                        </p>
                                    </div>
                                    
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="confirm_pwd">
                                            Confirm Password:
                                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </label>
                                        <input 
                                            type="password"
                                            id="confirm_pwd"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            required
                                            className="form-control underlined"
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            Must match the first password input field
                                        </p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button 
                                        disabled={!fname || !lname || !validMobile || !validEmail || !validPwd || !validMatch ? true : false}
                                        className="btn btn-block btn-primary mt-3"
                                    >
                                        {registerStatus}
                                    </button>
                                </div>
                            </form>

                            <p>
                                Already registered? 
                                <span className="line ml-2">
                                    {/*put router link here*/}
                                    <Link to="login">Sign In</Link>
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


export default Register