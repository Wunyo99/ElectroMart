import { useContext, useState } from "react";
import { Eye, Star, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../store/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useContext(CartContext);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.6 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="border border-gray-200 rounded-2xl shadow-lg group hover:shadow-2xl overflow-hidden "
      >
        <div className="relative bg-gray-100 ">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover group-hover:scale-105 p-5 rounded-3xl duration-500 "
          />
          <div className="font-medium text-white  absolute top-2.5 start-2 ">
            {product.isNew && (
              <span className="bg-blue-500 text-sm py-0.5 px-3 rounded-full">
                NEW
              </span>
            )}
          </div>
          <div className="lg:hidden group-hover:block ">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="flex gap-2 items-center absolute end-5 bottom-2"
            >
              <a
                href={`/products/${product.id}`}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-gray-100 cursor-pointer"
              >
                <Eye size={20} />
              </a>
              <button
                onClick={() => addToCart(product.id, 1, product.colors?.[0])}
                className="flex items-center justify-center w-12 h-12 rounded-full text-white bg-teal-500 hover:bg-teal-600 duration-300 cursor-pointer"
              >
                <ShoppingBag size={20} />
              </button>
            </motion.div>
          </div>
        </div>
        <div className="p-5 space-y-2">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Star size={15} className="text-yellow-400" />
              <Star size={15} className="text-yellow-400" />
              <Star size={15} className="text-yellow-400" />
              <Star size={15} className="text-yellow-400" />
              <Star size={15} className="text-gray-300" />
            </div>
            <p className="text-[12px] text-gray-700 font-medium">
              ({product.reviewCount})
            </p>
          </div>
          <h4 className=" md:text-lg font-bold group-hover:text-teal-500">
            {product.name}
          </h4>
          <div className="flex flex-wrap gap-1">
            {product.specs.slice(0, 2).map((spec, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-500 font-medium text-[12px] rounded-full py-1 px-2"
              >
                {spec}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-bold md:text-xl">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="font-medium text-gray-500 text-sm line-through mt-1">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <p className="text-teal-600 text-sm font-medium">Free delivery</p>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;
