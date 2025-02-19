import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setEmail('');
            Swal.fire({
                icon: 'success',
                title: 'Subscribed!',
                text: 'Thank you for subscribing to TechNest\'s newsletter!',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Please enter a valid email address.',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div className="newsletter-section py-12 text-gray-100 bg-gray-800">
            <div className="w-11/12 mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-lg text-gray-300 mb-6">
                Stay updated with the latest product launches and tech news.</p>
                <form 
                    onSubmit={handleSubscribe} 
                    className="flex flex-col w-9/12 mx-auto sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full sm:w-96 rounded-md p-3 text-gray-300"
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;