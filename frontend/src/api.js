import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const registerUser = async (userData) => {
    console.log("Response data from backend:", userData);
    const response = await axios.post(`${API_URL}/register/`, userData);
    
    return response.data;
  };

  export const loginUser = async (credentials) => {
    console.log("credentials:", credentials);
    const response = await axios.post(`${API_URL}/token`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("Response data from backend:", response.data);
    
    return response.data;
};


export const submitFile = async (file, token, user_id) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_id', user_id);

  const response = await axios.post(`${API_URL}/submit/`, formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      },
  });

  return response.data;
};

export const getLeaderboard = async () => {
  const response = await axios.get(`${API_URL}/leaderboard/`);
  return response.data;
};
