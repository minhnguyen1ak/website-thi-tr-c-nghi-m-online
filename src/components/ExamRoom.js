import React from 'react';

const ExamRoom = ({ studentInfo, currentExam, onBack }) => {
    if (!currentExam || !currentExam.questions) {
        return <div>Đang tải đề thi...</div>;
    }

    return (
        <div className="exam-room">
            <h2>Phòng Thi: {currentExam.examName}</h2>
            <p><strong>Họ Tên:</strong> {studentInfo.studentName}</p>
            <p><strong>Lớp:</strong> {studentInfo.studentClass}</p>

            <div>
                <h3>Câu Hỏi:</h3>
                <ul>
                    {currentExam.questions.map((question, index) => (
                        <li key={index}>
                            <strong>Câu {index + 1}:</strong> {question.questionText}
                            <ul>
                                {question.answers?.map((answer, i) => (
                                    <li key={i}>{answer}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={onBack}>Quay Lại</button>
        </div>
    );
};

export default ExamRoom;
