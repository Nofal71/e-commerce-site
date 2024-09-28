import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Typography, Switch, Divider, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editAdmin } from '../../../../redux/slices/adminSlice';
import { currentUserProvider } from '../../../../Context/CurrentUser';
import { getAllUsers } from '../../../../redux/Selectors/UserSelector/AdminSiteSelector';


const ManageUsers = () => {

    const users = useSelector(getAllUsers);
    const dispatch = useDispatch();    
    const { currentUserEmail } = useContext(currentUserProvider)


    const handleAdminToggle = (userId, current) => {
        dispatch(editAdmin({ userId, admin: !current }));
    };
    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Manage Users
            </Typography>
            <List>
                {users.map((user) => {
                    return (
                        <div key={user.userId}>
                            <ListItem>
                                <ListItemText
                                    primary={user.userDetails.name}
                                    secondary={`Phone: ${user.userDetails.phone}`}
                                />
                                {
                                    user.userDetails.email !== currentUserEmail && (
                                        <Box display={'flex'} flexDirection={'column'} gap={'5px'}>
                                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                                Admin Access:
                                                <Switch
                                                    checked={user.admin}
                                                    onChange={() => handleAdminToggle(user.userId, user.admin)}
                                                    color="primary"
                                                />
                                            </Typography>
                                            <Button onClick={() => handleDelete(user.userId)}>Delete User</Button>
                                        </Box>
                                    )
                                }
                            </ListItem>
                            <Divider />
                        </div>
                    );
                })}
            </List>
        </>
    );
};

export default ManageUsers;
