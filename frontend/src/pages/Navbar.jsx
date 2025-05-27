import * as React from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem,
    Button, Tooltip, Avatar, Divider, Drawer, Badge, ListItemIcon, Container
} from '@mui/material';
import {
    Search as SearchIcon, Login, Logout, Shop2, Store, ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Cart from './customer/components/Cart';
import Search from './customer/components/Search';
import ProductsMenu from './customer/components/ProductsMenu';
import { updateCustomer } from '../redux/userHandle';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser, currentRole } = useSelector(state => state.user);
    const totalQuantity = currentUser?.cartDetails?.reduce((total, item) => total + item.quantity, 0) || 0;

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElSign, setAnchorElSign] = React.useState(null);
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    React.useEffect(() => {
        if (currentRole === "Customer") {
            dispatch(updateCustomer(currentUser, currentUser._id));
        }
    }, [currentRole, currentUser, dispatch]);

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "rgb(94, 142, 168)" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

                    {/* LEFT: LOGO */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LogoText onClick={() => navigate("/")}>
                            QUICKKART
                        </LogoText>
                    </Box>

                    {/* CENTER: NAV MENU */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Search />
                        <ProductsMenu dropName="Categories" />
                        <ProductsMenu dropName="Products" />
                        <Button color="inherit" onClick={() => navigate("/about")}>About Us</Button>
                    </Box>

                    {/* RIGHT: ACCOUNT / CART / SIGNIN */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {currentRole === "Customer" && (
                            <>
                                <Tooltip title="Cart">
                                    <IconButton onClick={() => setIsCartOpen(true)} color="inherit">
                                        <Badge badgeContent={totalQuantity} color="error">
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Account settings">
                                    <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} color="inherit">
                                        <Avatar sx={{ bgcolor: "#8970dc", width: 32, height: 32 }}>
                                            {String(currentUser?.name || "").charAt(0)}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={() => setAnchorElUser(null)}
                                    PaperProps={{ sx: styles.styledPaper }}
                                >
                                    <MenuItem onClick={() => navigate("/Profile")}>
                                        <Avatar />
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate("/Orders")}>
                                        <ListItemIcon><Shop2 fontSize="small" /></ListItemIcon>
                                        My Orders
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => navigate("/Logout")}>
                                        <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}

                        {currentRole === null && (
                            <>
                                <Button onClick={(e) => setAnchorElSign(e.currentTarget)} color="inherit">
                                    Sign In
                                </Button>

                                <Menu
                                    anchorEl={anchorElSign}
                                    open={Boolean(anchorElSign)}
                                    onClose={() => setAnchorElSign(null)}
                                    PaperProps={{ sx: styles.styledPaper }}
                                >
                                    <MenuItem onClick={() => navigate("/Customerlogin")}>
                                        <Avatar />
                                        Sign in as Customer
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => navigate("/Sellerlogin")}>
                                        <ListItemIcon><Store fontSize="small" /></ListItemIcon>
                                        Sign in as Seller
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>

            <Drawer
                anchor="right"
                open={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 400,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Cart setIsCartOpen={setIsCartOpen} />
            </Drawer>
        </AppBar>
    );
};

export default Navbar;

const LogoText = styled.div`
    font-family: 'monospace';
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: .2rem;
    color: white;
    cursor: pointer;
`;

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
};
