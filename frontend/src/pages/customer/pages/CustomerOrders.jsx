import React, { useEffect, useState } from 'react';
import {
    Menu, Button, MenuItem, Typography, Stack,
    Container, CircularProgress, Card, CardContent, Chip
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { listClasses } from '@mui/material/List';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificProducts } from '../../../redux/userHandle';

const CustomerOrders = () => {
    const dispatch = useDispatch();
    const { currentUser, loading, specificProductData, responseSpecificProducts } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSpecificProducts(currentUser._id, "getOrderedProductsByCustomer"));
    }, [dispatch, currentUser]);

    const [open, setOpen] = useState(null);
    const [selectedOption, setSelectedOption] = useState('newest');

    const sortOptions = [
        { value: 'oldest', label: 'Oldest' },
        { value: 'newest', label: 'Newest' }
    ];

    const handleOpen = (event) => setOpen(event.currentTarget);
    const handleClose = () => setOpen(null);
    const handleMenuItemClick = (value) => {
        setSelectedOption(value);
        handleClose();
    };

    // Helper function to determine order status
    const getOrderStatus = (orderTime) => {
        const orderDate = new Date(orderTime);
        const now = new Date();
        const diffHours = (now - orderDate) / (1000 * 60 * 60);

        if (diffHours < 1) return { label: 'Processing', color: 'info' };
        if (diffHours < 3) return { label: 'Pending', color: 'warning' };
        return { label: 'Delivered', color: 'success' };
    };

    const sortedData = [...(specificProductData || [])].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return selectedOption === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
                My Orders
            </Typography>

            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
                sx={{ mb: 3 }}
            >
                <Button
                    color="inherit"
                    onClick={handleOpen}
                    endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    sx={{ fontWeight: 600 }}
                >
                    Sort By:&nbsp;
                    <Typography variant="subtitle2" color="text.secondary">
                        {sortOptions.find(opt => opt.value === selectedOption)?.label}
                    </Typography>
                </Button>

                <Menu
                    anchorEl={open}
                    open={!!open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    slotProps={{
                        paper: {
                            sx: {
                                [`& .${listClasses.root}`]: { p: 0 }
                            }
                        }
                    }}
                >
                    {sortOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === selectedOption}
                            onClick={() => handleMenuItemClick(option.value)}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </Stack>

            {loading ? (
                <Stack alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
                    <CircularProgress />
                </Stack>
            ) : responseSpecificProducts ? (
                <Typography variant="h6" align="center" color="text.secondary">
                    No Orders Till Now
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {sortedData.map((product, index) => {
                         console.log('createdAt raw value:', product.createdAt);  // Debug line
                         console.log('Parsed date:', new Date(product.createdAt).toLocaleString());
                        const status = getOrderStatus(product.createdAt);

                        return (
                            <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card elevation={3} sx={{ borderRadius: 3 }}>
                                    <ProductCard product={product} />
                                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Ordered: {new Date(product.createdAt).toLocaleString()}
                                        </Typography>
                                        <Chip label={status.label} color={status.color} size="small" />
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
};

export default CustomerOrders;