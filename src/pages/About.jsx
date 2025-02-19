import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
    return (
        <div className="bg-gray-800 w-full py-10 px-4 lg:px-32">
            <Helmet>
                <title>TechNest | About</title>
            </Helmet>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-6">About TechNest</h2>
                <p className="text-lg text-gray-200 leading-relaxed mb-8">
                    Welcome to <span className="font-semibold">TechNest</span>, your one-stop destination for the latest and most innovative tech products. Our mission is to provide top-quality gadgets and electronics to enhance your digital lifestyle.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Vision</h3>
                        <p className="text-gray-600">
                            We aim to empower people through advanced technology, offering products that simplify daily life and enhance productivity.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h3>
                        <p className="text-gray-600">
                            To deliver cutting-edge technology with exceptional customer service, ensuring a seamless shopping experience for everyone.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h3>
                        <p className="text-gray-600">
                            We offer a curated selection of high-quality products, competitive pricing, and fast, reliable delivery to meet your needs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
