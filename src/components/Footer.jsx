import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socials = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  const links = {
    shop: [
      { label: "All Products", href: "/shop" },
      { label: "Laptops", href: "/shop?category=Laptops" },
      { label: "Phones", href: "/shop?category=Phones" },
      { label: "Deals", href: "/shop?sale=true" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
  };

  return (
    <footer className=" border border-t-gray-300 mt-16 border-b-gray-">
      <div className="px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-white">
          <div className="space-y-3">
            <h1 className="font-bold text-2xl">
              <span className="text-teal-500">Electro</span>Mart
            </h1>
            <p className="text-sm text-gray-500">
              Your destination for premium electronics.
            </p>
            <div className="flex gap-4 items-center mt-4">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-teal-500 text-gra-500 hover:text-white transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Shop</h4>
            <div className="flex flex-col gap-2">
              {links.shop.map((shopL, idx) => (
                <Link key={idx} to={shopL.href}>
                  <p className="text-gray-500 hover:text-black text-sm">
                    {shopL.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Support</h4>
            <div className="flex flex-col gap-2">
              {links.support.map((suppL, idx) => (
                <Link key={idx} to={suppL.href}>
                  <p className="text-gray-500 hover:text-black text-sm">
                    {" "}
                    {suppL.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Company</h4>
            <div className="flex flex-col gap-2 ">
              {links.company.map((compL, idx) => (
                <Link key={idx} to={compL.href}>
                  <p className="text-gray-500 hover:text-black text-sm">
                    {compL.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-t-gray-300 p-5">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <p className="text-sm text-gray-500 ">
            © {new Date().getFullYear()} Electro Mart. All rights reserved
          </p>
          <div className="flex gap-4 text-gray-500">
            <a className="hover:text-black text-sm transition-colors" href="#">Privacy</a>
            <a className="hover:text-black text-sm transition-colors" href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
