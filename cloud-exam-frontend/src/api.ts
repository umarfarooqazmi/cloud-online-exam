const API_URL = 'https://your-backend-url.railway.app'; // replace with actual Railway URL

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: email, password }),
  });
  return res.json();
};

export const fetchExams = async (token: string) => {
  const res = await fetch(`${API_URL}/exams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
