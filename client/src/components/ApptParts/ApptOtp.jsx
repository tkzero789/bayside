import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ApptOtp = ({
  setIsOtpConfirmed,
  show,
  setShow,
  confirmSetAppt,
  isSubmit,
}) => {
  const [otp, setOtp] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleOtpChange = (e) => {
    const otpInput = e.target.value;
    if (otpInput.length <= 6) {
      setOtp(otpInput);
    }
  };

  const handleConfirm = () => {
    if (otp.length === 6) {
      setIsOtpConfirmed(true);
      setShow(false);
    } else {
      toast.error("Mã xác thực không hợp lệ");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={true}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập mã xác thực OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Nhập mã"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button
            className={`btn ${
              otp.length === 6 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={confirmSetAppt}
            disabled={otp.length < 6 || isSubmit}
          >
            <Toaster
              toastOptions={{
                className: "toast-noti",
              }}
              position="top-center"
              richColors
            />
            {isSubmit ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} style={{ color: "white" }} />
              </Box>
            ) : (
              "Xác nhận"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApptOtp;
