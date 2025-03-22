import axios from "axios";
import "dotenv/config";

const API_URL = process.env.API_URL || "http://20.244.56.144";
let token = null;
let expiryTime = 0;
const fetchToken = async () => {
  try {
    const time = Math.floor(Date.now() / 1000);
    if (!token || time >= expiryTime) {
      const response = await axios.post(`${API_URL}/test/auth`, {
        companyName: "BML Munjal University",
        clientID: "1c6164af-969f-438f-a348-d32c639a22c2",
        clientSecret: "ijrduOOyEuqjeLzJ",
        ownerName: "Aditya Bansal",
        ownerEmail: "aditya.bansal.22cse@bmu.edu.in",
        rollNo: "220439",
      });
      token = response.data.access_token;
    }

    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

export default fetchToken;
