import {useRef, useState, useEffect} from 'react';
import './Register.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef();
    const [open, setOpen] = useState(false);
    const [vertical, horizontal] = ["top", "center"];

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccessMsg] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token === null || token === undefined){
            setLoggedIn(false);
        }
        else{
            setLoggedIn(true);
        }
    }, [])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    function openSnackBar() {
        setOpen(true);
        setTimeout(() => setOpen(false), 3000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg('Invalid Entry'); openSnackBar();
            return;
        }

        if (user === '' || pwd === '' || matchPwd === '') {
            setErrMsg('All fields are required'); openSnackBar();
            return;
        }
        if (pwd !== matchPwd) {
            setErrMsg('Passwords do not match'); openSnackBar();
            return;
        }

        //Using this as Backend is not ready yet
        setSuccessMsg(true);
        localStorage.setItem("user", user);
        localStorage.setItem("password", pwd);
        setUser('');
        setPwd('');
        setMatchPwd('');

        // try {
        //     const res = await fetch('/api/register', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             username: user,
        //             password: pwd
        //         })
        //     });
        //     const data = await res.json();
        //     if (data.success) {
        //         setSuccessMsg(true);
        //         setUser('');
        //         setPwd('');
        //         setMatchPwd('');
        //     } else {
        //         setErrMsg(data.msg);
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    }

    if(loggedIn === true)
        return <Navigate to="/dashboard"/>
    return(
        <>
            {success ? (
                <div className="form-div">
                    <h1>Account Created Successfully</h1>
                    <p style={{margin: '12px 0'}}><Link to="/">Sign in to Your Account</Link></p>
                </div>
            ) : (
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="form-div">
                                <Snackbar anchorOrigin={{ vertical, horizontal }} open={open}>
                                    <Alert severity="error" sx={{ width: '100%' }}>
                                    {errMsg}
                                    </Alert>
                                </Snackbar>
                                <h1>Create Account</h1>
                                <form onSubmit={handleSubmit}>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="username">
                                            Username:
                                            <span className={validName ? "valid" : "hide"}>
                                                &#10003;
                                            </span>
                                            <span className={validName || !user ? "hide" : "invalid"}>
                                                &#x292B;
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setUser(e.target.value)}
                                            required
                                            aria-invalid={validName ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                        />
                                        <Form.Text id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                            4 to 24 characters.
                                            Must start with a letter.
                                            Must contain only letters, numbers, and underscores.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="password">
                                            Password:
                                            <span className={validPwd ? "valid" : "hide"}>
                                                &#10003;
                                            </span>
                                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                                &#x292B;
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            required
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                        <Form.Text id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                                            8 to 24 characters.
                                            Must includes uppercase and lowercase letters, a number and a special character.
                                            Allowed Special characters: 
                                            <span aria-label="exclamation mark">!</span>
                                            <span aria-label="at symbol">@</span>
                                            <span aria-label="hashtag">#</span>
                                            <span aria-label="dollar sign">$</span>
                                            <span aria-label="percent">%</span>
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="confirm_password">
                                            Confirm Password:
                                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                                &#10003;
                                            </span>
                                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                                &#x292B;
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="confirm_password"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            required
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirm_note"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                        <Form.Text id="confirm_note" className={matchFocus && matchPwd && !validMatch ? "instructions" : "offscreen"}>
                                            Password and Confirm Password must be same.
                                        </Form.Text>
                                    </Form.Group>

                                    <Button type="submit" disabled={!validName || !validPwd || !validMatch ? true : false} variant="primary">Sign Up</Button>
                                    
                                    <hr />
                                    
                                    <p>Already a User? <Link to="/">Login</Link></p>

                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default Register;