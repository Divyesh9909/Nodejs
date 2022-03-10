const rzp = new Razorpay({
  key_id: "rzp_test_wdI4ddEn3RPMnZ",
  key_secret: "gxN4MDD915OkQA2i5eYWfk6K",
});
const rzpOrder = await rzp.orders.create({
  amount: amount * 100, // rzp format with paise
  currency: "INR",
  receipt: "receipt#1", //Receipt no that corresponds to this Order,
  payment_capture: true,
  notes: {
    orderType: "Pre",
  }, //Key-value pair used to store additional information
});
// To create recurring subscription
const subscriptionObject = {
  plan_id: PLAN_ID,
  total_count: 60,
  quantity: 1,
  customer_notify: 1,
  notes,
};
const subscription = await rzp.subscriptions.create(subscriptionObject);
