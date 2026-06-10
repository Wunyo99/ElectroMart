import { use, useContext, useState } from "react";
import { CartContext } from "../store/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import {
  Check,
  CreditCard,
  Minus,
  Plus,
  Shield,
  Trash2,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { p } from "framer-motion/client";
const Checkout = () => {
  const { user } = useContext(AuthContext);
  const [shippingInfoData, setShippingInfoData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const validateShipping = () => {
    const errors = {};

    if (!shippingInfoData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(shippingInfoData.firstName.trim())) {
      errors.firstName = "First name must contain only letters";
    }

    if (!shippingInfoData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(shippingInfoData.lastName.trim())) {
      errors.lastName = "Last name must contain only letters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfoData.email)) {
      errors.email = "Invalid email address";
    }

    if (!/^\d{7,15}$/.test(shippingInfoData.phone.replace(/\D/g, ""))) {
      errors.phone = "Invalid phone number";
    }

    if (!shippingInfoData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!shippingInfoData.city.trim()) {
      errors.city = "City is required";
    }

    if (!shippingInfoData.state.trim()) {
      errors.state = "State is required";
    }

    if (!shippingInfoData.zipCode.trim()) {
      errors.zipCode = "ZIP code is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length < 3) return digits;

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handlePayment = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    }

    if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    }

    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setPaymentInfo((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validatePayment = () => {
    const newErrors = {};

    const cardNumber = paymentInfo.cardNumber.replace(/\s/g, "");

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!paymentInfo.cardHolderName.trim()) {
      newErrors.cardHolderName = "Cardholder name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(paymentInfo.cardHolderName.trim())) {
      newErrors.cardHolderName = "Cardholder name must contain only letters";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = "Use MM/YY format";
    } else {
      const [month, year] = paymentInfo.expiryDate.split("/");

      const expiryDate = new Date(2000 + Number(year), Number(month) - 1);

      if (expiryDate < new Date()) {
        newErrors.expiryDate = "Card has expired";
      }
    }

    if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [step, setStep] = useState(1);
  const isShippingFormEmpty =
    !shippingInfoData.firstName ||
    !shippingInfoData.lastName ||
    !shippingInfoData.email ||
    !shippingInfoData.phone ||
    !shippingInfoData.address ||
    !shippingInfoData.city ||
    !shippingInfoData.state ||
    !shippingInfoData.zipCode;

  const isPaymentInfoEmpty =
    !paymentInfo.cardHolderName ||
    !paymentInfo.cardNumber ||
    !paymentInfo.cvv ||
    !paymentInfo.expiryDate;
  isProcessing;

const handleChange = (e) => {
  const { name, value } = e.target;

  setShippingInfoData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};

  const handleShipmentSubmit = (e) => {
    e.preventDefault();
    const isValid = validateShipping();

    if (!isValid) return;
    console.log("Shipment Info:", shippingInfoData);
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    console.log("PaymentInfo:", paymentInfo);

    const isValid = validatePayment();

    if (!isValid) {
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        customer: shippingInfoData,
        items: items,
        subtotal: subTotal,
        tax: tax,
        shipping: shipping,
        total: total,
        status: "Processing",
        createdAt: new Date(),
      });

      clearCart();

      setOrderComplete(true);
    } catch (error) {
      console.error("Order failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const { items, updateItemQuantity, deleteItem, clearCart } =
    useContext(CartContext);

  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subTotal * 0.08;
  const shipping = subTotal > 100 ? 0 : 9.99;
  const total = subTotal + shipping + tax;
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-15 flex flex-col items-center justify-center"
      >
        <div className="w-18 h-18 rounded-full flex items-center justify-center bg-gray-100">
          <Check className="text-teal-500" size={35} />
        </div>
        <div className="text-center">
          <h4 className="font-bold py-4 text-3xl">Order Confirmed</h4>
          <p className="text-gray-500 p-2 md:w-100">
            Thank you for your purchase. We've sent a confirmation email with
            your order details.
          </p>
        </div>
        <div className="flex gap-4 items-center mt-8">
          <Link
            to="/shop"
            className="py-3 px-6 rounded-full bg-teal-500 text-white font-medium"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="py-3 px-6 rounded-full border-2 border-teal-500 bg-white text-teal-500 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="py-15">
      {items.length > 0 && (
        <div className="flex justify-center items-center gap-8 ">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-500 text-white font-medium ">
              1
            </div>
            <span className="text-teal-500 font-medium">Shipping</span>
          </div>

          <div
            className={`w-20  p-0.5 ${step === 2 ? "bg-teal-500" : "bg-gray-100"}`}
          ></div>
          <div className="flex gap-2 items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full  font-medium ${step === 2 ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500"} `}
            >
              2
            </div>
            <span
              className={` font-medium ${step === 2 ? "text-teal-500" : "text-gray-500"}`}
            >
              Payment
            </span>
          </div>
        </div>
      )}
      {items.length > 0 ? (
        <div className="grid lg:grid-cols-3 px-7 gap-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-white rounded-2xl py-5 px-4 lg:px-10 shadow-2xl mt-5"
            >
              <h4 className="font-bold text-2xl mb-5">Shipping Information</h4>
              <form onSubmit={handleShipmentSubmit} action="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="py-4 px-2 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      value={shippingInfoData.firstName}
                      onChange={handleChange}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="py-4 px-2 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      value={shippingInfoData.lastName}
                      onChange={handleChange}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="py-4 px-2 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      value={shippingInfoData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="py-4 px-2 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      value={shippingInfoData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <label
                    className="text-gray-800 text-sm font-medium"
                    htmlFor=""
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="py-4 px-2 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                    value={shippingInfoData.address}
                    onChange={handleChange}
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="py-4 px-2 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      value={shippingInfoData.city}
                      onChange={handleChange}
                      required
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="py-4 px-2 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      value={shippingInfoData.state}
                      onChange={handleChange}
                      required
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">{errors.state}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      className="py-4 px-2 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      value={shippingInfoData.zipCode}
                      onChange={handleChange}
                      required
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
                <button
                  disabled={isShippingFormEmpty}
                  className="text-white text-lg bg-teal-500 font-bold py-4 px-2 w-full rounded-full disabled:opacity-50 cursor-pointer hover:scale-102 duration-300"
                >
                  Continue to Payment
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-white rounded-2xl py-5 px-4 lg:px-10 shadow-2xl mt-5 lg:0"
            >
              <div className="md:flex items-center justify-between mb-5 ">
                <h4 className="font-bold text-2xl">Payment Information</h4>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-teal-500 font-medium cursor-pointer hover:underline"
                >
                  Edit Shipping
                </button>
              </div>
              <form onSubmit={handlePaymentSubmit} action="">
                <div className="flex flex-col gap-2 mb-5">
                  <label
                    className="text-gray-800 text-sm font-medium"
                    htmlFor=""
                  >
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      className="py-4 px-10 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={handlePayment}
                      required
                    />
                    <CreditCard
                      className="absolute top-4.5 text-gray-500 left-3"
                      size={20}
                    />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <label
                    className="text-gray-800 text-sm font-medium"
                    htmlFor=""
                  >
                    CardHolder Name
                  </label>
                  <input
                    type="text"
                    name="cardHolderName"
                    className="py-4 px-5 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                    placeholder="John Doe"
                    value={paymentInfo.cardHolderName}
                    onChange={handlePayment}
                    required
                  />
                  {errors.cardHolderName && (
                    <p className="text-red-500 text-sm">
                      {errors.cardHolderName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      className="py-4 px-5 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={handlePayment}
                      required
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-gray-800 text-sm font-medium"
                      htmlFor=""
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      maxLength={3}
                      className="py-4 px-5 w-full bg-gray-100 focus:outline-teal-500 rounded-2xl"
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={handlePayment}
                      required
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm">{errors.cvv}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-5 my-6 p-3 rounded-xl bg-gray-100">
                  <Shield className="text-teal-500" size={20} />
                  <p className="text-gray-500">
                    Your payment information is encrypted and secure
                  </p>
                </div>
                <button
                  disabled={isPaymentInfoEmpty}
                  className="text-white text-lg bg-teal-500 font-bold py-4 px-2 w-full rounded-full cursor-pointer disabled:opacity-50 hover:scale-102 duration-300"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    ` Pay ${formatPrice(total)}`
                  )}
                </button>
              </form>
            </motion.div>
          )}
          <div className="lg:col-span-1">
            <div className=" bg-white rounded-2xl p-6 shadow-2xl sticky top-32">
              <h4 className="text-xl mb-4 font-bold">Order Summary</h4>
              <div className="space-y-4 max-h-75 overflow-x-hidde overflow-y-auto ">
                {items.map((cartItem) => (
                  <div key={cartItem.id} className="flex gap-3 mb-5">
                    <img
                      className="w-20 rounded-2xl"
                      src={cartItem.image}
                      alt={cartItem.name}
                    />
                    <div className="flex gap- items-center justify-between">
                      <div className="space-y-2">
                        <h5 className="text-sm text-gray-800 font-medium">
                          {cartItem.name}
                        </h5>
                        <h5 className="text-sm font-medium text-gray-500">
                          {cartItem.color}
                        </h5>
                        <div className="flex items-center justify-between gap-14 md:gap-">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() =>
                                updateItemQuantity(cartItem.id, -1)
                              }
                              className="text-gray-500 hover:text-black cursor-pointer"
                            >
                              <Minus size={15} />
                            </button>
                            <p className="text-sm font-medium">
                              {cartItem.quantity}
                            </p>
                            <button
                              onClick={() =>
                                updateItemQuantity(cartItem.id, +1)
                              }
                              className="text-gray-500 hover:text-black cursor-pointer"
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                          <p className="font-bold text-sm">
                            {formatPrice(cartItem.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        className="cursor-pointer text-gray-500 hover:text-red-600 mb-5"
                        onClick={() => deleteItem(cartItem.id)}
                      >
                        <Trash2 className="" size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="text-gray-200 mb-2" />
              <div>
                <div className="flex items-center justify-between py-2">
                  <p className="text-gray-500 text-sm font-medium">Subtotal</p>
                  <p className="text-sm">{formatPrice(subTotal)}</p>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p className="text-gray-500 text-sm font-medium">Shipping</p>
                  <p className={shipping === 0 ? "text-teal-500" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </p>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p className="text-gray-500 text-sm font-medium">Tax</p>
                  <p className="text-sm   ">
                    {shipping > 100 ? "FREE" : formatPrice(tax)}
                  </p>
                </div>
                <hr className="text-gray-200 mb-2" />
                <div className="flex items-center text-gray-800 justify-between py-2">
                  <p className="text-lg font-bold">Total</p>
                  <p className="text-xl font-bold"> {formatPrice(total)} </p>
                </div>
                <div className="text-teal-500 flex items-center gap-2 mt-5">
                  <Truck size={15} />
                  <span className="text-sm">
                    Free shipping on orders over $100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h4 className="text-2xl font-bold mb-4">Your cart is empty</h4>
          <p className="text-gray-500 font-medium mb-7">
            Add some products to checkout
          </p>
          <Link
            to="/shop"
            className="py-3 px-7 text-sm text-white font-bold bg-teal-500 rounded-full hover:shadow-xl duration-300 cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </section>
  );
};

export default Checkout;
