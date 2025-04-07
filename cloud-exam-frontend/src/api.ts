const API_URL = "https://cloud-online-exam-production.up.railway.app";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Login failed');
  }

  return res.json();
};

export const fetchExams = async (token: string) => {
  const res = await fetch(`${API_URL}/exams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to fetch exams');
  }

  return res.json();
};
