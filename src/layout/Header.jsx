import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Typography from '@mui/material/Typography';



const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hideMidButtons = location.pathname === '/register' || location.pathname === '/signin' ||
    location.pathname === '/forget-password' || location.pathname === '/reset-password' ;

    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null); 
    const [notifications, setNotifications] = useState([]); 
    const isNotificationMenuOpen = Boolean(notificationAnchorEl);

    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [anchorEl, setAnchorEl] = useState(null);
    const firstName = localStorage.getItem('firstName') || '';
    const open = Boolean(anchorEl);

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };


    

    useEffect(() => {
        const token = localStorage.getItem('authtoken'); 
        setIsAuthenticated(!!token); 
    }, [location]); 

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const randomNotifications = [
            "Happy Diwali",
            "Your order has been shipped! Delivered by today",
            "Meeting at 2 PM",
            "New comment on your post",
            "System update available"
        ];
        setNotifications(randomNotifications);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authtoken'); 
        localStorage.removeItem('firstName');
        setIsAuthenticated(false); 
        navigate('/signin'); 
    };



    return (
        <header class="bg-[rgba(0,190,219,0.4)] flex justify-center items-center text-xl">
            <nav class='bg-[rgba(0, 190, 219, 0.01)] flex justify-between items-center w-full h-10 m-5 p-2.5'>
                <Link to='/' class='no-underline text-[rgb(11,11,42)]'>
                    <div class='text-3xl font-semibold text-black custom-text-shadow'>
                        <h1>Ninjatech</h1>
                    </div>
                </Link>

                {!isAuthenticated && !hideMidButtons && (
                    <div class='flex gap-4 p-2.5 text-2xl font-medium'>
                        <Link to='/' class='no-underline text-[rgb(11,11,42)]'>
                            Home
                        </Link>

                        <Link class='no-underline text-[rgb(11,11,42)]'>
                            <ScrollLink to="aboutSection" smooth={true} duration={500}>
                                About
                            </ScrollLink>
                        </Link>

                        <Link class='no-underline text-[rgb(11,11,42)]'>
                            <ScrollLink to="contactSection" smooth={true} duration={500}>
                                Contact
                            </ScrollLink>
                        </Link>
                    </div>
                )}

                <div class='flex gap-5 p-2.5'>
                    {!isAuthenticated ? (
                        <>
                            <Button variant="outlined" class='border border-gray-400 rounded-md h-10 transform transition hover:scale-[1.023] hover:border-black hover:bg-white hover:text-black'>
                                <Link to="/register" class='text-lg font-medium p-3'>
                                    Get Started
                                </Link>
                            </Button>

                            <Button variant="outlined" class='border border-gray-400 h-10 rounded-md transform transition hover:scale-[1.023] hover:border-black hover:bg-white hover:text-black'>
                                <Link to="/signin" class='text-lg font-medium p-3'>
                                    Sign In
                                </Link>
                            </Button>
                        </>
                    ) : (
                        // Show user menu when authenticated
                        
                        <React.Fragment>
                            <Box sx={{ display: 'flex', 
                            alignItems: 'center', 
                            textAlign: 'center', 
                             }}>
                                <IconButton
                                    onClick={handleNotificationClick}
                                    sx={{ mr: 1 }}
                                    aria-label="show notifications"
                                    color="inherit">
                                    <NotificationsOutlinedIcon fontSize='large' />
                                </IconButton>

                                {/* Notification Menu */}
                                <Menu
                                    anchorEl={notificationAnchorEl}
                                    open={isNotificationMenuOpen}
                                    onClose={handleNotificationClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    PaperProps={{
                                        
                                        sx: {
                                            width: '300px', 
                                            Height: '600px',    
                                            position: 'relative',
                                            marginTop:'15px',
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: '14px',
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: '#fff',
                                                transform: 'translateY(-50%) rotate(45deg) !important', 
                                                zIndex: 0,
                                            },                                         
                                        },
                                    }}
                                >

                                    {/* Notifications Heading */}
                                    <MenuItem disabled>
                                        <Typography variant="h6" 
                                        sx={{ fontWeight: 'bold',
                                            paddingLeft: '16px',
                                            borderBottom:'1px solid grey',
                                            width:'100%', 
                                            textAlign:'center'}}>
                                            NOTIFICATIONS
                                        </Typography>
                                    </MenuItem>
                                    {notifications.length > 0 ? (
                                        notifications.slice(0,4).map((notification, index) => (
                                            <MenuItem 
                                                key={index} 
                                                onClick={handleNotificationClose}
                                                sx={{
                                                    display: 'block',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                    textOverflow: 'ellipsis', 
                                                    border:'1px solid lightgrey',
                                                    margin: '15px 10px',
                                                    borderRadius: '4px',
                                                    padding: '8px 16px',
                                                    textAlign:'start',
                                                    transition: 'background-color 0.3s, box-shadow 0.3s', 
                                                    '&:hover': {
                                                    backgroundColor: 'white', 
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', 
                                                    },
                                                    }}
                                            >
                                                <Typography 
                                                variant="body2"
                                                sx={{
                                                    width: '100%',          
                                                    whiteSpace: 'nowrap',   
                                                    overflow: 'hidden',     
                                                    textOverflow: 'ellipsis', 
                                                }}
                                                >
                                                    {notification}   
                                                </Typography>
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem onClick={handleNotificationClose}>
                                            <Typography>No new notifications</Typography>
                                        </MenuItem>
                                    )}
                                    {/* <MenuItem> */}
                                        <Button 
                                            onClick={() =>{
                                                navigate('/notification')
                                                handleNotificationClose();
                                            }}
                                            variant='text'
                                             
                                            sx={{
                                                // marginLeft:'210px',
                                                fontSize: '1rem',
                                                borderTop:'1px solid lightgrey',
                                                width:'93%',
                                                margin: '5px 10px'
                                                 }} 
                                            color="inherit"
                                        >
                                            See More
                                        </Button>
                                    {/* </MenuItem> */}
                                </Menu>
                                
                                {/* {profile button} */}
                                <Tooltip title="Menu">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 45, height: 45,
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                                            color: '#fff', 
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            }
                                         }}>
                                            {firstName.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 20,
                                                height: 20,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
