import { useState } from "react";
import { apiCall } from "~/lib/api_client";

export default function Home() {
  const [response, setResponse] = useState<string>("");

  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Django-Bolt API Test</h1>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">GET Requests</h2>

          <button
            onClick={async () => {
              const result = await apiCall("/");
              setResponse(result);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            GET / (Root)
          </button>

          <button
            onClick={async () => {
              const result = await apiCall("/health");
              setResponse(result);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            GET /health
          </button>

          <button
            onClick={async () => {
              const result = await apiCall("/items/42?q=test");
              setResponse(result);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            GET /items/42?q=test
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">POST Requests</h2>

          <button
            onClick={async () => {
              const result = await apiCall("/items", "POST", {
                name: "Test Item",
                price: 29.99,
                is_offer: true,
              });
              setResponse(result);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            POST /items (Create Item)
          </button>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">Response:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          {response || "No response yet. Click a button to test the API."}
        </pre>
      </div>
    </div>
  );
}