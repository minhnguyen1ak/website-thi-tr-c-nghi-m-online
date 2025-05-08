import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import "./css/form.css";

// Import các component
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CreateRoom from "./components/CreateRoom";
import CreateExam from "./components/CreateExam";
import CreateQuestion from "./components/CreateQuestion";
import TakeExamForm from "./components/TakeExamForm";
import ExamRoom from "./components/ExamRoom";
import ExamForm from "./components/ExamForm";
import ViewExam from "./components/ViewExam";
import EditExam from "./components/EditExam";
import RoomToView from "./components/RoomToView";
import EditRoom from "./components/EditRoom";

// Main App component wrapped in Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// AppContent component to handle state and routing
const AppContent = () => {
  const navigate = useNavigate();
  const [roomToView, setRoomToView] = useState(null);
  const [authPage, setAuthPage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("currentUser")
  );

  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isCreatingExam, setIsCreatingExam] = useState(false);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [isTakingExam, setIsTakingExam] = useState(false);
  const [isViewingResults, setIsViewingResults] = useState(false);

  const [exams, setExams] = useState(
    () => JSON.parse(localStorage.getItem("exams")) || []
  );
  const [rooms, setRooms] = useState(
    () => JSON.parse(localStorage.getItem("rooms")) || []
  );
  const [results, setResults] = useState(
    () => JSON.parse(localStorage.getItem("results")) || []
  );

  const [examData, setExamData] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [examToView, setExamToView] = useState(null);

  useEffect(() => {
    localStorage.setItem("exams", JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  const resetAllModes = () => {
    setIsCreatingRoom(false);
    setIsCreatingExam(false);
    setIsCreatingQuestion(false);
    setIsTakingExam(false);
    setIsViewingResults(false);

    setStudentInfo(null);
    setExamData(null);
    setCurrentExam(null);
    setSelectedRoom(null);
    setSelectedExam(null);
    setSelectedResult(null);
    setExamToView(null);
    setRoomToView(null);
  };

  const handleLoginSuccess = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setIsLoggedIn(true);
    setAuthPage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    resetAllModes();
  };

  const handleCreateRoom = () => {
    resetAllModes();
    setIsCreatingRoom(true);
  };

  const handleCreateExam = () => {
    resetAllModes();
    setIsCreatingExam(true);
  };

  const handleCreateQuestions = (data) => {
    setExamData(data);
    setCurrentExam(data);
    setIsCreatingExam(false);
    setIsCreatingQuestion(true);
  };

  const handleSaveExam = (examData) => {
    const totalQuestions = examData.questions.length;
    const scorePerQuestion = parseInt(examData.scorePerQuestion) || 1;
    const totalMarks = totalQuestions * scorePerQuestion;

    const updatedExam = {
      ...examData,
      examTime: examData.duration,
      totalQuestions,
      totalMarks,
      isShared: true,
    };

    const updatedExams = [
      ...exams.filter((e) => e.examCode !== updatedExam.examCode),
      updatedExam,
    ];
    setExams(updatedExams);
    alert("Đề thi đã được lưu!");
    resetAllModes();
    navigate("/");
  };

  const handleSaveRoom = (roomData) => {
    const updatedRooms = [
      ...rooms.filter((r) => r.roomCode !== roomData.roomCode),
      roomData,
    ];
    setRooms(updatedRooms);
    alert("Phòng thi đã được lưu!");
    resetAllModes();
    navigate("/");
  };

  const handleJoinRoom = (info, roomCode) => {
    const trimmedCode = roomCode.trim().toLowerCase();
    const room = rooms.find(
      (r) => r.roomCode?.trim().toLowerCase() === trimmedCode
    );

    if (!room) return alert("Không tìm thấy phòng thi!");
    if (!room.examCode) return alert("Phòng thi chưa có đề thi!");

    const exam = exams.find(
      (e) =>
        e.examCode?.trim().toLowerCase() === room.examCode.trim().toLowerCase()
    );

    if (!exam) return alert("Không tìm thấy đề thi cho phòng này!");

    setStudentInfo(info);
    setExamData(exam);
    setSelectedRoom(room);
    setSelectedExam(exam);
    setIsTakingExam(true);
  };

  const handleSaveResults = (userAnswers) => {
    if (!Array.isArray(userAnswers))
      return console.error("userAnswers is not an array");

    const correctCount = userAnswers.filter(
      (ans) => ans.selectedAnswer === ans.correctAnswer
    ).length;
    const totalQuestions = userAnswers.length;
    const scorePerQuestion = parseInt(selectedExam?.scorePerQuestion || 1);
    const totalScore = correctCount * scorePerQuestion;

    const resultData = {
      examCode: selectedExam?.examCode || "N/A",
      examName: selectedExam?.examName || "Không rõ",
      score: totalScore,
      totalQuestions,
      correctCount,
      studentInfo,
      submissionTime: new Date().toLocaleString(),
      answers: userAnswers,
    };

    setResults((prev) => [...prev, resultData]);
    alert("Nộp bài thành công! Số điểm: " + totalScore);
    resetAllModes();
  };

  const handleDeleteExam = (examCode) => {
    setExams((prev) => prev.filter((exam) => exam.examCode !== examCode));
  };

  const handleDeleteRoom = (roomCode) => {
    setRooms((prev) => prev.filter((room) => room.roomCode !== roomCode));
  };

  const handleEditRoom = (room) => {
    navigate(`/edit-room/${room.roomCode}`);
  };

  // EditExamWrapper
  const EditExamWrapper = ({ exams, onSave, onCancel }) => {
    const { examCode } = useParams();
    const examData = exams.find((exam) => exam.examCode === examCode);

    if (!examData) {
      return <div>Đề thi không tồn tại!</div>;
    }

    return (
      <EditExam
        examData={examData}
        onSave={onSave}
        onCancel={onCancel}
      />
    );
  };

  // EditRoomWrapper
  const EditRoomWrapper = ({ rooms, exams, onSave, onCancel }) => {
    const { roomCode } = useParams();
    const roomData = rooms.find((room) => room.roomCode === roomCode);

    if (!roomData) {
      return <div>Phòng thi không tồn tại!</div>;
    }

    return (
      <EditRoom
        roomData={roomData}
        exams={exams}
        onSave={onSave}
        onCancel={onCancel}
      />
    );
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                onSwitchToLogin={() => setAuthPage("login")}
                onSwitchToRegister={() => setAuthPage("register")}
                onCreateRoom={handleCreateRoom}
                onCreateExam={handleCreateExam}
                onStartExam={() => setIsTakingExam(true)}
                onGoHome={resetAllModes}
                exams={exams.filter((exam) => exam.isShared)}
                showExamList={
                  !isCreatingRoom &&
                  !isCreatingExam &&
                  !isCreatingQuestion &&
                  !isTakingExam &&
                  !authPage &&
                  !isViewingResults &&
                  !examToView
                }
                onStartExamFromCard={handleJoinRoom}
                results={results}
                onViewResults={() => {
                  resetAllModes();
                  setIsViewingResults(true);
                }}
              />

              {!isLoggedIn && authPage === "login" && (
                <Login
                  onSwitchToRegister={() => setAuthPage("register")}
                  onLoginSuccess={handleLoginSuccess}
                />
              )}

              {!isLoggedIn && authPage === "register" && (
                <Register onSwitchToLogin={() => setAuthPage("login")} />
              )}

              {isLoggedIn && isCreatingRoom && !isTakingExam && !isViewingResults && (
                <CreateRoom
                  exams={exams}
                  onBack={() => setIsCreatingRoom(false)}
                  onSave={handleSaveRoom}
                />
              )}

              {isLoggedIn && isCreatingExam && (
                <CreateExam
                  examData={examData}
                  onBack={() => setIsCreatingExam(false)}
                  onNext={handleCreateQuestions}
                />
              )}

              {isLoggedIn && isCreatingQuestion && (
                <CreateQuestion
                  examData={examData}
                  onBack={() => {
                    setIsCreatingQuestion(false);
                    setIsCreatingExam(true);
                  }}
                  onSave={handleSaveExam}
                />
              )}

              {isLoggedIn && isTakingExam && !studentInfo && (
                <TakeExamForm
                  rooms={rooms}
                  onBack={() => setIsTakingExam(false)}
                  onJoinRoom={handleJoinRoom}
                />
              )}

              {isLoggedIn &&
                isTakingExam &&
                studentInfo &&
                selectedExam &&
                selectedRoom && (
                  <ExamForm
                    examData={selectedExam}
                    roomData={selectedRoom}
                    studentInfo={studentInfo}
                    onSubmit={handleSaveResults}
                    onExit={() => {
                      setIsTakingExam(false);
                      resetAllModes();
                    }}
                  />
                )}

              {isLoggedIn && isViewingResults && (
                <div className="form-container">
                  <h2>📊 Kết quả thi đã làm</h2>
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Số Điểm</th>
                        <th>Ngày Nộp</th>
                        <th>Hành Động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index}>
                          <td>{result.score}</td>
                          <td>{result.submissionTime}</td>
                          <td>
                            <button onClick={() => setSelectedResult(result)}>
                              Xem
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedResult && (
                    <div
                      className="result-detail"
                      style={{
                        marginTop: "1rem",
                        background: "#f5f5f5",
                        padding: "1rem",
                        borderRadius: "10px",
                      }}
                    >
                      <h3>📄 Chi tiết kết quả: {selectedResult.examName}</h3>
                      <p>
                        <strong>Họ tên:</strong> {selectedResult.studentInfo?.fullName}
                      </p>
                      <p>
                        <strong>Lớp:</strong>{" "}
                        {selectedResult.studentInfo?.className || "Không rõ"}
                      </p>
                      <p>
                        <strong>Số điểm:</strong> {selectedResult.score}
                      </p>
                      <p>
                        <strong>Thời gian nộp:</strong> {selectedResult.submissionTime}
                      </p>
                      <button onClick={() => setSelectedResult(null)}>Đóng</button>
                    </div>
                  )}
                </div>
              )}

              {examToView && (
                <ViewExam exam={examToView} onClose={() => setExamToView(null)} />
              )}
              {roomToView && (
                <RoomToView room={roomToView} onClose={() => setRoomToView(null)} />
              )}

              {isLoggedIn &&
                !isCreatingRoom &&
                !isCreatingExam &&
                !isCreatingQuestion &&
                !studentInfo &&
                !isTakingExam &&
                !isViewingResults &&
                !examToView && (
                  <div className="form-container">
                    {exams.length > 0 && (
                      <>
                        <h2>📘 Danh Sách Đề Thi Đã Lưu</h2>
                        <table className="exam-table">
                          <thead>
                            <tr>
                              <th>Mã Đề</th>
                              <th>Tên Đề Thi</th>
                              <th>Hành Động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {exams.map((exam, index) => (
                              <tr key={index}>
                                <td>{exam.examCode}</td>
                                <td>{exam.examName}</td>
                                <td>
                                  <button onClick={() => setExamToView(exam)}>
                                    Xem
                                  </button>
                                  <button
                                    onClick={() => navigate(`/edit-exam/${exam.examCode}`)}
                                  >
                                    Sửa
                                  </button>
                                  <button
                                    onClick={() => handleDeleteExam(exam.examCode)}
                                  >
                                    Xóa
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}

                    {rooms.length > 0 && (
                      <>
                        <h2>🏫 Danh Sách Phòng Thi Đã Tạo</h2>
                        <table className="room-table">
                          <thead>
                            <tr>
                              <th>Mã Phòng</th>
                              <th>Tên Phòng</th>
                              <th>Mã Đề Thi</th>
                              <th>Hành Động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rooms.map((room, index) => (
                              <tr key={index}>
                                <td>{room.roomCode}</td>
                                <td>{room.roomName}</td>
                                <td>{room.examCode}</td>
                                <td>
                                  <button onClick={() => setRoomToView(room)}>Xem</button>
                                  <button onClick={() => handleEditRoom(room)}>Sửa</button>
                                  <button onClick={() => handleDeleteRoom(room.roomCode)}>
                                    Xóa
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                )}
            </>
          }
        />
        <Route
          path="/edit-room/:roomCode"
          element={
            <EditRoomWrapper
              rooms={rooms}
              exams={exams}
              onSave={handleSaveRoom}
              onCancel={() => navigate("/")}
            />
          }
        />
        <Route
          path="/edit-exam/:examCode"
          element={
            <EditExamWrapper
              exams={exams}
              onSave={handleSaveExam}
              onCancel={() => navigate("/")}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;