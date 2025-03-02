import React, { useState } from "react";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, message, Modal } from "antd";

interface CreditCardFormProps {
  showCreditCardForm: boolean;
  setShowCreditCardForm: (Value: boolean) => void;
  onPaymentSuccess: (paymentId:string) => void;
}

const CreditCardForm = ({
  showCreditCardForm,
  setShowCreditCardForm,
  onPaymentSuccess,
}: CreditCardFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    try {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment successful");
        onPaymentSuccess(result.paymentIntent.id)
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={showCreditCardForm}
      title="Enter your card details"
      onClose={() => setShowCreditCardForm(false)}
      centered
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            allowedCountries: ["US"],
            mode: "billing",
          }}
        />
        <div className="flex gap-5 justify-end mt-5">
          <Button disabled={loading}>Cancel</Button>
          <Button htmlType="submit" type="primary" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreditCardForm;
