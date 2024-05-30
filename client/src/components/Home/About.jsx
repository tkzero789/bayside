import React from "react";
import HospitalImg from "../../assets/home/hospitalBuilding.jpg";

export default function About() {
  return (
    <>
      {/* ABOUT SECTION */}
      <section className="about w-100">
        <div className="content-container">
          <div className="about-wrapper">
            <div className="c-6 md-12">
              <div className="about-section">
                <div className="about-header">
                  BaySide Hospital: Your Guiding Star to Health & Wellness
                </div>
                <div className="about-body">
                  <span>
                    At BaySide Hospital, we illuminate your healthcare journey.
                    Our team of dedicated professionals, equipped with advanced
                    technology and a compassionate approach, guides you every
                    step of the way.
                  </span>
                  <br />
                  <br />
                  <span>
                    From preventative screenings and personalized treatment
                    plans to comprehensive emergency care, BaySide Hospital
                    offers a holistic spectrum of services designed to empower
                    you to take charge of your health.
                  </span>
                </div>
              </div>
            </div>
            <div className="c-6 md-12">
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
    </>
  );
}
