export const api_response = (
  status = "SUCCESS",
  message = "",
  data = null,
  error = null
) => {
  return {
    status,
    message,
    data,
    error,
  };
};
