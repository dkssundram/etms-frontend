import React, { useEffect, useState } from 'react';
import './ViewUsers.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const user = {
    name: 'John Doe',
    role: 'Instructor',
    id: 3
};

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState({});
    const [editingUser, setEditingUser] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedRole, setEditedRole] = useState('');

    useEffect(() => {
        // Fetch users data from backend or API
        // Example:
        fetch('http://localhost:5000/api/user/fetchAll')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));

        // Fetch roles data from backend or API
        // Example:
        fetch('http://localhost:5000/api/roles')
            .then(response => response.json())
            .then(data => {
                const rolesMap = {};
                data.forEach(role => {
                    rolesMap[role.id] = role.name.charAt(0).toUpperCase() + role.name.slice(1);
                });
                setRoles(rolesMap);
            })
            .catch(error => console.error('Error fetching roles:', error));
    }, []);

    const handleEditUser = (userId) => {
        // Set editingUser state to the user being edited
        const userToEdit = users.find(user => user.id === userId);
        setEditingUser(userToEdit);
        setEditedName(userToEdit.name);
        setEditedRole(userToEdit.roleId);
    };

    const handleSaveEdit = () => {
        
    };

    const handleDeleteUser = (userId) => {
        // Handle delete user logic
        fetch(`http://localhost:5000/api/user/delete/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('User deleted successfully');
                // Perform any additional actions after successful deletion
            } else {
                console.error('Failed to delete user:', response.statusText);
                // Handle the failure to delete the user
            }
            return response.json(); // This converts the response body to JSON
        })
        .then(data => {
            console.log('Response data:', data);
            // Handle the response data as needed
        })
        .catch(error => console.error('Error deleting user:', error));
        console.log('Delete user:', userId);
    };

    return (
        <>
            {/* <Navbar user={user} /> */}
            <div className="view-users">
                <h2>View Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {users?.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{editingUser && editingUser.id === user.id ? <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : user.name}</td>
                                <td>{editingUser && editingUser.id === user.id ? <input type="text" value={editedRole} onChange={(e) => setEditedRole(e.target.value)} /> : roles[user.roleId]}</td>
                                {/* <td>
                                    {editingUser && editingUser.id === user.id ?
                                        <button onClick={handleSaveEdit}>Save</button> :
                                        <>
                                            <button onClick={() => handleEditUser(user.id)}>Edit</button>
                                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                        </>
                                    }
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users present</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default ViewUsers;
