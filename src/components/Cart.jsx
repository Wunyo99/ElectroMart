import { X, ShoppingBag, Trash2, Minus, Plus, MoveRight } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const { items, updateItemQuantity, deleteItem, clearCart } =
    useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="bg-white shadow-2xl flex flex-col  rounded-tl-3xl rounded-bl-3xl fixed w-full md:w-3/4 lg:w-1/3 z-200 end-0 h-screen "
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-teal-100 text-teal-500">
                  <ShoppingBag size={20} />
                </div>
                <div className="flex flex-col ">
                  <h4 className="font-semibold text-xl">Your Cart</h4>
                  <p className="text-sm text-gray-500">
                    {items.length > 1 ? "items:" : "item:"} {items.length}
                  </p>
                </div>
              </div>
              <button
                className="hover:bg-gray-100 p-1 rounded-full"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <X size={20} />
              </button>
            </div>
            <hr className="text-gray-200" />
            <div className=" translate-y-1/2">
              {items.length === 0 && (
                <div className="flex items-center flex-col justify-center gap-3">
                  <div className="w-20 h-20 bg-gray-100 text-gray-500 flex items-center justify-center rounded-full">
                    <ShoppingBag size={30} />
                  </div>
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="bg-teal-500 py-3 px-4 font-bold text-white rounded-full cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 p-5 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 py-4 px-2 rounded-2xl"
                >
                  <div className="flex gap-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-2xl "
                    />
                    <div className="space-y-0.5">
                      <h4 className="text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>
                      <p className="font-bold text-lg">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between gap-20 md:gap-30 mt-4">
                        <div className="flex items-center gap-5">
                          <button
                            onClick={() => updateItemQuantity(item.id, -1)}
                            className="border border-gray-300 hover:bg-white text-gray-600 font-bold w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                          >
                            <Minus size={18} />
                          </button>
                          <p className="text-sm font-medium">{item.quantity}</p>
                          <button
                            onClick={() => updateItemQuantity(item.id, +1)}
                            className="border border-gray-300 hover:bg-white text-gray-600 font-bold flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:bg-red-100 p-2 rounded-full cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <>
                <hr className="text-gray-200" />
                <div className="bg-white p-4">
                  {items.length > 0 && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-500 ">Subtotal</p>
                        <p className="text-2xl text-gray-800 font-bold">
                          {formatPrice(totalPrice)}
                        </p>
                      </div>
                      <div className="flex justify-between mb-10 items-center">
                        <p className="text-[13px] text-gray-500 ">
                          Shipping calculated at checkout
                        </p>

                        <button
                          onClick={() => clearCart()}
                          className="text-red-500 hover:bg-red-100 py-0.5 px-2 text-[12px] font-medium rounded-full cursor-pointer"
                        >
                          Clear Cart
                        </button>
                      </div>

                      <Link
                        to="/checkout"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="bg-teal-500 hover:bg-teal-600 duration-300 flex justify-center gap-2 items-center  py-4 text-center px-10 rounded-full w-full  text-white font-semibold text-lg"
                      >
                        <span>Proceed to Checkout</span>
                        <MoveRight size={18} />
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
