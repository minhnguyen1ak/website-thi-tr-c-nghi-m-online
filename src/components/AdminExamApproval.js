import React, { useEffect, useState } from 'react';

const AdminExamApproval = () => {
    const [sharedExams, setSharedExams] = useState([]);

    useEffect(() => {
        const exams = JSON.parse(localStorage.getItem("sharedExams")) || [];
        setSharedExams(exams);
    }, []);

    const approveExam = (index) => {
        const updated = [...sharedExams];
        const approvedExam = updated[index];
        approvedExam.status = 'approved';

        // Lưu vào danh sách đã duyệt
        const approvedExams = JSON.parse(localStorage.getItem("approvedExams")) || [];
        approvedExams.push(approvedExam);
        localStorage.setItem("approvedExams", JSON.stringify(approvedExams));

        // Xoá khỏi sharedExams
        updated.splice(index, 1);
        setSharedExams(updated);
        localStorage.setItem("sharedExams", JSON.stringify(updated));
    };

    return (
        <div>
            <h2>Danh sách đề thi chờ duyệt</h2>
            {sharedExams.length === 0 ? <p>Không có đề nào chờ duyệt.</p> :
                sharedExams.map((exam, idx) => (
                    <div key={idx} className="card">
                        <h4>{exam.examName}</h4>
                        <p>Mã đề: {exam.examCode}</p>
                        <p>Khối: {exam.grade}</p>
                        <button onClick={() => approveExam(idx)}>Duyệt</button>
                    </div>
                ))
            }
        </div>
    );
};

export default AdminExamApproval;