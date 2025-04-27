// src/components/Login.js
import React, { useState } from 'react';
import '../css/auth.css';

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Lấy user đã đăng ký từ localStorage
        const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

        if (
            storedUser &&
            form.username === storedUser.username &&
            form.password === storedUser.password
        ) {
            alert('Đăng nhập thành công!');
            localStorage.setItem('currentUser', JSON.stringify(storedUser)); // Thêm dòng này
            onLoginSuccess();
        } else {
            setError('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="auth-container">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Tên đăng nhập"
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    required
                    onChange={handleChange}
                />
                {error && <p style={{ color: 'red', marginTop: '-5px' }}>{error}</p>}
                <button type="submit">Đăng nhập</button>
                <p>
                    Chưa có tài khoản?{' '}
                    <span onClick={onSwitchToRegister}>Đăng ký</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
