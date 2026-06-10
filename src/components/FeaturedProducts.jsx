import { MoveRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Products } from "../products.js";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  return (
    <section className="mt-16 px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4 text-teal-500">
          <Sparkles size={17} />
          <p className=" uppercase text-sm font-medium ">Best Sellers</p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-16">
          <h4 className="font-bold text-3xl">Featured Products</h4>
          <div className="flex items-center gap-2 text-teal-500 font-medium me-2">
            <Link to="/shop">View All Products</Link>
            <MoveRight size={17} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center"
      >
        {Products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;
