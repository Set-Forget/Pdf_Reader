function MessageModal({ message, onClose }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl relative"> {/* Añade 'relative' aquí */}
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-lg font-bold"
                >
                    &#10005;
                </button>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default MessageModal;
