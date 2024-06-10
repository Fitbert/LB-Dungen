import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('your-publishable-key-here');

const Donate = () => {
  return (
    <div className="donate-page">
      <div className="donate-container">
        <h1 className="donate-heading">Make a Donation</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Donate;