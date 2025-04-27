import React, { useState } from 'react';
import '../css/form.css';

const CreateRoom = ({ exams, onBack, onSave }) => {
    const [form, setForm] = useState({
        roomName: '',
        roomCode: '',
        examCode: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!form.roomName || !form.roomCode || !form.examCode) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Lấy danh sách phòng đã lưu
        const storedRooms = JSON.parse(localStorage.getItem('rooms')) || [];

        // Kiểm tra mã phòng đã tồn tại chưa
        const isDuplicateRoom = storedRooms.some(room => room.roomCode === form.roomCode);
        if (isDuplicateRoom) {
            alert('Mã phòng thi đã tồn tại. Vui lòng nhập mã phòng khác!');
            return;
        }

        const roomData = {
            ...form,
            limit: 50
        };

        storedRooms.push(roomData);
        localStorage.setItem('rooms', JSON.stringify(storedRooms));

        alert('Phòng thi đã được lưu!');
        onSave(roomData);
    };


    return (
        <div className="form-container">
            <h2>Tạo Phòng Thi</h2>
            <form onSubmit={handleSubmit} className="exam-form">
                <div className="form-group">
                    <label>Tên Phòng</label>
                    <input
                        type="text"
                        name="roomName"
                        required
                        value={form.roomName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mã Phòng</label>
                    <input
                        type="text"
                        name="roomCode"
                        required
                        value={form.roomCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Chọn Mã Đề Thi</label>
                    <select
                        name="examCode"
                        value={form.examCode}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Chọn Mã Đề Thi --</option>
                        {exams.map((exam, index) => (
                            <option key={index} value={exam.examCode}>
                                {exam.examName} ({exam.examCode})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="button-group">
                    <button type="submit" className="save-button">Lưu Phòng</button>
                    <button type="button" onClick={onBack} className="back-button">Thoát</button>
                </div>
            </form>
        </div>
    );
};

export default CreateRoom;
