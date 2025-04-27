// components/ViewExam.js
import React from "react";

const ViewExam = ({ exam, onClose }) => {
    return (
        <div className="form-container">
            <h2>📘 Xem đề thi: {exam.examName}</h2>
            <p><strong>Mã đề:</strong> {exam.examCode}</p>
            <p><strong>Thời gian:</strong> {exam.examTime} phút</p>
            <p><strong>Tổng số câu hỏi:</strong> {exam.totalQuestions}</p>

            <h3>📑 Danh sách câu hỏi:</h3>

            {Array.isArray(exam.questions) && exam.questions.map((q, index) => (
                <div
                    key={index}
                    className="question"
                    style={{
                        marginBottom: "1rem",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "8px"
                    }}
                >
                    <p>
                        <strong>{index + 1}. {q.question || q.questionText || "Câu hỏi không có nội dung."}</strong>
                    </p>
                    <ul>
                        {Array.isArray(q.options) &&
                            q.options.map((opt, i) => (
                                <li key={i}>
                                    {String.fromCharCode(65 + i)}. {opt}
                                </li>
                            ))}
                    </ul>

                    <p><strong>Đáp án đúng:</strong> {q.correctAnswer}</p>
                </div>
            ))}

            <button onClick={onClose}>Đóng</button>
        </div>
    );
};

export default ViewExam;