export async function fetcRegister(fullName:string,phone:string,email:string, password:string, dob:string) {
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, email, dob, password }),
    });
    const data = await res.json();
    return data
}