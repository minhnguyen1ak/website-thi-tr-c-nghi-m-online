// src/components/Register.js
import React, { useState } from 'react';
import '../css/auth.css';

const Register = ({ onSwitchToLogin }) => {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }

        // Lưu thông tin user vào localStorage
        const user = {
            email: form.email,
            username: form.username,
            password: form.password
        };

        localStorage.setItem('registeredUser', JSON.stringify(user));

        alert('Đăng ký thành công! Mời bạn đăng nhập.');
        onSwitchToLogin(); // Chuyển qua trang login
    };

    return (
        <div className="auth-container">
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="text" name="username" placeholder="Tên đăng nhập" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Mật khẩu" required onChange={handleChange} />
                <input type="password" name="confirmPassword" placeholder="Xác nhận mật khẩu" required onChange={handleChange} />
                {error && <p style={{ color: 'red', marginTop: '-5px' }}>{error}</p>}
                <button type="submit">Đăng ký</button>
                <p>Đã có tài khoản? <span onClick={onSwitchToLogin}>Đăng nhập</span></p>
            </form>
        </div>
    );
};

export default Register;
