import React from "react";
import { Link } from "react-router-dom";

const SalesPromotion = () => {
  return (
    <section className="py-12 bg-gray-700 text-white">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Exclusive Deals!</h2>
        <p className="text-lg mb-6">
          Enjoy up to <strong>50% off</strong> on the latest smart gadgets. Limited-time offer—don't miss out!
        </p>
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </div>
    </section>
  );
};

export default SalesPromotion;
