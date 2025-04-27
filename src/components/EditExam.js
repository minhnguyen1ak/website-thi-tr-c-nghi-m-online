import React, { useState, useEffect } from 'react';
import '../css/form.css';

const EditExam = ({ examData, onSave, onBack }) => {
    const [exam, setExam] = useState({
        examCode: '',
        examName: '',
        grade: '',
        duration: '',
        questionCount: '',
        totalScore: '',
        scorePerQuestion: 0,
        questions: [],
        isShared: false
    });

    useEffect(() => {
        if (examData) {
            setExam({
                examCode: examData.examCode || '',
                examName: examData.examName || '',
                grade: examData.grade || '',
                duration: examData.duration || '',
                questionCount: examData.questionCount || '',
                totalScore: examData.totalScore || '',
                scorePerQuestion: examData.scorePerQuestion || 0,
                questions: examData.questions || [],
                isShared: examData.isShared || false
            });
        }
    }, [examData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExam((prev) => ({ ...prev, [name]: value }));
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...exam.questions];
        updatedQuestions[index][field] = value;
        setExam((prev) => ({ ...prev, questions: updatedQuestions }));
    };

    const handleOptionChange = (index, option, value) => {
        const updatedQuestions = [...exam.questions];
        updatedQuestions[index].options[option] = value;
        setExam((prev) => ({ ...prev, questions: updatedQuestions }));
    };

    const handleCorrectAnswerChange = (index, value) => {
        const updatedQuestions = [...exam.questions];
        updatedQuestions[index].correctAnswer = value;
        setExam((prev) => ({ ...prev, questions: updatedQuestions }));
    };

    const handleSave = () => {
        if (!exam.examName || !exam.duration || !exam.scorePerQuestion) {
            alert('⚠️ Chưa có đầy đủ dữ liệu đề thi để lưu!');
            return;
        }
        const updatedExam = { ...exam };
        onSave(updatedExam);
    };

    return (
        <div className="form-container">
            <h2>Sửa Đề Thi: {exam.examCode}</h2>
            <form className="exam-form">
                {/* Các trường nhập liệu đề thi */}
                <div className="form-group">
                    <label>Mã Đề Thi</label>
                    <input type="text" name="examCode" value={exam.examCode} readOnly />
                </div>
                <div className="form-group">
                    <label>Tên Đề Thi</label>
                    <input type="text" name="examName" value={exam.examName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Khối Thi</label>
                    <input type="text" name="grade" value={exam.grade} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Thời Gian Làm Bài (phút)</label>
                    <input type="number" name="duration" value={exam.duration} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Số Lượng Câu Hỏi</label>
                    <input type="number" name="questionCount" value={exam.questionCount} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Tổng Điểm Đề Thi</label>
                    <input type="number" name="totalScore" value={exam.totalScore} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" value={`Điểm mỗi câu: ${exam.scorePerQuestion}`} readOnly />
                </div>

                {/* Các câu hỏi */}
                <h3>Câu Hỏi</h3>
                {exam.questions.length > 0 ? (
                    exam.questions.map((question, index) => (
                        <div key={index} className="question-block">
                            <h4>Câu {index + 1}</h4>
                            <div className="form-group">
                                <label>Nội dung câu hỏi</label>
                                <input
                                    type="text"
                                    value={question.questionText}
                                    onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                                />
                            </div>
                            {['a', 'b', 'c', 'd'].map((option) => (
                                <div key={option} className="form-group">
                                    <label>Đáp án {option.toUpperCase()}</label>
                                    <input
                                        type="text"
                                        value={question.options[option]}
                                        onChange={(e) => handleOptionChange(index, option, e.target.value)}
                                    />
                                </div>
                            ))}
                            <div className="form-group">
                                <label>Đáp án đúng</label>
                                <select
                                    value={question.correctAnswer}
                                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                >
                                    <option value="">--Chọn--</option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                    <option value="c">C</option>
                                    <option value="d">D</option>
                                </select>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Chưa có câu hỏi nào.</p>
                )}

                <div className="button-group">
                    <button type="button" onClick={handleSave} className="save-button">Lưu Đề Thi</button>
                    <button type="button" onClick={onBack} className="back-button">Quay Lại</button>
                </div>
            </form>
        </div>
    );
};

export default EditExam;