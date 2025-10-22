export async function POST(req) {
  const { fullName, phone, email, dob } = await req.json();
  // Simple field checks (for demo)
  const errors = {};
  if (!fullName || fullName.split(/\s+/).length < 2 || fullName.split(/\s+/).some(w => /^\d/.test(w))) {
    errors.fullName = 'שם מלא לא תקין';
  }
  if (!phone || !/^[0-9]+$/.test(phone)) {
    errors.phone = 'טלפון לא תקין';
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'אימייל לא תקין';
  }
  if (!dob) {
    errors.dob = 'נא להזין תאריך לידה';
  } else {
    const date = new Date(dob);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    const over18 = age > 18 || (age === 18 && (now.getMonth() > date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate())));
    if (!over18) errors.dob = 'צריך להיות מעל גיל 18';
  }
  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ success: false, errors }), { status: 400, headers: { 'Content-Type': 'application/json' }});
  }
  // Mock: pretend user was saved
  return new Response(JSON.stringify({ success: true, message: 'נרשמת בהצלחה!' }), { status: 200, headers: { 'Content-Type': 'application/json' }});
}
