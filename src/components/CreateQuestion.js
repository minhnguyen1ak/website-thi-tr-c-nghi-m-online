import React, { useState } from 'react';
import '../css/form.css';

const CreateQuestion = ({ examData, onBack, onSave }) => {
    const questionCount = parseInt(examData.questionCount);
    const initialQuestions = Array.from({ length: questionCount }, () => ({
        questionText: '',
        options: { a: '', b: '', c: '', d: '' },
        correctAnswer: ''
    }));

    const [questions, setQuestions] = useState(initialQuestions);

    const handleChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (index, option, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options[option] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = questions.every(
            q =>
                q.questionText &&
                q.correctAnswer &&
                q.options.a &&
                q.options.b &&
                q.options.c &&
                q.options.d
        );
        if (!isValid) {
            alert("Vui lòng nhập đầy đủ tất cả thông tin cho mỗi câu hỏi!");
            return;
        }

        console.log("Danh sách câu hỏi:", questions);
        onSave(questions);
    };

    return (
        <div className="form-container">
            <h2>Nhập {questionCount} Câu Hỏi</h2>
            <div className="exam-info">
                <p><strong>Mã Đề Thi:</strong> {examData.examCode}</p>
                <p><strong>Tên Đề Thi:</strong> {examData.examName}</p>
                <p><strong>Thời Gian Làm Bài:</strong> {examData.duration} phút</p>
                <p><strong>Số lượng câu hỏi:</strong> {examData.questionCount}</p>
                <p><strong>Điểm mỗi câu:</strong> {examData.scorePerQuestion}</p>
            </div>

            <form onSubmit={handleSubmit} className="exam-form">
                {questions.map((q, index) => (
                    <div key={index} className="question-block">
                        <h3>Câu {index + 1}</h3>
                        <div className="form-group">
                            <label>Nội dung câu hỏi</label>
                            <input
                                type="text"
                                value={q.questionText}
                                onChange={(e) => handleChange(index, 'questionText', e.target.value)}
                                required
                            />
                        </div>
                        {['a', 'b', 'c', 'd'].map(opt => (
                            <div key={opt} className="form-group">
                                <label>Đáp án {opt.toUpperCase()}</label>
                                <input
                                    type="text"
                                    value={q.options[opt]}
                                    onChange={(e) => handleOptionChange(index, opt, e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                        <div className="form-group">
                            <label>Đáp án đúng</label>
                            <select
                                value={q.correctAnswer}
                                onChange={(e) => handleChange(index, 'correctAnswer', e.target.value)}
                                required
                            >
                                <option value="">--Chọn--</option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                                <option value="d">D</option>
                            </select>
                        </div>
                        <hr />
                    </div>
                ))}

                <div className="button-group">
                    <button type="submit" className="save-button">Lưu Tất Cả Câu Hỏi</button>
                    <button type="button" onClick={onBack} className="back-button">Quay lại</button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuestion;
