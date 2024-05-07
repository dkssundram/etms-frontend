import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavLink, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Navbar.css'

const Navigationbar = ({ user }) => {
    const navigate = useNavigate();
    const [topMessages, setTopMessages] = useState([]);
    const [showPopover, setShowPopover] = useState(false);

    const fetchMessages = () => {
        axios.get("http://localhost:5000/api/broadcast/").then((response) => {
            const sortedMessages = response.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setTopMessages(sortedMessages.slice(0, 3));
        });
    };

    useEffect(() => {
        fetchMessages(); // Fetch messages initially
    }, []);

    const renderMessages = () => {
        if (!topMessages) {
            return null; // or return a loading indicator
        }

        return (
            <Popover id="popover-messages">
                <Popover.Header as="h3">Top Messages</Popover.Header>
                <Popover.Body>
                    {topMessages.map((messageData) => (
                        <div key={messageData.id}>{messageData.message}</div>
                    ))}
                </Popover.Body>
            </Popover>
        );
    };

    const handleMessagesHover = () => {
        fetchMessages(); // Fetch messages when hovering over the button
        setShowPopover(true);
    };

    const handleMessagesLeave = () => {
        setShowPopover(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        // window.location.reload()
        
    };

    const getRoleName = (roleId) => {
        switch (roleId) {
            case 1:
                return 'Admin';
            case 2:
                return 'Employee';
            case 3:
                return 'Intern';
            case 4:
                return 'Trainer';
            default:
                return '';
        }
    };

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink eventKey="1" >JMAN</NavLink>
                    {/* <NavLink eventKey="2" as={Link} to="/about">About</NavLink>
                    <NavLink eventKey="3" as={Link} to="/contact">Contact</NavLink> */}
                    
                </Nav>
                <div className="me-3 text-white">{user.name}</div>
                <div className="me-3 text-white">{getRoleName(user.roleId)}</div>
                </Navbar.Collapse>
            <div className="d-flex align-items-center">
                {topMessages.length > 0 && (
                    <OverlayTrigger
                    trigger="manual"
                    placement="bottom"
                    overlay={renderMessages()}
                    show={showPopover}
                >
                    <div
                        className="d-flex align-items-center"
                        onMouseEnter={handleMessagesHover}
                        onMouseLeave={handleMessagesLeave}
                    >
                        <button className="btn btn-outline-light me-3">Messages</button>
                    </div>
                </OverlayTrigger>
                )}
                <button className="btn btn-outline-light" onClick={logout}>Logout</button>
            </div>
            
        </Navbar>
    );
};

export default Navigationbar;
