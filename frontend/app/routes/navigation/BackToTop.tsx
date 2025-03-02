import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY >= 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <motion.button
            className="fixed bottom-6 right-6 bg-[#3282B8] text-white p-3 rounded-full shadow-lg hover:bg-[#0F4C75] transition duration-300"
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
        >
            <FaArrowCircleUp size={32} />
        </motion.button>
    );
};

export default BackToTop;
