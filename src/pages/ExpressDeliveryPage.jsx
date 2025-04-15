import { useState } from "react";
import { FiTruck, FiClock, FiGlobe, FiCheckCircle, FiUser } from "react-icons/fi";

const ExpressDeliveryPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [weight, setWeight] = useState(1);
  const [destination, setDestination] = useState("domestic");

  // Pricing calculation
  const calculatePrice = () => {
    const basePrice = destination === "domestic" ? 10 : 25;
    return (basePrice * weight).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Fast & Reliable Express Delivery</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your packages delivered in record time with our premium courier services.
          </p>
          <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-100 transition">
            Schedule a Pickup
          </button>
        </div>
      </div>

      {/* Tracking Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FiTruck className="mr-2" /> Track Your Package
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Tracking ID"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              Track Now
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Services */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Delivery Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Same-Day Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiClock className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Same-Day Delivery</h3>
            <p className="text-gray-600 mb-4">
              Get your package delivered within hours. Perfect for urgent shipments.
            </p>
            <p className="font-bold text-indigo-600">From $15.99</p>
          </div>

          {/* Next-Day Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiCheckCircle className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Next-Day Delivery</h3>
            <p className="text-gray-600 mb-4">
              Guaranteed delivery by the next business day.
            </p>
            <p className="font-bold text-indigo-600">From $9.99</p>
          </div>

          {/* International Shipping */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiGlobe className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">International Shipping</h3>
            <p className="text-gray-600 mb-4">
              Fast and secure global delivery to over 200 countries.
            </p>
            <p className="font-bold text-indigo-600">From $24.99</p>
          </div>
        </div>
      </div>

      {/* Pricing Calculator */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Estimate Shipping Cost</h2>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Package Weight (kg)</label>
              <input
                type="range"
                min="1"
                max="20"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                <span>1kg</span>
                <span>{weight}kg</span>
                <span>20kg</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Destination</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-gray-700">Estimated Cost:</p>
              <p className="text-2xl font-bold text-indigo-600">${calculatePrice()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Schedule a Pickup</h3>
            <p className="text-gray-600">
              Book online or via our app. We’ll pick up your package at your doorstep.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600">
              Our team ensures quick sorting and dispatch for fastest delivery.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Reliable Delivery</h3>
            <p className="text-gray-600">
              Track in real-time and receive notifications until delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah J.",
                comment: "Same-day delivery saved my last-minute gift crisis! Super reliable.",
              },
              {
                name: "Michael T.",
                comment: "International shipping was faster than expected. Great service!",
              },
              {
                name: "Lisa K.",
                comment: "The tracking system is so accurate. I always use them for important packages.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <FiUser className="text-indigo-600" />
                  </div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressDeliveryPage;