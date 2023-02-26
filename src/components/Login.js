import React from 'react';
import {useRef, useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Link, Navigate} from 'react-router-dom';

const Login = () =>{

    const userRef = useRef();
    const [open, setOpen] = useState(false);
    const [vertical, horizontal] = ["top", "center"];

    function openSnackBar() {
        setOpen(true);
        setTimeout(() => setOpen(false), 3000);
    }

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [justLoggedOut, setJustLoggedOut] = useState(false);
    useEffect(() => {
        const justLoggedOut = localStorage.getItem("justLoggedOut");
        if(justLoggedOut === 'Y'){
            setJustLoggedOut(true);
            localStorage.removeItem('justLoggedOut');
            setTimeout(() => setJustLoggedOut(false), 3000);
        }
    }, [])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token === null || token === undefined){
            setSuccess(false);
        }
        else{
            setSuccess(true);
        }
    }, [])

    useEffect(() => {
        setErrMsg();
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user || !pwd){
            setErrMsg("Please fill in all fields"); openSnackBar();
            return;
        }

        //Using this as Backend is not ready yet
        let SET_USER = localStorage.getItem("user");
        let SET_PWD = localStorage.getItem("password");
        if(SET_USER === null)
            SET_USER = "admin";
        if(SET_PWD === null)
            SET_PWD = "admin@123";

        if(user === SET_USER && pwd === SET_PWD){
            localStorage.setItem("token", user);
            setSuccess(true);
            setUser('');
            setPwd('');
        }
        else{
            setErrMsg("Incorrect Username or Password"); openSnackBar();
            return;
        }
    }

    return(
        <>
            {success ? (
                <Navigate to="/dashboard" />  
            ) : (
                <Container>
                    <Row>
                        <Col>
                            <div className="form-div">
                                <Snackbar anchorOrigin={{ vertical, horizontal }} open={open}>
                                    <Alert severity="error" sx={{ width: '100%' }}>
                                    {errMsg}
                                    </Alert>
                                </Snackbar>
                                <Snackbar anchorOrigin={{ vertical, horizontal }} open={justLoggedOut}>
                                    <Alert severity="info" sx={{ width: '100%' }}>
                                    You have been logged out Successfully
                                    </Alert>
                                </Snackbar>
                                <h1>Sign In Your Account</h1>
                                <form onSubmit={handleSubmit}>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="username">
                                            Username:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setUser(e.target.value)}
                                            required
                                            value={user}
                                        />
                                    </Form.Group>

                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="password">
                                            Password:
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button type="submit" disabled={!user || !pwd ? true : false} variant="primary">Sign In</Button>
                                    
                                    <hr />
                                    
                                    <p>Not an User? <Link to="/sign-up">Sign Up</Link></p>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default Login;