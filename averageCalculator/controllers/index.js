import "dotenv/config";
import axios from "axios";

const WINDOW_SIZE = 5;
const API_URL = process.env.API_URL || "http://20.244.56.144";

let numbers_window = [];
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

const fetchNumbers = async (numberid) => {
  try {
    const temp_token = await fetchToken();
    let url = null;
    numberid === 'p' ? url = `${API_URL}/test/primes` : numberid === 'f' ? url = `${API_URL}/test/fibo` : numberid === 'e' ?url = `${API_URL}/test/even` : numberid === 'r' ? url = `${API_URL}/test/rand` : null;
    if(url){
        const response = await axios.get(url , {
          headers: {
            Authorization: `Bearer ${temp_token}`,
          },
        });
        return response.data.numbers;
    }
    
  } catch (error) {
    console.error("Error fetching numbers:", error);
    throw error;
  }
};

const calculateAverage = async (req, res) => {
  const { numberid } = req.params;
  const numbers = await fetchNumbers(numberid);
  console.log("Number ID:", numbers);
  res.status(200).json({
    status: "success",
    message: "Average calculated successfully",
  });
};

export default calculateAverage;
