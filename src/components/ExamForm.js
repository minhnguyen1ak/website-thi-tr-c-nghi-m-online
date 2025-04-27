import React, { useState, useEffect } from 'react';
import '../css/examform.css';

const ExamForm = ({ examData, studentInfo, roomData, onSubmit, onExit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(examData.duration * 60);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [submissionTime, setSubmissionTime] = useState('');
    const [menuOpen, setMenuOpen] = useState(false); // Để mở/đóng menu hamburger

    const questions = examData.questions;

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let totalScore = 0;
        questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                totalScore += Number(examData.scorePerQuestion); // Ép kiểu rõ ràng
            }
        });
        return totalScore;
    };





    const handleSubmit = () => {
        const finalScore = calculateScore();
        const currentTime = new Date().toLocaleString();

        setScore(finalScore);
        setSubmissionTime(currentTime);
        setIsSubmitted(true);
        setIsTimeUp(true);

        // Lưu kết quả vào localStorage
        const result = {
            studentInfo,
            examData,
            score: finalScore,
            submissionTime: currentTime,
            answers
        };

        const savedResults = JSON.parse(localStorage.getItem("results")) || [];
        savedResults.push(result);
        localStorage.setItem("results", JSON.stringify(savedResults));

        setTimeout(() => {
            onSubmit(result); // Gửi toàn bộ kết quả
        }, 200);
    };



    const isAnswered = (index) => {
        return answers.hasOwnProperty(index);
    };

    useEffect(() => {
        if (isTimeUp) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsTimeUp(true);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isTimeUp]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };
    if (isSubmitted) {
        return (
            <div className="result-form">
                <h2>Thông Tin Kết Quả</h2>
                <p>📚 Họ Tên: {studentInfo.fullName}</p>
                <p>⏰ Thời Gian Nộp Bài: {submissionTime}</p>

                {/* Hiển thị số điểm đúng */}
                <p>📝 Số Điểm: {Number(score)} / {Number(examData.scorePerQuestion) * questions.length}</p>


                <div className="answer-review">
                    <h3>Danh Sách Các Câu Hỏi</h3>
                    {questions.map((question, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === question.correctAnswer;
                        return (
                            <div key={index} className={`question-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                                <p>Câu {index + 1}: {question.questionText}</p>
                                <p>Đáp Án Của Bạn: {userAnswer ? question.options[userAnswer] : 'Chưa trả lời'}</p>
                                <p className={isCorrect ? 'correct-answer' : 'incorrect-answer'}>
                                    {isCorrect ? '✔ Đúng' : '❌ Sai'} - Đáp án đúng: {question.options[question.correctAnswer]}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <button className="return-button" onClick={onExit}>⬅️ Quay về trang chính</button>
            </div>
        );
    }

    return (
        <div className="exam-form">
            <div className="exam-info">
                <h2>📝 Tên Đề Thi: {examData.examName}</h2>
                <p>📘 Phòng Thi: {roomData?.roomName || 'Không rõ'}</p>
                <p>⏱️ Thời Gian: {examData.duration} phút</p>
                <p>⏰ Thời gian còn lại: {formatTime(timeLeft)}</p>
                <p>👤 Thí Sinh: {studentInfo.fullName}</p>
                <p>🏫 Lớp: {studentInfo.className}</p>
            </div>

            {/* Hamburger Menu */}
            <div className="hamburger-menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`question-navigation ${menuOpen ? 'open' : ''}`}>
                {questions.map((q, idx) => (
                    <button
                        key={idx}
                        className={isAnswered(idx) ? 'answered' : 'not-answered'}
                        onClick={() => setCurrentQuestionIndex(idx)}
                    >
                        Câu {idx + 1}
                    </button>
                ))}

            </div>
            <button className="exit-btn" onClick={handleSubmit}>Nộp bài</button>

            <div className="question-area">
                <h3>Câu {currentQuestionIndex + 1}: {questions[currentQuestionIndex].questionText}</h3>

                <div className="options">
                    {['a', 'b', 'c', 'd'].map((opt) => {
                        const optionText = questions[currentQuestionIndex].options[opt];
                        return (
                            <div
                                key={opt}
                                className={`option ${answers[currentQuestionIndex] === opt ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(currentQuestionIndex, opt)}
                            >
                                {opt.toUpperCase()}: {optionText}
                            </div>
                        );
                    })}
                </div>

                <div className="navigation-buttons">
                    <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>←</button>
                    <span>{currentQuestionIndex + 1}/{questions.length}</span>
                    <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>→</button>
                </div>
            </div>
        </div>
    );
};

export default ExamForm;