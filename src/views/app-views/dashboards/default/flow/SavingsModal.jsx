import React from "react";

const SavingsModal = ({ isOpen, onClose, amount,onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl max-w-md w-full px-8 py-10 text-center shadow-xl relative">

                {/* Dynamic amount section */}
                <div className="relative flex flex-col items-center">
                    {/* Background gradient shape (like your design) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 bg-gradient-to-r from-[#8AB9F1] via-[#B57EDC] to-[#F08080] rounded-full opacity-30 blur-xl"></div>
                    </div>

                    <h2 className="relative text-2xl font-bold text-[#141A33]">Save</h2>
                    <p className="relative text-4xl font-extrabold bg-gradient-to-r from-[#8AB9F1] via-[#B57EDC] to-[#F08080] text-transparent bg-clip-text">
                        £{amount}
                    </p>
                    <span className="relative text-gray-500 text-sm">a year</span>
                </div>

                {/* Message */}
                <h3 className="mt-6 text-xl font-semibold text-[#141A33]">Great news</h3>
                <p className="text-gray-600">
                    You can save{" "}
                    <span className="font-bold text-[#28a745]">£{amount}</span> a year with Savy
                </p>

                {/* Button */}
                <button
                    onClick={onNavigate }
                    className="mt-8 w-full bg-[#002147] text-white py-3 rounded-xl font-semibold hover:bg-[#001730] transition"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default SavingsModal;
