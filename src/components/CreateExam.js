import React, { useState, useEffect } from 'react';
import '../css/form.css';

const CreateExam = ({ examData, onBack, onNext }) => {
    const [form, setForm] = useState(examData || {
        examCode: '',
        examName: '',
        grade: '',
        duration: '',
        questionCount: '',
        totalScore: '',
        scorePerQuestion: 0,
        isShared: false
    });

    useEffect(() => {
        const { questionCount, totalScore } = form;
        if (questionCount && totalScore && Number(questionCount) > 0) {
            const score = (Number(totalScore) / Number(questionCount)).toFixed(2);
            setForm(prev => ({ ...prev, scorePerQuestion: score }));
        }
    }, [form.questionCount, form.totalScore]); // Chỉ theo dõi 2 trường này

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleShareChange = () => {
        setForm(prev => ({ ...prev, isShared: !prev.isShared }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const storedExams = JSON.parse(localStorage.getItem("exams")) || [];

        const isDuplicate = storedExams.some(exam => exam.examCode === form.examCode);
        if (isDuplicate) {
            alert('Mã đề thi đã tồn tại. Vui lòng nhập mã đề thi khác!');
            return;
        }

        const newExam = {
            ...form,
            isShared: Boolean(form.isShared),
            questions: []
        };

        storedExams.push(newExam);
        localStorage.setItem("exams", JSON.stringify(storedExams));

        // Nếu đề thi được chia sẻ, lưu vào sharedExams để admin xét duyệt
        if (form.isShared) {
            const sharedExams = JSON.parse(localStorage.getItem("sharedExams")) || [];
            sharedExams.push({ ...form, status: 'pending' }); // Admin sẽ duyệt sau
            localStorage.setItem("sharedExams", JSON.stringify(sharedExams));
        }

        alert('Lưu đề thi thành công!');
        onNext(form);
    };

    return (
        <div className="form-container">
            <h2>Tạo Đề Thi</h2>
            <form onSubmit={handleSubmit} className="exam-form">
                <div className="form-group">
                    <label>Mã Đề Thi</label>
                    <input type="text" name="examCode" required value={form.examCode} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Tên Đề Thi</label>
                    <input type="text" name="examName" required value={form.examName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Khối Thi</label>
                    <input type="text" name="grade" required value={form.grade} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Thời Gian Làm Bài</label>
                    <input type="number" name="duration" required value={form.duration} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Số Lượng Câu Hỏi</label>
                    <input type="number" name="questionCount" required value={form.questionCount} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Tổng Điểm Đề Thi</label>
                    <input type="number" name="totalScore" required value={form.totalScore} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" value={`Điểm mỗi câu: ${form.scorePerQuestion}`} readOnly className="readonly-input" />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={form.isShared}
                            onChange={handleShareChange}
                        />
                        Chia sẻ đề thi
                    </label>
                </div>
                <div className="button-group">
                    <button type="submit" className="save-button">Tiếp Theo</button>
                    <button type="button" onClick={onBack} className="back-button">Thoát</button>
                </div>
            </form>
        </div>
    );
};

export default CreateExam;