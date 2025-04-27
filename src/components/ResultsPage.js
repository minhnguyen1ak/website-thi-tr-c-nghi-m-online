import React, { useState, useEffect } from 'react';
import '../css/ResultsPage.css';

const ResultsPage = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const storedResults = JSON.parse(localStorage.getItem("results")) || [];
        setResults(storedResults);
    }, []);

    return (
        <div className="result-page-container">
            <h2>📘 Danh Sách Kết Quả Thi</h2>
            <table className="result-table">
                <thead>
                    <tr>
                        <th>Mã Đề</th>
                        <th>Tên Đề Thi</th>
                        <th>Họ Tên</th>
                        <th>Số Điểm</th>
                        <th>Thời Gian Nộp Bài</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>

                            <td data-label="Tên Đề Thi">{result.examName}</td>
                            <td data-label="Họ Tên">{result.studentInfo?.fullName || 'Không rõ'}</td>
                            <td data-label="Số Điểm">{result.score}</td>
                            <td data-label="Thời Gian Nộp Bài">{result.submissionTime}</td>
                            <td data-label="Hành Động">
                                <button onClick={() => alert('Xem chi tiết kết quả: ' + result.studentInfo?.fullName)}>
                                    Xem
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsPage;