import React from "react";

const Donation = () => {
  const campaigns = [
    { title: "GreenFund: Sustain Earth Now", amount: "$50,240,210", daysLeft: 7, image: "greenfund.jpg" },
    { title: "SeniorHealth: Support Campaign", amount: "$4,240,310", daysLeft: 19, image: "seniorhealth.jpg" },
    { title: "DisasterCare: Urgent Support", amount: "$2,100,210", daysLeft: 23, image: "disastercare.jpg" }
  ];

  return (
    <section id="donation" className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold">Urgent Fundraising!</h2>
      <p className="text-gray-600 mt-2">Time is of the essence! Join our mission NOW to make an immediate impact.</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{campaign.title}</h3>
              <p className="text-green-600 font-bold">{campaign.amount}</p>
              <p className="text-gray-500">{campaign.daysLeft} days left</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Donation;
