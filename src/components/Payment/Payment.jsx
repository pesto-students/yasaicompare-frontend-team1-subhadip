import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY, STRIPE_CLIENT_KEY } from "../../config";

export default function Payment({ response }) {
  console.log(response);
  return (
    <>
      {STRIPE_CLIENT_KEY && STRIPE_PUBLISHABLE_KEY && (
        <Elements
          stripe={loadStripe(STRIPE_PUBLISHABLE_KEY)}
          options={response.paymentData.client_secret}
        ></Elements>
      )}
    </>
  );
}
