/* eslint-disable react/prop-types */

const SingleCard = ({ title, subtitle, number, members }) => {
  return (
    <div className="flex gap-5">
      <div className="relative">
        <span className="text-9xl font-bold m-0">{number}</span>
      </div>
      <div className="w-72 h-auto p-6 border-2 border-black bg-white rounded-lg flex flex-col justify-between">
        <h3 className="text-2xl font-bold text-black">{title}</h3>
        <p className="text-lg text-gray-500">{subtitle}</p>
        <div>
          <h4 className="text-lg font-semibold mt-4">Members:</h4>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            {members.length > 0 ? (
              members.map((member, index) => (
                <span
                  key={index}
                  className="text-sm text-gray-700 font-semibold border-2 border-black px-2 py-1 rounded-full"
                >
                  {member}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No members available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
