'use client';
import { useState } from 'react';
export default function Login() {
  const [error, setError] = useState(''), [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error);
      window.location.assign('/admin');
    } catch (error) { setError(error.message || 'Không thể đăng nhập.'); setBusy(false); }
  }
  return <main className="admin-login"><form onSubmit={submit} className="admin-panel"><img src="/logo.svg" width="48" height="54" alt="Luật Trần Á" /><h1>Quản trị nội dung</h1><p>Đăng nhập để quản lý website Luật Trần Á.</p><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Mật khẩu<input name="password" type="password" autoComplete="current-password" required maxLength={256} /></label>{error && <p role="alert" className="admin-error">{error}</p>}<button disabled={busy}>{busy ? 'Đang đăng nhập…' : 'Đăng nhập'}</button><a href="/">← Về website</a></form></main>;
}
