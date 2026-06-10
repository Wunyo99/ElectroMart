import { Mail, MoveRight, Stars } from "lucide-react";
import { motion } from "framer-motion";

const Promo = () => {
  return (
    <>
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-teal-500 py-16 flex flex-col justify-center items-center px-5 mt-20 text center w-[95%] mx-auto rounded-4xl "
        >
          <div className="flex items-center  gap-2 text-white bg-white/20 py-2 px-5 mb-4 rounded-full ">
            <Stars size={18} />
            <p className="text-sm font-medium">Exclusive Offers</p>
          </div>
          <h4 className="text-4xl text-center font-bold tracking-wider text-white mb-4">
            Get 10% Off Your First Order
          </h4>
          <p className="text-center text-lg text-white/80 mb-8">
            Subscribe to our newsletter for exclusive deals, new arrivals, and
            tech tips.
          </p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            <div className="relative">
              <Mail
                className="absolute top-5 left-4 text-gray-500 "
                size={18}
              />
              <input
                type="email"
                className="rounded-full focus:outline-teal-200  border-0 py-4  px-10 bg-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center w-full justify-center gap-2 text-white bg-gray-900 py-4 px-6 rounded-full"
            >
              <span className="font-semibold text-lg">Subscribe</span>
              <MoveRight size={18} />
            </button>
          </motion.form>
          <p className="text-center text-sm text-white/80 mt-4">
            No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default Promo;
