import "dotenv/config";
import axios from "axios";
import fetchToken from "../functions/fetchToken.js";

const API_URL = process.env.API_URL || "http://20.244.56.144";



const fetchPosts = async (userId) => {
  try {
    const token = await fetchToken();
    const url = `${API_URL}/test/users/${userId}/posts`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      posts: response.data.posts,
      totalPosts: response.data.posts.length,
    };
  } catch (error) {
    console.error("Error fetching numbers:", error);
    throw error;
  }
};


const fetchLatestPosts = async () => {
    try {
        const token = await fetchToken();
        const url = `${API_URL}/test/posts`;
    
        const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return {
        posts: response.data.posts,
        totalPosts: response.data.posts.length,
        };
    } catch (error) {
        console.error("Error fetching numbers:", error);
        throw error;
    }
    }

const calculateTopPosts = async (req, res) => {
  try {
    const {type} = req.query;
    if(type == "latest"){
       const posts = await fetchLatestPosts();
    }
    const users = await fetchUsers();
    const userIds = Object.keys(users);

    let finalUsers = {};
    userIds.map((userId) => {
      finalUsers[userId] = {
        userId: userId,
        name: users[userId],
      };
    });
    await Promise.all(
      userIds.map(async (userId) => {
        const posts = await fetchPosts(userId);
        console.log({ posts });
        finalUsers[userId].posts = posts.posts;
        finalUsers[userId].totalPosts = posts.totalPosts;
      })
    );
    const topUsers = Object.values(finalUsers)
      .filter((user) => user.totalPosts > 0)
      .sort((a, b) => b.totalPosts - a.totalPosts)
      .slice(0, 5);
    res.status(200).json({
      message: topUsers,
    });
  } catch (error) {
    console.error("Error in calculateAverage:", error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

export default calculateTopPosts;
