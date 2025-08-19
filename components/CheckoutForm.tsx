//CheckoutForm.tsx

"use client";

import { useState } from "react";

interface CheckoutFormProps {
    userId: number;
    onClose: () => void;
    onSuccess: () => void;
}

const CheckoutForm = ({ userId, onClose, onSuccess }: CheckoutFormProps) => {
    const [formData, setFormData] = useState({
        userId: Number(userId),
        fullName: "",
        email: "",
        phoneNumber: "",
        district: "",
        deliveryAddress: "",
        postalCode: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

                <form className="space-y-3" onSubmit={handleSubmit}>
                    <input
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="district"
                        placeholder="District"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="deliveryAddress"
                        placeholder="Delivery Address"
                        value={formData.deliveryAddress}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 font-semibold"
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;