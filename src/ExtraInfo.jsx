import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

function ExtraInfo(props) {
  return (
    <div className="application-extra-info-container">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ApplicationInfo applicationInfo={props.applicationInfo} />
            }
          />
          <Route
            path="/role-desc"
            element={<RoleDesc roleDesc={props.roleDesc} />}
          />
          <Route
            path="/company-info"
            element={
              <CompanyDesc companyDescription={props.companyDescription} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ApplicationInfo(props) {
  return (
    <div className="application-info-container">
      <div className="row-container rev">
        <CandidateInfo applicationInfo={props.applicationInfo} />
        <img className="ill" src={require("./illustrations/candidate-info.png")} alt="" />
      </div>
      <div className="row-container">
        <img className="ill" src={require("./illustrations/timeline.png")} alt="" />
        <Timeline timeline={props.applicationInfo.timeline} />
      </div>
    </div>
  );
}

function RoleDesc(props) {
  return (
    <div>
      <div className="props">
        {props.roleDesc.props.map((prop) => {
          return <Property text={prop.text} value={prop.value} />;
        })}
      </div>
      <div className="about">
        <DescriptionSection
          heading="SKILLS"
          properties={props.roleDesc.skillsRequired}
          imgSrc={require("./illustrations/skills.png")}
        />
        <DescriptionSection
          heading="RESPONSIBILITIES"
          properties={props.roleDesc.responsibilities}
          imgSrc={require("./illustrations/responsibilities.png")}
        />

        <DescriptionSection
          heading="QUALIFICATIONS"
          properties={props.roleDesc.qualifications}
          imgSrc={require("./illustrations/qualifications.png")}
        />
      </div>
    </div>
  );
}

function DescriptionSection(props) {
  return (
    <div className="row-container rev">
      <div className="card">
        <h3>{props.heading}</h3>
        <ul>
          {props.properties.map((property) => (
            <li>{property}</li>
          ))}
        </ul>
      </div>
      <img className="ill" src={props.imgSrc} alt="" />
    </div>
  );
}

function Nav() {
  return (
    <ul className="nav-links-container">
      <NavLink className="nav-link" activeclassname="active" to="/" end>
        Application Info
      </NavLink>
      <NavLink className="nav-link" activeclassname="active" to="/role-desc">
        Role Description
      </NavLink>
      <NavLink className="nav-link" activeclassname="active" to="/company-info">
        Company Info
      </NavLink>
    </ul>
  );
}

function CandidateInfo(props) {
  return (
    <div className="candidate-info-container">
      <div className="row-container">
        <img
          className="candidate-photo"
          src={props.applicationInfo.candidatePhotoURL}
          alt="Candidate"
        />
        <div className="msg-container card">
          <p className="color-white">{props.applicationInfo.candidateMsg}</p>
        </div>
      </div>
    </div>
  );
}

function Timeline(props) {
  return (
    <div className="timeline-container">
      {props.timeline.map((timelineItem, idx) => {
        return (
          <div key={idx} className={"timeline-item-container card "}>
            <label className="text">{timelineItem.text}</label>
            <label className="value">{timelineItem.date}</label>
            <span className="circle" />
          </div>
        );
      })}
    </div>
  );
}

function CompanyDesc(props) {
  return (
    <>
      <div className="props">
        {props.companyDescription.props.map((prop) => {
          return <Property text={prop.text} value={prop.value} />;
        })}
      </div>
      <div className="row-container rev">
        <div className="company-about">
          <p>{props.companyDescription.des}</p>
        </div>
        <img className="ill" src={require("./illustrations/company-desc.png")} alt="" />
      </div>
    </>
  );
}

function Property(props) {
  return (
    <div className="property-container">
      <label className="text">{props.text}</label>
      <label className="value">{props.value}</label>
    </div>
  );
}

export default ExtraInfo;
