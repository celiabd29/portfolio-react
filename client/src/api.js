const API_URL = "http://localhost"; // Modifier lors du déploiement

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/`);
  return response.json();
};
