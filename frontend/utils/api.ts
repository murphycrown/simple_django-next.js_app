export async function generateCard(name: string, stacks: Array<{ name: string; icon: string }>) {
  const url=process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/api/generate-card/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, stacks }),
  });
  return response.json();
}

export async function saveCard(name: string, stacks: Array<{ name: string; icon: string }>) {
  const response = await fetch(`${url}/api/save-card/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, stacks }),
  });
  return response.json();
}