import { MoveRight, Shield, Sparkles, Zap } from "lucide-react";
import heroImg from "../assets/hero-img.jpg";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 py-12 px-5 bg-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 lg:mt-17"
        >
          <div className="bg-teal-100 text-teal-800 flex gap-2 items-center font-medium w-fit px-3 py-2 rounded-full mb-5">
            <Sparkles size={15} />
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm"
            >
              New Collection 2026
            </motion.p>
          </div>
          <motion.h1 className="text-6xl font-extrabold text-gray-900 mb-8">
            Discover the <span className="text-teal-500">Latest Tech</span>{" "}
            Innovation
          </motion.h1>
          <p className="text-gray-500 text-lg mb-8 md:text-xl max-w-lg mx-auto md:mx-0">
            Explore our curated collection of premium electronics designed to
            enhance your everyday life.
          </p>
          <div className="flex gap-2 items-center mb-10">
            <a
              href="/shop"
              className="flex items-center gap-2 py-4 px-8 rounded-full bg-teal-500 text-white hover:scale- hover:shadow-xl transition-all duration-300"
            >
              <p className="font-medium">Shop Now</p>
              <MoveRight size={20} />
            </a>
            <a
              className="border-2 py-4 px-8 border-teal-500 text-teal-500 font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300 rounded-full"
              href="#"
            >
              <p className="">View Details</p>
            </a>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center">
            <div className="flex gap-2 items-center">
              <div className="flex items-center justify-center w-7 h-7 bg-teal-100 rounded-full">
                <Zap className="text-teal-800" size={15} />
              </div>
              <span className="text-sm text-gray-500">Fast Shipping</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center justify-center w-7 h-7 bg-teal-100 rounded-full">
                <Shield className="text-teal-800" size={15} />
              </div>
              <span className="text-sm text-gray-500">Secure Payment</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center justify-center w-7 h-7 bg-teal-100 rounded-full">
                <Sparkles className="text-teal-800" size={15} />
              </div>
              <span className="text-sm text-gray-500">Premium Quality</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative bg-white w-fit p-8 mt-8 mx-auto md:h-75  rounded-2xl flex items-center justify-center overflow-hidden">
            <img
              src={heroImg}
              alt="laptop "
              className="w-105 object-cover rounded-2xl"
            />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="border border-gray-200 bg-white w-30 px-5 h-22 absolute -right-4 -bottom-4 -end-1 rounded-2xl"
            >
              <span className="text-sm text-gray-500">Starting at</span>
              <p className="text-2xl text-teal-500 font-bold">$99</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
