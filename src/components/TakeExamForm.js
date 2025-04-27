import React, { useState } from 'react';
import '../css/form.css';

const TakeExamForm = ({ rooms, onBack, onJoinRoom }) => {
    const [roomCode, setRoomCode] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [error, setError] = useState('');

    const normalizeRoomCode = (code) => code.trim().toLowerCase();

    const handleJoin = () => {
        const trimmedRoomCode = normalizeRoomCode(roomCode);
        const trimmedName = studentName.trim();
        const trimmedClass = studentClass.trim();

        if (!trimmedRoomCode) {
            setError('Vui lòng nhập mã phòng thi.');
            return;
        }

        if (!trimmedName || !trimmedClass) {
            setError('Vui lòng nhập đầy đủ họ tên và lớp.');
            return;
        }

        const room = rooms.find(
            (r) => normalizeRoomCode(r.roomCode) === trimmedRoomCode
        );
        if (!room) {
            setError('Mã phòng thi không tồn tại.');
            return;
        }

        const exam = room.examCode ? room.examCode : null;
        if (!exam) {
            setError('Phòng thi này chưa có đề thi.');
            return;
        }

        setError('');
        onJoinRoom(
            {
                fullName: trimmedName,
                className: trimmedClass,
                room,
                exam,
            },
            trimmedRoomCode // Truyền mã phòng thi đã chuẩn hóa
        );
    };

    return (
        <div className="form-container">
            <h2>Tham Gia Phòng Thi</h2>

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            <div className="form-group">
                <label>Mã Phòng Thi:</label>
                <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Nhập mã phòng thi..."
                />
            </div>

            <div className="form-group">
                <label>Họ Tên:</label>
                <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nhập họ tên thí sinh..."
                />
            </div>

            <div className="form-group">
                <label>Lớp:</label>
                <input
                    type="text"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="Nhập lớp..."
                />
            </div>

            <div className="form-buttons">
                <button onClick={handleJoin}>Vào Phòng Thi</button>
                <button onClick={onBack}>Quay Lại</button>
            </div>
        </div>
    );
};

export default TakeExamForm;
