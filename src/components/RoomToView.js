import React, { useEffect } from "react";

const RoomToView = ({ room, onClose }) => {
  useEffect(() => {
    // Khi RoomToView mở, khóa cuộn trang
    document.body.style.overflow = "hidden";

    // Khi RoomToView đóng, reset lại
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!room) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        zIndex: 9999,
        paddingTop: "70px", // chừa menu
      }}
    >
      <div
        style={{
          padding: "40px 20px",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
          Xem Thông Tin Phòng Thi
        </h2>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "30px",
          }}
        >
          <p><strong>Mã Phòng:</strong> {room.roomCode}</p>
          <p><strong>Tên Phòng:</strong> {room.roomName}</p>
          <p><strong>Mã Đề Thi:</strong> {room.examCode}</p>

          <button
            onClick={onClose}
            style={{
              marginTop: "30px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomToView;
