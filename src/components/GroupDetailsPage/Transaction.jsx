/* eslint-disable react/prop-types */
import  useStore from "../../store/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function Transaction({ setShowAddExpenseModal}) {
  const transactions = useStore((state) => state.transactions);
  if(transactions.loading){
    return  <p className='h-screen text-subHeading flex items-center justify-center dark:text-light-primaryText'>
    <AiOutlineLoading3Quarters className='animate-spin' size={40} />
  </p>
  }
  return (
    <div className="mt-8 px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <button
          className="bg-black text-white py-2 px-6 rounded-full"
          onClick={() => setShowAddExpenseModal(true)}
        >
          + Add Expense
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {transactions.length > 0 ? (
          transactions.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-2 border-black rounded-lg shadow-md p-4"
            >
              <div className="flex items-center space-x-4">
                {/* Icon for the transaction */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    item.status === "borrowed"
                      ? "bg-gray-300 border-gray-500"
                      : "bg-green-100 border-black"
                  } border-2`}
                >
                  <span
                    className={`text-sm font-bold ${
                      item.status === "borrowed" ? "text-gray-500" : "text-black"
                    }`}
                  >
                    {item.label.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{item.expenseName}</h3>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>
              </div>
              <div
                className={`text-right ${
                  item.status === "borrowed" ? "text-gray-500" : "text-black"
                }`}
              >
                <p className="text-sm italic">{item.label}</p>
                <p className="font-bold">{item.amount}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No transactions to display.</p>
        )}
      </div>
    </div>
  );
}
