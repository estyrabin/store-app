export async function POST(req) {
  const { email, password } = await req.json();

  // Mock credentials
  if (email === 'user@example.com' && password === 'password123') {
    return new Response(JSON.stringify({ success: true, message: 'Login successful.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: false, message: 'Invalid credentials.' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
}

