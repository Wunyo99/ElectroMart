import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { LogOut, DollarSign } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const { user, logout, userProfile, userOrders } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.uid) return;

      try {
        const wishlistRef = doc(db, "wishlists", user.uid);
        const wishlistSnap = await getDoc(wishlistRef);

        if (wishlistSnap.exists()) {
          setWishlist(wishlistSnap.data().products || []);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, [user]);

  const totalSpent = userOrders.reduce(
    (acc, order) => acc + (order.total || 0),
    0,
  );

  const statusStyles = {
    Processing: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const logoutNavigateSignIn = () => {
    logout();
    toast.success("Logged Out");
    navigate("/signin");
  };

  return (
    <>
      <Header />

      <section className=" px-5 py-10">
        <h3 className="mb-5 text-4xl font-bold text-gray-800">My Profile</h3>
        <div className=" max-w-5xl mx-auto space-y-8">
          <div className="bg-linear-to-r from-teal-500 to-cyan-500 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold">Welcome Back</h2>

            <p className="mt-2 opacity-90">
              Manage your profile, orders and wishlist.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-6">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p className="font-semibold">{userProfile?.name}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-semibold">{userProfile?.email}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-semibold">{userProfile?.phone}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-500">Total Orders</p>

              <h3 className="text-4xl font-bold mt-2">{userOrders.length}</h3>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-500">Wishlist Items</p>

              <h3 className="text-4xl font-bold mt-2">{wishlist.length}</h3>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-gray-500">
                <DollarSign size={18} />
                Total Spent
              </div>

              <h3 className="text-4xl font-bold mt-2">
                {formatPrice(totalSpent.toFixed(2))}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Recent Orders</h3>

              <span className="text-gray-500">{userOrders.length} Orders</span>
            </div>

            {userOrders.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No orders found
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="mt-3 space-y-3">
                          {order.items?.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded-lg"
                              />

                              <div className="flex-1 space-y-1">
                                <p className="font-medium text-sm">
                                  {item.name}
                                </p>

                                <p className="text-gray-500 text-xs">
                                  Qty: {item.quantity}
                                </p>
                                <p className="font-semibold text-sm">
                                  {formatPrice(
                                    (item.price * item.quantity).toFixed(2),
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          statusStyles[order.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <span>Total</span>

                      <span className="font-bold text-teal-500">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-6">Wishlist</h3>

            {wishlist.length === 0 ? (
              <p className="text-gray-500">No items in wishlist yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-white p-3 rounded-xl shadow"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain bg-gray-100 rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-teal-500 font-bold">
                        {formatPrice(item.price)}
                      </p>

                      <button
                        className="text-sm text-red-500 mt-2 cursor-pointer"
                        onClick={async () => {
                          try {
                            const updated = wishlist.filter(
                              (p) => p.id !== item.id,
                            );

                            await setDoc(
                              doc(db, "wishlists", user.uid),
                              { products: updated },
                              { merge: true },
                            );

                            setWishlist(updated);
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <button
              onClick={logoutNavigateSignIn}
              className="w-full flex justify-center items-center gap-3 p-3 rounded-xl hover:bg-red-200 bg-red-50 text-red-500 cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
