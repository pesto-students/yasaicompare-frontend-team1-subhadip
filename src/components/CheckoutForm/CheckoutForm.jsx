import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URL } from "../../config";

const CheckoutForm = (props) => {
  console.log(props.order_id);
  const token = localStorage.getItem("accessToken");
  console.log(token);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${FRONTEND_URL}/complete-payment/order/confirm-order/?order_group_id=${props.order_id}&user_token=${token}`,
      },
    });

    console.log("result data", result);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button onClick={props.clientSecretChange} disabled={!stripe}>
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
