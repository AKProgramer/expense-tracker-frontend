 

const ConfirmModal = ({ onConfirm, onCancel, message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-1">Confirmation</h3>
        <p className="text-gray-500 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-1 border-2 border-black rounded-full"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-black text-white rounded-full"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;