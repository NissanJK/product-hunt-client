import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const subscriptionPrice = 100; 

    useEffect(() => {
        if (subscriptionPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: subscriptionPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Error creating payment intent:', err);
                });
        }
    }, [axiosSecure, subscriptionPrice]);

    const handleSubscribe = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('Payment error:', error);
            setError(error.message);
        } else {
            console.log('Payment method:', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('Confirm error:', confirmError);
            setError(confirmError.message);
        } else {
            console.log('Payment intent:', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction ID:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: subscriptionPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), 
                    status: 'completed',
                };

                const res = await axiosSecure.post('/payments', payment);
                console.log('Payment saved:', res.data);

                if (res.data?.paymentResult?.insertedId) {
                    const updateResult = await axiosSecure.patch(`/users/update-subscription/${user.email}`, {
                        isSubscribed: true,
                    });

                    if (updateResult.data?.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Subscription successful!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        navigate('/dashboard/myProfile');
                    }
                }
            }
        }
    };

    return (
        <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="space-y-4">
                <p>
                    <strong>Name:</strong> {user?.displayName}
                </p>
                <p>
                    <strong>Email:</strong> {user?.email}
                </p>
                <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                />
                {!user?.isSubscribed && (
                    <form onSubmit={handleSubscribe}>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        <button
                            className="btn btn-sm btn-primary my-4"
                            type="submit"
                            disabled={!stripe || !clientSecret}
                        >
                            Subscribe for ${subscriptionPrice}
                        </button>
                        <p className="text-red-600">{error}</p>
                        {transactionId && (
                            <p className="text-green-600">Your transaction ID: {transactionId}</p>
                        )}
                    </form>
                )}
                {user?.isSubscribed && (
                    <p className="text-green-500">Membership Status: Verified</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;