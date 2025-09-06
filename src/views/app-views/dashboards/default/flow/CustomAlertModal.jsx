import React from 'react';
import timeIcon from '../../../../../assets/icons/time.png'; // Adjust the path if needed

const CustomAlertModal = ({ isOpen, onClose, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl max-w-md w-full px-6 py-8 text-center shadow-lg relative">

                <h1 className="text-4xl font-handwriting text-[#141A33] mb-4">Sorry!</h1>

                <p className="text-gray-600 mb-6">We don’t think you can <br />save money based on your answers.</p>

                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="text-sm text-gray-400">But</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <img src={timeIcon} alt="time" className="w-8 h-8 mx-auto mb-4" />

                <p className="text-gray-600 mb-6">
                    You may be able to get a refund for{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB9F1] via-[#B57EDC] to-[#F08080]">
            past tax year
          </span>
                </p>

                <button
                    onClick={onNavigate} // 👈 trigger flow switch
                    className="w-full bg-[#002147] text-white py-3 rounded-xl font-semibold hover:bg-[#001730] transition"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default CustomAlertModal;
