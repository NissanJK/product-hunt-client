import React from 'react';

const FAQ = () => {
  return (
    <section className="bg-gray-800 text-white py-12 px-8">
      <h2 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div className="collapse collapse-plus bg-gray-700">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">What is TechNest?</div>
          <div className="collapse-content">
            <p>TechNest is a platform to discover, showcase, and explore the latest technological innovations.</p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-gray-700">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">How can I submit a product?</div>
          <div className="collapse-content">
            <p>You can submit your product by creating an account and filling out the submission form on our platform.</p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-gray-700">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Is TechNest free to use?</div>
          <div className="collapse-content">
            <p>Yes, TechNest is free for users to explore and submit products. We also offer premium promotional services.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
