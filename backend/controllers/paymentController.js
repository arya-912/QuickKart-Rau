const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;
        if (!amount) return res.status(400).json({ error: 'Amount is required' });
        const options = {
            amount: amount * 100, // amount in paise
            currency,
            receipt: receipt || `rcpt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create Razorpay order', details: err.message });
    }
};

const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: 'Missing fields for verification' });
    }
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
    if (generated_signature === razorpay_signature) {
        return res.json({ success: true, message: 'Payment verified' });
    } else {
        return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
};

module.exports = {
	createOrder,
	verifyPayment,
};