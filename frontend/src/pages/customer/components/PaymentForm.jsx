import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { fetchProductDetailsFromCart, removeAllFromCart, removeSpecificProduct } from '../../../redux/userSlice';
import axios from 'axios';

const PaymentForm = ({ handleBack }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { status, currentUser, productDetailsCart } = useSelector(state => state.user);

    const params = useParams();
    const productID = params.id;

    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (productID) {
            dispatch(fetchProductDetailsFromCart(productID));
        }
    }, [productID, dispatch]);

    const productsQuantity = currentUser.cartDetails.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = currentUser.cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

    const singleProductQuantity = productDetailsCart && productDetailsCart.quantity
    const totalsingleProductPrice = productDetailsCart && productDetailsCart.price && productDetailsCart.price.cost * productDetailsCart.quantity

    // Dummy paymentInfo for order data
    const paymentInfo = { id: `razorpay-${Date.now()}`, status: "Successful" }

    const multiOrderData = {
        buyer: currentUser._id,
        shippingData: currentUser.shippingData,
        orderedProducts: currentUser.cartDetails,
        paymentInfo,
        productsQuantity,
        totalPrice,
    }

    const singleOrderData = {
        buyer: currentUser._id,
        shippingData: currentUser.shippingData,
        orderedProducts: productDetailsCart,
        paymentInfo,
        productsQuantity: singleProductQuantity,
        totalPrice: totalsingleProductPrice,
    }

    const handleRazorpayPayment = async (amount, onSuccess) => {
        setLoading(true);
        try {
            const { data: order } = await axios.post('http://localhost:5000/createOrder', {
                amount,
            });
            const options = {
                key: 'rzp_test_NoPxamwiJdRx98',
                amount: order.amount,
                currency: order.currency,
                name: 'QuickKart',
                description: 'Order Payment',
                order_id: order.id,
                handler: function (response) {
                    onSuccess(response);
                },
                prefill: {
                    name: currentUser.name,
                    email: currentUser.email,
                },
                theme: {
                    color: '#1976d2',
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                setMessage('Payment Failed');
                setShowPopup(true);
                setLoading(false);
            });
            rzp.open();
        } catch (err) {
            setMessage('Failed to initiate payment');
            setShowPopup(true);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        let amount = productID ? totalsingleProductPrice : totalPrice;
        if (!amount) {
            setMessage('Invalid amount');
            setShowPopup(true);
            return;
        }
        await handleRazorpayPayment(amount, (razorpayResponse) => {
            if (productID) {
                dispatch(addStuff("newOrder", singleOrderData));
                dispatch(removeSpecificProduct(productID));
            } else {
                dispatch(addStuff("newOrder", multiOrderData));
                dispatch(removeAllFromCart());
            }
        });
    };

    useEffect(() => {
        if (status === 'added') {
            navigate('/Aftermath');
        }
        else if (status === 'failed') {
            setMessage("Order Failed")
            setShowPopup(true)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
        }
    }, [status, navigate]);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* No card fields, only payment button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        type='submit'
                        sx={{ mt: 3, ml: 1 }}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Pay with Razorpay'}
                    </Button>
                </Box>
            </form>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </React.Fragment>
    );
}

export default PaymentForm;
