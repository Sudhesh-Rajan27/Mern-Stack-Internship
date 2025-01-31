import React from "react";
import { useNavigate } from "react-router-dom";
const FundraiserCount = () => {
  const navigate = useNavigate()
  return (
    <section id="fundraisercount" className="py-20 bg-gray-100 text-center">
      <h2 className="text-5xl font-bold">Be The Part Of Fundraisers With Over</h2>
      <p className="text-green-500 text-6xl font-extrabold mt-4">217,924+</p>
      <p className="text-gray-600 text-lg">People From Around The World Joined</p>
      <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold" onClick={()=>{navigate("/login")}}>
        Join Fundraisers Now!
      </button>
    </section>
  );
};

export default FundraiserCount;
