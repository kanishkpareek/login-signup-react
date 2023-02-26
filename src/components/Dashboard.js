import React from 'react';
import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';

const Dashboard = () => {

    const [success, setSuccess] = useState(true);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token === null || token === undefined){
            setSuccess(false);
        }
        else{
            setToken(token);
        }
    }, [])

    return(
        <>
            {!success ? (
                <Navigate to="/" />  
            ) : (
                <Container>
                    <Row>
                        <Col>
                            <div className="form-div">
                                <h1 style={{lineHeight: '1.4'}}>Hello {token},<br/> This is your Dashboard</h1>
                                <p style={{margin: '12px 0'}}><Link to="/logout">Logout</Link></p>
                            </div>
                        </Col>
                    </Row>
                </Container> 
            )}
        </>
    )
}

export default Dashboard;