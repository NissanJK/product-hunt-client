import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const PaymentForm = ({ subscriptionPrice }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (subscriptionPrice > 0) {
      axiosSecure.post("/create-payment-intent", { price: subscriptionPrice })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(err => console.error("Error creating payment intent:", err));
    }
  }, [axiosSecure, subscriptionPrice]);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }
    setError("");

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: subscriptionPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: "completed",
      };

      const res = await axiosSecure.post("/payments", payment);
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
          navigate("/dashboard/myProfile");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="w-full max-w-md mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="p-3 border border-gray-300 rounded-md bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Subscribe for ${subscriptionPrice}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {transactionId && <p className="text-green-600 mt-2">Your transaction ID: {transactionId}</p>}
    </form>
  );
};

export default PaymentForm;
