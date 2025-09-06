import React from "react";
import { useNavigate } from "react-router-dom";
import SavyIcon from "../../../../../../src/assets/icons/savy.png";
import VectorIcon from "../../../../../../src/assets/icons/vector.png";
import TimeIcon from "../../../../../../src/assets/icons/time.png";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {message} from "antd";

const Welcome = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // or wherever you store the JWT

    const handleNext = async () => {
        try {
            // Build payload dynamically
            const payload = {
                startDate: new Date().toISOString(), // Current timestamp
                user: "6899eb6eebdd7e9cc42384da",    // Replace with dynamic user id if available
                income: null,
                source: "Mobile app",
                status: "In progress",
                ownCar: null,
                mileage: null,
                mileageRate: null,
                foodAndDrink: null,
                daysPerWeek: null,
                reimbursedPerDay: null,
                annualSaving: null,
                trialStarted: null,
                refundYears: 0,
                refund: null,
                onBoardingStatut: null,
                timeSpent: 0,
                mileageType: 0,
                spendPerDay: 0,
                annualExpenses: 0,
            };
            message.success('Welcome to Savy');

            // API call
            const response = await axios.post(
                "https://api.savyapp.dev/api/v1/estimations/user/me",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // ✅ Add the token here

                    },
                }
            );

            console.log("Estimation created:", response.data);
    message.info("ho");
            const estimationId = response.data.id; // check API response structure!
            // 3. Save it (localStorage or context)
            localStorage.setItem("estimationId", estimationId);
message.info(estimationId);
            // 4. Navigate to questions page with flowId + estimationId
            navigate(`/preview/flow/${id}/question`);
        } catch (error) {
            console.error("Error creating estimation:", error);
            // Optional: show user an error message
        }
    };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white text-center">
                {/* Welcome */}
                <p className="text-2xl font-bold inline-block bg-gradient-to-r from-[#8AB9F1] via-[#b57edc] to-[#F08080] bg-clip-text text-transparent">
                    Welcome to
                </p>

                {/* Icons */}
                <div className="flex justify-center pt-3">
                    <img src={SavyIcon} alt="Savy" className="w-35 h-10" />
                </div>

                <div className="flex justify-center pt-12">
                    <img src={VectorIcon} alt="Vector" className="w-35 h-10" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-3xl font-bold text-gray-900 pt-1">
                    We help taxpayers{" "}
                    <span className="bg-gradient-to-r from-[#b57edc] to-[#F08080] bg-clip-text text-transparent">
            get refunds
          </span>
                    <br className="hidden md:block" /> for work travel costs.
                </h1>

                {/* Time Icon */}
                <div className="flex justify-center pt-4">
                    <img src={TimeIcon} alt="Time" className="w-35 h-10" />
                </div>

                {/* Subheading */}
                <p className="text-4xl md:text-xl font-medium text-gray-800 pt-2">
                    Give us{" "}
                    <span className="bg-[#b57edc] bg-clip-text text-transparent">3 mins</span> and
                    <br /> we’ll tell you how much you can save.
                </p>

                {/* Button */}
                <div className="md:static fixed bottom-4 left-0 right-0 px-4 pt-3">
                    <button
                        onClick={handleNext}
                        className="bg-[#002147] text-white font-semibold py-1 px-56 rounded-lg w-full"
                    >
                        Next →
                    </button>
                </div>
        </div>
    );
};

export default Welcome;
