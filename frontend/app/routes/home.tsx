import { useState } from "react";

const API_BASE_URL = "http://localhost:8000";

export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleApiCall = async (
    endpoint: string,
    method: string = "GET",
    body?: object
  ) => {
    setLoading(true);
    setResponse("");
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Django-Bolt API Test</h1>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">GET Requests</h2>

          <button
            onClick={() => handleApiCall("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            GET / (Root)
          </button>

          <button
            onClick={() => handleApiCall("/health")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            GET /health
          </button>

          <button
            onClick={() => handleApiCall("/items/42?q=test")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            GET /items/42?q=test
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">POST Requests</h2>

          <button
            onClick={() =>
              handleApiCall("/items", "POST", {
                name: "Test Item",
                price: 29.99,
                is_offer: true,
              })
            }
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            POST /items (Create Item)
          </button>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">Response:</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {response || "No response yet. Click a button to test the API."}
          </pre>
        )}
      </div>
    </div>
  );
}