const API_URL = "https://cloud-online-exam-production.up.railway.app"; // Railway backend

export const loginUser = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", email); // MUST be "username"
  formData.append("password", password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!res.ok) {
    let error = "Login failed";
    try {
      const errData = await res.json();
      if (Array.isArray(errData.detail)) {
        error = errData.detail.map((d: any) => d.msg).join(", ");
      } else {
        error = errData.detail || error;
      }
    } catch (_) {}
    throw new Error(error);
  }

  return res.json(); // returns { access_token: "..." }
};

export const fetchExams = async (token: string) => {
  console.log("Sending token in fetchExams:", token); // ✅ Debug
  const res = await fetch(`${API_URL}/exams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let error = "Failed to fetch exams";
    try {
      const errData = await res.json();
      error = errData.detail || error;
    } catch (_) {}
    throw new Error(error);
  }

  return res.json();
};
