import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register/`, userData);
    
    return response.data;
  };

  export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/token`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });    
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

export const getLeaderboard = async (role) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/leaderboard/`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { user_role: role }
  });
  return response.data;
};

export const submitScore = async (team_id, score, user_id) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/score/`, {
    team_id,
    score,
    user_id
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};