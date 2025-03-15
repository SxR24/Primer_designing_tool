import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000"; // Your FastAPI backend URL

export const getWelcomeMessage = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching welcome message:", error);
    return null;
  }
};

export const designPrimers = async (sequence) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/design_primers/`, {
      sequence: sequence,
    });
    return response.data;
  } catch (error) {
    console.error("Error designing primers:", error);
    return null;
  }
};