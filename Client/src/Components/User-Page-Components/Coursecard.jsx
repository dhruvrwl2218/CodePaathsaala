import React from "react";

const Coursecard = ({
  Name,
  Css = "",
  Level,
  Img,
  Duration,
  Price,
  Description,
  _id,
  checkout,
  ...props
}) => {
  return (
    <div
      className={`flex flex-col bg-black text-white gap-2 p-3 rounded-xl m-3  font-serif text-semibold ${Css}
   border border-slate-600 `}
    >
      <div>
        <img
          src={Img}
          alt="thumbnail"
          className="rounded-xl w-full border-indigo-100 h-60"
        />
      </div>
      <div>
        <p className="text-2xl p-2 text-indigo-400 font-semibold">
          {Name} ({Level})
        </p>
      </div>
      <div className="flex justify-between px-3 text-xl my-1">
        <p>Duration : {Duration}</p>
        <p>₹ {Price ? Price : 1000}</p>
      </div>

      <button
        className="bg-neutral-800 rounded-lg mx-4 py-1 border border-slate-600"
        onClick={() => checkout(Price, _id, Name)}
      >
        Buy
      </button>
    </div>
  );
};
export default Coursecard;
