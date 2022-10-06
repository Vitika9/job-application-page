import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import ExtraInfo from "./ExtraInfo";
import axios from "axios";

var prevExpandedApplicationIdx = -1;
function App() {
  const [applications, setApplications] = useState([]);
  const [expandedApplicationIdx, setExpandedApplication] = useState(-1);

  const expanded = (idx) => {
    prevExpandedApplicationIdx = expandedApplicationIdx;
    setExpandedApplication(idx);
  };

  const collapsed = (idx) => {
    prevExpandedApplicationIdx = idx;
    setExpandedApplication(-1);
  };

  useEffect(() => {

    axios
      .get("https://my-json-server.typicode.com/Vitika9/job-application/applications", { maxContentLength: 1000000000 })
      .then((res) => res.data)
      .then((res) => {
        setApplications(res);
      });
  }, []);

  useEffect(() => {
    if (prevExpandedApplicationIdx != -1) {
      const b = window.document.querySelector(
        "." +
          "abcdefghijklmnopqrstuvwxyz".charAt(prevExpandedApplicationIdx) +
          " .application-extra-info-container"
      );
      if (b != null) {
        b.style.animationName = "collapse";
      }
    }

    if (
      expandedApplicationIdx != -1 &&
      expandedApplicationIdx != prevExpandedApplicationIdx
    ) {
      const c = window.document.querySelector(
        "." +
          "abcdefghijklmnopqrstuvwxyz".charAt(expandedApplicationIdx) +
          " .application-extra-info-container"
      );
      c.style.animationName = "expand";
    }
  }, [expandedApplicationIdx]);

  return (
    <div className="App">
      <h1 id="heading">Applied Jobs</h1>
      {applications.map((application) => {
        return (
          <Application
            key={application.id}
            idx={application.id}
            application={application}
            expand={expanded}
            collapse={collapsed}
            expanded={expandedApplicationIdx == application.id}
          />
        );
      })}
    </div>
  );
}

function Application(props) {
  return (
    <div
      className={
        "application-container " +
        "abcdefghijklmnopqrstuvwxyz".charAt(props.idx)
      }
    >
      <div
        className="application-headings-container"
        onClick={() => {
          if (props.expanded) {
            props.collapse(props.idx);
          } else {
            props.expand(props.idx);
          }
        }}
      >
        <img className="company-logo" src={props.application.companyLogoURL} />
        <div>
          <h2 className="company-name">{props.application.company}</h2>
          <label>{props.application.role}</label>
          <br></br>
          <label className="bold">{props.application.status}</label>
        </div>
      </div>
      <ExtraInfo
        applicationInfo={props.application.extraInfo.applicationInfo}
        roleDesc={props.application.extraInfo.roleDescription}
        companyDescription={props.application.extraInfo.companyDescription}
      />
    </div>
  );
}

export default App;
