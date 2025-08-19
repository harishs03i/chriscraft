import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
        >
          Terms & Conditions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 mb-6 text-center"
        >
          Welcome to ChrisCraft. By accessing and using our website or placing an order with us, you agree to the following wholesale terms and conditions.
        </motion.p>

        <div className="space-y-6">
          {[
            {
              title: "1. Business-to-Business (B2B) Policy",
              content:
                "ChrisCraft operates as a wholesale manufacturer and dealer. We cater strictly to bulk buyers, distributors, and retailers, not individual retail customers.",
            },
            {
              title: "2. Order Placement",
              content:
                "Orders can be placed only through our official WhatsApp communication channel or by directly contacting our sales team. Minimum order quantity (MOQ) applies for all bulk purchases, which will be informed at the time of inquiry. Orders will be processed once confirmed through written communication (WhatsApp/email).",
            },
            {
              title: "3. Pricing & Quotations",
              content:
                "All prices quoted are wholesale prices and exclusive of applicable taxes, duties, and logistics costs. Prices are subject to change without prior notice, depending on fabric availability and market fluctuations.",
            },
            {
              title: "4. Payment Terms",
              content:
                "Payment details will be shared upon order confirmation via WhatsApp or email. Orders are processed only after payment confirmation.",
            },
            {
              title: "5. Shipping & Delivery",
              content:
                "Delivery timelines depend on order volume, stock availability, and destination. Shipping or transport charges are to be borne by the buyer unless otherwise agreed. Once dispatched, ChrisCraft is not responsible for delays, damages, or loss caused during transit.",
            },
            {
              title: "6. Intellectual Property",
              content:
                "All logos, brand names, images, and product designs are the intellectual property of ChrisCraft and cannot be copied, resold under a different brand, or misused in any form.",
            },
            {
              title: "7. Limitation of Liability",
              content:
                "ChrisCraft will not be liable for indirect, incidental, or consequential damages arising from bulk transactions, delays, or third-party handling.",
            },
            {
              title: "8. Governing Law",
              content:
                "All wholesale transactions and disputes will be governed under the jurisdiction of Indian laws.",
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              className="bg-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
