export default function ContactPage() {
    return (
            <div className="  bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
                    <h1 className="text-3xl font-bold text-white">HomeStay Store</h1>
                    <p className="mt-2 text-blue-100">
                        Bringing the latest technology to Homestay.
                    </p>
                </div>

                {/* Main Content */}
                <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-8 border border-gray-100">
                    {/* Contact Us Section */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-gray-600">
                            We're here to assist you with any questions or feedback. Get in touch with our team who has extensive expertise to help you.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section className="mb-10">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                            Our Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">Phone</h4>
                                    <p className="text-gray-600">3333338889 (Presented)</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">Email</h4>
                                    <p className="text-gray-600">homestay@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">Address</h4>
                                    <p className="text-gray-600">Nepal</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">Working Hours</h4>
                                    <p className="text-gray-600">Standing in Bridge: 1:00 AM – 7:00 PM</p>
                                    <p className="text-gray-600">Starting: 1:00 AM + 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Connect With Us */}
                    <section>
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                            Connect With Us
                        </h3>
                        <div className="flex space-x-6">
                            <a href="#" className="bg-gray-100 hover:bg-blue-100 p-4 rounded-full transition duration-300">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a href="#" className="bg-gray-100 hover:bg-pink-100 p-4 rounded-full transition duration-300">
                                <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                            <h4 className="font-bold text-gray-800">HomeStay Store</h4>
                            <p className="text-gray-600">Bringing the latest technology to Homestay.</p>
                        </div>
                        <div className="mb-4 md:mb-0">
                            <h4 className="font-bold text-gray-800">Quick Links</h4>
                            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Contact Us</h4>
                            <p className="text-gray-600">Phone: 3333338889</p>
                        </div>
                    </div>
                </div>
            </div>
            
    );
}