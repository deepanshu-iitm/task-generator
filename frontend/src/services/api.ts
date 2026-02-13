export async function generateTasks(data: {
    goal: string;
    users: string;
    constraints: string;
    template: string;
    risks: string;
  }) {
    const response = await fetch('http://127.0.0.1:8000/generate-tasks', {
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
  