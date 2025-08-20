import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { MessageCircle } from "lucide-react"; // WhatsApp style icon
import Logo from '../Assets/Logo.jpg'; 

export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-black text-white">
      <div className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        {/* Left Section with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start space-y-2"
        >
          {/* Small Logo */}
          <img
            src={Logo}
            alt="ChrisCraft Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h4 className="font-semibold text-lg">ChrisCraft</h4>
          <p className="text-sm text-gray-400">
            High-quality shirts crafted with care.
          </p>
        </motion.div>

        {/* Middle Section */}
        <motion.div
          className="text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p>
            Contact:{" "}
            <a className="underline" href="tel:+919600910881">
              +91 96009 10881
            </a>
          </p>
            
             <p>
            Contact:{" "}
            <a className="underline" href="tel:+919600910881">
              +91 94442 10881
            </a>
          </p>


        </motion.div>

        {/* Right Section with Socials */}
        <motion.div
          className="text-sm flex flex-col items-start md:items-end space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Link className="underline" to="/terms">
            Terms & Conditions
          </Link>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/chris_._craft?igsh=b2Fyd3Jrd2xxMXJ1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span>Instagram</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/+919600910881"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}