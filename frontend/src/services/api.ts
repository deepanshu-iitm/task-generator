export async function generateTasks(data: {
    goal: string;
    users: string;
    constraints: string;
    template: string;
    risks: string;
  }) {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    const response = await fetch(`${API_BASE_URL}/generate-tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate tasks');
    }
  
    return response.json();
  }
  