"use client";

import { useState } from "react";
import { CheckoutPayload, OrderResponse } from "../types/Checkout";
import { checkout } from "../services/Checkout";

interface CheckoutFormProps {
    userId: number;
    onClose: () => void;
    onSuccess: () => void;
}

const CheckoutForm = ({ userId, onClose, onSuccess }: CheckoutFormProps) => {
    const [formData, setFormData] = useState<CheckoutPayload>({
        userId: Number(userId),
        fullName: "",
        email: "",
        phoneNumber: "",
        district: "",
        deliveryAddress: "",
        postalCode: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof CheckoutPayload, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name as keyof CheckoutPayload]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CheckoutPayload, string>> = {};
        
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        if (!formData.district.trim()) newErrors.district = "District is required";
        if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = "Delivery address is required";
        if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);

        try {
            const order: OrderResponse = await checkout({
                ...formData,
                userId: Number(userId),
            });

            alert(order.message);
            onClose();
            onSuccess();
        } catch (err: any) {
            alert(err.message || "Checkout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                    aria-label="Close checkout form"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Shipping Details</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            required
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            required
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Your phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            required
                        />
                        {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                            District
                        </label>
                        <input
                            id="district"
                            name="district"
                            placeholder="Your district"
                            value={formData.district}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            required
                        />
                        {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            Delivery Address
                        </label>
                        <input
                            id="deliveryAddress"
                            name="deliveryAddress"
                            placeholder="Your complete delivery address"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            required
                        />
                        {errors.deliveryAddress && <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Postal Code
                        </label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            placeholder="Your postal code"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            required
                        />
                        {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            "Place Order"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;