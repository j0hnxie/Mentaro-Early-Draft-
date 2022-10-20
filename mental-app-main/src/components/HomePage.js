import { Contact } from "./HomePageComponents/contact";
import { Form } from "./HomePageComponents/form";
import React from 'react';


const HomePage = () => {

  return (
    <div>
      <div id="navigation">
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
            <a className="navbar-brand page-scroll" href="#page-top">
              Mentaro
            </a>{" "}
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="/#about">About</a>
                </li>
                <li>
                  <a href="/#form">Sample Form</a>
                </li>
                <li>
                  <a href="/#services">Features</a>
                </li>
                <li>
                  <a href="/#contact">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div id="header">
        <header id="header">
          <div className="intro">
            <div className="overlay">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2 intro-text">
                    <h1>Welcome to Mentaro</h1>
                    <p>
                      Mentaro’s mission is to promote positive mental health in
                      the workplace by connecting employees with employers such
                      that no one suffers in silence.
                    </p>
                    <a
                      href="#about"
                      className="btn btn-custom btn-lg page-scroll"
                    >
                      Learn More
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {" "}
              <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>What We Do</h2>
                <p>
                  {" "}
                  Mentaro is a platform developed by a skilled team of
                  programmers and psychologists to improve mental health and
                  solidarity in the workplace. Studies show that companies which
                  promote positive mental health in the workplace tend to see
                  lower employee burnout, better productivity, and consequently
                  generate greater revenue. Mentaro includes three simple parts:{" "}
                </p>
                <h3>1. Customizable mental health surveys for employees </h3>
                <h3>
                  2. An administrator dashboard to follow employees’ mental
                  health trends
                </h3>
                <h3>
                  3. A recommendation system to help employees improve their
                  mental health and help employers promote mental health{" "}
                </h3>
                <p>
                  The surveys include weekly mental health screenings for
                  depression and anxiety using the PHQ-9 and GAD7 scales.
                  Employees also fill out a quick daily mood check-in to rate
                  their overall mood for the day. This feature is solely
                  designed for the employee to view and follow their own moods
                  over time and will not be viewed from their employer.{" "}
                </p>
                <p>
                  The admin dashboard includes pie graphs and line graphs to
                  display monthly trends of their employees’ moods. Employers
                  are also able to view individual trends and results of weekly
                  employee screenings. If the employees choose to send messages
                  about their current mental well-being, the administrator can
                  view them as well. Mentaro identifies individual employees who
                  are struggling with their mental health and suggests if
                  employers should reach out.{" "}
                </p>
                <p>
                  Overall, the goal is for this platform to be tested by select
                  companies and to see the impact in average mental health of a
                  company’s employees as time goes on (and with help of the
                  meetings) through the statistics.
                </p>
                <h3>Why Choose Us?</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      {["reason 1", "reason 2"].map((d, i) => (
                        <li key={`${d}-${i}`}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      {["reason 3", "reason 4"].map((d, i) => (
                        <li key={`${d}-${i}`}> {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Form />
      <div id="services" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Features</h2>
            <p>
              Our price is also open to negotiation. Contact us to set up a
              meeting! We'd love to work with you.
            </p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <i className={"fa fa-pie-chart"} />
              <div className="service-desc">
                <h3>Simple, Customizable Surveys</h3>
                <p>
                  Sent daily, it takes two minutes but has a visible impact.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <i className="fa fa-plane" />
              <div className="service-desc">
                <h3>Increased Mental Wellbeing</h3>
                <p>
                  Reflect on your employees' situations, send their mindset
                  skyrocketing.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <i className="fa fa-cloud-download" />
              <div className="service-desc">
                <h3>Compiled Results</h3>
                <p>
                  Simple, convenient, downloadable results: sent right to your
                  admin dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <div id="footer">
        <div className="container text-center">
          <p>&copy; 2021 JSB; Prototype #2 by Joy</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
