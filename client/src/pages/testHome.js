import React from "react";
import { NavLink } from "react-router-dom";
import MainNav from "../components/MainNav";
import MidNav from "../components/MidNav";
import LowNav from "../components/LowNav";
import HI1 from "../assets/h6.jpg";
import HI2 from "../assets/h7.png";
import HI3 from "../assets/h8.png";
import HospitalImg from "../assets/hospitalBuilding.jpg";
import TestApptForm from "../components/TestApptForm";

export default function TestHome() {
  return (
    <>
      {/* NAVBAR */}
      <header>
        <MainNav />
        <MidNav />
        <LowNav />
      </header>

      {/* MOBILE: HAMBURGER MENU */}
      <nav className="navbar navbar-expand-lg nav-bg d-md-block d-lg-none">
        <div className="container-fluid">
          <NavLink className="navbar-brand" href="#">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-2">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" href="#">
                  Link
                </NavLink>
              </li>
              <li className="nav-item dropdown px-2">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Another action
                    </NavLink>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Something else here
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CAROUSEL */}
      <div
        id="carouselExampleInterval"
        class="carousel slide d-none d-lg-block d-xl-block"
        data-bs-ride="carousel"
      >
        <div className="hero-section">
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="5000">
              <img
                className="car-img d-block w-100"
                src={HI1}
                alt="Background 1"
              />
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img
                className="car-img d-block w-100"
                src={HI2}
                alt="Background 2"
              />
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img
                className="car-img d-block w-100"
                src={HI3}
                alt="Background 3"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* OPTIONS SECTION */}
      <section className="options w-100">
        <div className="content-container">
          <div className="options-wrapper">
            <div className="c-6">
              <div className="opt-wrapper">
                <div className="opt-header">
                  <div className="opt-header-text">Dịch vụ</div>
                </div>
                <div className="opt-box">
                  <div className="opt-title">Chẩn đoán sức khoẻ trực tuyến</div>
                  <div className="opt-body">
                    Với phòng khám online, bạn có thể tiếp cận các dịch vụ y tế
                    chất lượng mà không cần ra khỏi nhà.
                  </div>
                  <div className="opt-btn-wrapper">
                    <NavLink className="opt-btn-link" to="/record-list">
                      <btn className="opt-btn">Chẩn đoán</btn>
                    </NavLink>
                  </div>
                </div>
                <div className="opt-box">
                  <div className="opt-title">Đăng ký lịch khám</div>
                  <div className="opt-body">
                    Đăng ký dịch vụ khám bệnh của chúng tôi để nhận được sự chăm
                    sóc y tế chất lượng cao mà bạn xứng đáng.
                  </div>
                  <div className="opt-btn-wrapper">
                    <NavLink className="opt-btn-link" to="/appt-request">
                      <btn className="opt-btn">Đăng ký</btn>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-6">
              <div className="opt-wrapper">
                <div className="opt-header">
                  <div className="opt-header-text">Thông tin</div>
                </div>
                <div className="big-opt-box">
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i class="bi bi-question-circle"></i>
                      </div>
                      <div className="box-text">Tư vấn</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i class="bi bi-lungs"></i>
                      </div>
                      <div className="box-text">Chuyên khoa</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i class="bi bi-calendar-heart"></i>
                      </div>
                      <div className="box-text">Lịch làm việc</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i class="bi bi-file-earmark-medical"></i>
                      </div>
                      <div className="box-text">Bảng giá</div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about w-100">
        <div className="content-container">
          <div className="about-wrapper">
            <div className="c-6">
              <div className="about-section">
                <div className="about-section-header">
                  BKC - Nơi gửi gắm niềm tin sức khỏe
                </div>
                <div className="about-section-body">
                  Chào mừng bạn đến với Bệnh viện BKC, nơi cung cấp dịch vụ chăm
                  sóc sức khỏe chất lượng cao với sự tận tâm và chuyên nghiệp.
                  BKC tự hào là một trong những bệnh viện uy tín tại Việt Nam,
                  với đội ngũ y bác sĩ giàu kinh nghiệm và trang thiết bị hiện
                  đại.
                </div>
              </div>
            </div>
            <div className="c-6">
              <div className="about-img">
                <img
                  className="hospital-img"
                  src={HospitalImg}
                  alt="Hospital Building About Section"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BKC SYSTEM SECTION */}
      <section className="system w-100">
        <div className="content-container">
          <div className="syst-wrapper">
            <div className="c-12">
              <div className="syst-section">
                <div className="syst-header">Hệ thống BKC</div>
                <div className="syst-card-wrapper">
                  <div className="syst-card">
                    <div className="syst-card-header">Card header</div>
                    <div className="syst-card-body">Card body text</div>
                  </div>
                  <div className="syst-card">
                    <div className="syst-card-header">Card header</div>
                    <div className="syst-card-body">Card body text</div>
                  </div>
                  <div className="syst-card">
                    <div className="syst-card-header">Card header</div>
                    <div className="syst-card-body">Card body text</div>
                  </div>
                  <div className="syst-card">
                    <div className="syst-card-header">Card header</div>
                    <div className="syst-card-body">Card body text</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
