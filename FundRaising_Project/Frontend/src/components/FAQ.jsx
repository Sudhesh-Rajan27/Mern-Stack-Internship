import React, { useState } from "react";

const faqs = [
  { question: "How Can I Make a Donation?", answer: "You can donate by clicking the 'Donate' button on any campaign." },
  { question: "Is My Donation Tax-Deductible?", answer: "Yes, donations are tax-deductible based on your region's laws." },
  { question: "Can I Donate In Honor Or Memory Of Someone?", answer: "Absolutely! Just mention their name in the donation form." },
  { question: "How Will My Donation Be Used?", answer: "All funds go directly to the cause you support." },
  { question: "Can I Set Up A Recurring Donation?", answer: "Yes, you can set up a recurring monthly donation." }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions.</h2>
      <div className="mt-8 max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button 
              className="w-full text-left py-4 text-lg font-semibold flex justify-between" 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <p className="text-gray-600 pb-4">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
