const API_BASE_URL = "http://localhost:8000";

export async function apiCall(
  path: string,
  method: string = "GET",
  body?: Record<string, unknown>
): Promise<string> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, options);
    const data = await response.json();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return JSON.stringify({ error: errorMessage }, null, 2);
  }
}
