import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { Products } from "../products";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  LucideRotateCcw,
} from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { CartContext } from "../store/CartContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
const ProductDetails = () => {
  const [isWishList, setIsWishList] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const product = Products.find((item) => item.id === id);
  console.log(product);

  const featuredProducts = useMemo(() => {
    if (!product) return [];
    return Products.filter(
      (p) => p.id != product.id && p.category === product.category,
    );
  }, [product]);

  if (!product) {
    return <h1>No Products found!!!</h1>;
  }
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0]);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user || !product) return;

      try {
        const wishlistRef = doc(db, "wishlists", user.uid);
        const wishlistSnap = await getDoc(wishlistRef);

        if (wishlistSnap.exists()) {
          const products = wishlistSnap.data().products || [];

          const exists = products.some((item) => item.id === product.id);

          setIsWishList(exists);
        } else {
          setIsWishList(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkWishlist();
  }, [user, product]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const wishlistRef = doc(db, "wishlists", user.uid);

      const wishlistSnap = await getDoc(wishlistRef);

      let products = [];

      if (wishlistSnap.exists()) {
        products = wishlistSnap.data().products || [];
      }

      const exists = products.some((item) => item.id === product.id);

      if (exists) {
        const updatedProducts = products.filter(
          (item) => item.id !== product.id,
        );

        await setDoc(
          wishlistRef,
          {
            products: updatedProducts,
          },
          { merge: true },
        );

        setIsWishList(false);

        toast.success("Removed from wishlist");

        return;
      }

      products.push(product);

      await setDoc(
        wishlistRef,
        {
          products,
        },
        { merge: true },
      );

      setIsWishList(true);

      toast.success("Added to wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Wishlist update failed");
    }
  };

  return (
    <>
      <section className="px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 ">
          <div className="relative">
            <div className="bg-gray-100 aspect-square p-8 rounded-3xl sticky top-32">
              <img
                className="w-full h-full object-contain"
                src={product.image}
                alt={product.name}
              />
              {product.isNew && (
                <div className="px-2 py-1 bg-blue-500 text-white font-medium text-sm rounded-full absolute top-7">
                  NEW
                </div>
              )}
            </div>
          </div>
          <div>
            <span className="text-teal-500 font-medium mb-5">
              {product.category}
            </span>
            <div className="space-y-3.5">
              <h1 className="text-4xl font-bold text-gray-800">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  <Star size={18} />
                  <Star size={18} />
                  <Star size={18} />
                  <Star size={18} />
                  <Star className="text-gray-300" size={18} />
                </div>
                <span className="flex gap-1 items-center text-gray-500">
                  {" "}
                  {product.rating} ({product.reviewCount?.toLocaleString()}{" "}
                  reviews)
                </span>
              </div>
              <p className="text-gray-800 font-bold text-3xl">
                {formatPrice(product.price)}
              </p>
            </div>
            <hr className="text-gray-300 my-8" />
            <div>
              <p className="text-lg font-medium text-gray-500 mb-4">
                {product.description}
              </p>
              <p className="font-bold mb-5">Key Features</p>
              <div className="flex flex-wrap md:grid md:grid-cols-2 gap-3">
                {product.specs.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center rounded-xl gap-2 bg-gray-100 px-4 py-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <p className="font-medium">{spec}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <p className="font-semibold text-lg">
                  Color: <span className="text-teal-500">{selectedColor}</span>
                </p>
                <div className="flex gap-2 mt-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`border-2 font-medium cursor-pointer px-4 py-2 rounded-xl ${selectedColor === color ? "border-teal-500 bg-teal-500/10 text-teal-500 font-medium" : "border-gray-300 text-gray-500"}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-7">
                <p className="font-bold mb-4 text-gray-800">Quantity</p>
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => setQuantity(quantity - 1)}
                    className=" rounded-xl p-3 border-2 border-gray-300 cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <p className="font-bold text-xl">{quantity}</p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className=" rounded-xl p-3 border-2 border-gray-300 cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-8 flex gap-5">
                <button
                  onClick={() => addToCart(product.id, quantity, selectedColor)}
                  className="py-4 w-full bg-teal-500 text-white text-lg font-bold rounded-full flex items-center justify-center gap-2 hover:scale-102 duration-300 cursor-pointer"
                >
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </button>
<button
  onClick={handleWishlist}
  className={`${
    isWishList
      ? "border-teal-500 text-teal-500 bg-teal-50"
      : "border-gray-300 text-gray-500"
  } rounded-2xl w-14 h-14 flex items-center justify-center duration-300 hover:shadow-xl border-2 cursor-pointer`}
>
  <Heart
    size={23}
    fill={isWishList ? "currentColor" : "none"}
  />
</button>
              </div>
              <div className="bg-gray-50 flex items-center gap-8 justify-evenly rounded-2xl py-5 px-5 mt-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full text-teal-500 bg-teal-100">
                    <Truck size={20} />
                  </div>
                  <p className="text-sm text-center">Free Delivery</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full text-teal-500 bg-teal-100">
                    <Shield size={20} />
                  </div>
                  <p className="text-sm text-center">2 Year Warranty</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full text-teal-500 bg-teal-100">
                    <LucideRotateCcw size={20} />
                  </div>
                  <p className="text-sm text-center">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 px-6 bg-gray-50">
        <h1 className="text-3xl text-gray-800 font-bold mb-4 py-8">
          You May Also Like
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
