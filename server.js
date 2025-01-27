const express = require("express");
const app = express();
const PORT = 3000;
const YOUR_DOMAIN = "http://localhost:3000";

const stripe = require("stripe")(
  "sk_test_51QloLD00c4t8JbXeWTjvozIgkOW82tugpbcQjpRt74zvwtpEPwprI6bnQTECbJuhRY54E3hXMVMhId2aMwsEnjjk00mxiA02wN"
);

app.use(express.static("public"));
app.post("/create-checkout-session", async (req, res) => {
  //   console.log("POST");
  try {
    const prices = await stripe.prices.list();
    // console.log(prices);
    // console.log(prices.data[0]);
    // console.log(prices.data[0].id);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.redirect(303, session.url);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, console.log("Server running...."));
