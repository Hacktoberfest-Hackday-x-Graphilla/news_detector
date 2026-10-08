export async function getApiErrorMessage(response: Response): Promise<string> {
  const statusMessage = `Request failed (${response.status})`;
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return statusMessage;
  }

  const payload: unknown = await response.json();
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }

  return statusMessage;
}
