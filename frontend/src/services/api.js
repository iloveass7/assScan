import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const processImage = async (file, mode) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('mode', mode);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/process-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 120000 // 2 minutes timeout
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Failed to process image');
    }
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await axios.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Server is not responding');
  }
};