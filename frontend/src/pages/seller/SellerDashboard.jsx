import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    useTheme,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Drawer, NavLogo } from '../../utils/styles';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Logout from '../Logout';
import SideBar from './components/SideBar';
import SellerHomePage from './pages/SellerHomePage';
import AccountMenu from './components/AccountMenu';
import ShowProducts from './pages/ShowProducts';
import ShowOrders from './pages/ShowOrders';
import ViewProductSeller from './pages/ViewProductSeller';
import AddProduct from './pages/AddProduct';
import { useSelector } from 'react-redux';
import Products from '../../components/Products';
import { productDataList } from '../../utils/products';
import ShopcartSpecial from './pages/ShopcartSpecial';
import ShowCustomers from './pages/ShowCustomers';
import SellerProfile from './pages/SellerProfile';

const SellerDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const { currentRole } = useSelector(state => state.user);
    const navigate = useNavigate();
    const theme = useTheme();

    const homeHandler = () => navigate("/");

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default, color: '#333', fontSize: '16px', padding: '4px' }}>
            <CssBaseline />

            <AppBar open={open} position='absolute' sx={{ backgroundColor: theme.palette.primary.main, boxShadow: 3, padding: '8px' }}>
                <Toolbar sx={{ pr: 2, minHeight: '64px', padding: '12px 24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{ marginRight: 2, padding: '6px', ...(open && { display: 'none' }) }}
                    >
                        <ListIcon fontSize="medium" />
                    </IconButton>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            cursor: "pointer",
                            fontSize: '22px',
                            color: '#fafafa'
                        }}
                        onClick={homeHandler}
                    >
                        <NavLogo>
                            <LocalMallIcon sx={{ mr: 1, fontSize: '28px', color: '#fff' }} /> QUICKKART
                        </NavLogo>
                    </Typography>

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            cursor: "pointer",
                            fontSize: '20px',
                            color: '#ddd'
                        }}
                        onClick={homeHandler}
                    >
                        <NavLogo>
                            <LocalMallIcon sx={{ mr: 1, fontSize: '26px', color: '#eee' }} /> QUICKKART
                        </NavLogo>
                    </Typography>

                    <AccountMenu />
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                <Toolbar sx={styles.toolBarStyled}>
                    <IconButton onClick={toggleDrawer} sx={{ color: '#666' }}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <Divider sx={{ backgroundColor: '#ccc' }} />
                <List component="nav" sx={{ padding: '12px' }}>
                    <SideBar />
                </List>
            </Drawer>

            <Box component="main" sx={styles.boxStyled(theme)}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<SellerHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Seller/dashboard" element={<SellerHomePage />} />
                    <Route path="/Seller/profile" element={<SellerProfile />} />
                    <Route path="/Seller/addproduct" element={<AddProduct />} />
                    <Route path="/Seller/products" element={<ShowProducts />} />
                    <Route path="/Seller/products/product/:id" element={<ViewProductSeller />} />
                    {currentRole === "Shopcart" && (
                        <>
                            <Route path="/Seller/shopcart" element={<ShopcartSpecial />} />
                            <Route path="/Seller/uploadproducts" element={<Products productData={productDataList} />} />
                        </>
                    )}
                    <Route path="/Seller/orders" element={<ShowOrders />} />
                    <Route path="/Seller/orders/customers/:id" element={<ShowCustomers />} />
                    <Route path="/Seller/orders/product/:id" element={<ViewProductSeller />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default SellerDashboard;

const styles = {
    boxStyled: (theme) => ({
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        padding: 3,
        borderRadius: 3,
        margin: 2,
        overflow: 'auto',
        fontSize: '15px',
        color: theme.palette.text.primary,
        marginTop: '16px'
    }),
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
        backgroundColor: '#e0e0e0',
        height: '64px'
    },
    drawerStyled: {
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#f9f9f9',
            boxShadow: 3,
            padding: '12px'
        },
    },
    hideDrawer: {
        display: 'none',
        '@media (min-width: 600px)': {
            display: 'block',
        },
    },
};
