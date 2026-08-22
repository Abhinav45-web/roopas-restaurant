const LOCAL_API_URL =
    "http://localhost:5000/api";

const API_URL =
    import.meta.env.VITE_API_URL ||
    LOCAL_API_URL;

export { API_URL };
export default API_URL;