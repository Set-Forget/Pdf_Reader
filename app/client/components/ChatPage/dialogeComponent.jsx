export default function Dialogue({messages, isLoading}) {
    return(
        <div className="overflow-auto mb-4 flex-grow">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-1 text-sm font-medium rounded-md ${message.sender === "user"
                  ? "self-end bg-blue-100"
                  : message.text.includes("an error occurred") ? "bg-red-100 self-start" : "bg-gray-100 self-start"
                }`}
            >
              {message.sender === "ia" ? (
                <div dangerouslySetInnerHTML={{ __html: message.text }} />
              ) : (
                message.text
              )}
            </div>
          ))}
          {isLoading && <PointsLoader />}
        </div>
    )
}

function PointsLoader() {
    return(
      <div className="flex justify-start my-2">
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
      </div>
    )
}
