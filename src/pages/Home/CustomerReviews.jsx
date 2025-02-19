import React from "react";

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Jane Doe",
      review: "TechNest is my go-to platform for discovering the latest smart gadgets!",
    },
    {
      id: 2,
      name: "John Smith",
      review: "I love how easy it is to explore and share new innovations on TechNest.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      review: "A fantastic platform for both tech enthusiasts and creators!",
    },
  ];

  return (
    <section className="py-12 bg-gray-700">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-10">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((item) => (
            <div key={item.id} className="p-6 shadow-lg rounded-lg bg-white">
              <p className="text-gray-700 italic mb-4">"{item.review}"</p>
              <h4 className=" text-gray-600 font-semibold">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
