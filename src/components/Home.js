// Home.js
import React, { useState, useEffect } from 'react';
import '../css/home.css';
import EditExam from './EditExam';

const Home = ({
    isLoggedIn,
    onLogout,
    onSwitchToLogin,
    onSwitchToRegister,
    onCreateRoom,
    onCreateExam,
    onStartExam,
    onGoHome,
    showExamList,
    onStartExamFromCard,
    results = [],
    onViewResults
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);

    useEffect(() => {
        const storedExams = JSON.parse(localStorage.getItem('exams')) || [];
        setExams(storedExams);
    }, []);

    const handleEditExam = (examCode) => {
        const examToEdit = exams.find(exam => exam.examCode === examCode);
        if (examToEdit) {
            setSelectedExam(examToEdit);
        } else {
            alert('Đề thi không tồn tại trong danh sách!');
        }
    };

    const handleSaveExam = (updatedExam) => {
        const updatedExams = exams.map(exam =>
            exam.examCode === updatedExam.examCode ? updatedExam : exam
        );
        localStorage.setItem('exams', JSON.stringify(updatedExams));
        setExams(updatedExams);
        setSelectedExam(null);
        alert('Đề thi đã được cập nhật!');
    };

    return (
        <>
            <header className="home-header">
                <div className="logo" onClick={onGoHome} style={{ cursor: 'pointer' }}>Quizz</div>
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`menu-buttons ${menuOpen ? 'open' : ''}`}>
                    {!isLoggedIn ? (
                        <div className="auth-buttons">
                            <button onClick={onSwitchToLogin}>Đăng nhập</button>
                            <button onClick={onSwitchToRegister}>Đăng ký</button>
                        </div>
                    ) : (
                        <div className="user-actions">
                            <button onClick={onStartExam}>Thi</button>
                            <button onClick={onCreateExam}>Tạo đề thi</button>
                            <button onClick={onCreateRoom}>Tạo phòng thi</button>
                            <button onClick={onViewResults}>Xem kết quả thi</button>
                            <button onClick={onLogout}>Đăng xuất</button>
                        </div>
                    )}
                </div>
            </header>

            {showExamList && exams.length > 0 && (
                <div className="exam-card-list">
                    <h2>📘 Danh sách đề thi chia sẻ</h2>
                    <div className="card-container">
                        {exams.map((exam, index) => (
                            <div className="exam-card" key={index}>
                                <h3>{exam.examName}</h3>
                                <p><strong>Thời gian:</strong> {exam.duration} phút</p>
                                <p><strong>Số câu hỏi:</strong> {exam.questionCount}</p>
                                <p><strong>Thang điểm:</strong> {exam.totalScore}</p>
                                <button onClick={() => onStartExamFromCard?.(exam.examCode)}>Thi</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedExam && (
                <EditExam
                    examData={selectedExam}
                    onSave={handleSaveExam}
                    onBack={() => setSelectedExam(null)}
                />
            )}
        </>
    );
};

export default Home;
