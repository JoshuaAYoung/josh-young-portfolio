// TODO
// use real buttons and control the onPress event

import resumeData from '../../../data/resume.json';
import { markdownToHTML } from '../../../utils/converter';
import serviceData from '../../../data/service.json';
import './Resume.css';

// Type definitions for resumeData
type ExperiencePiece = {
  description: string;
  date: string;
};

type Experience = {
  title: string;
  expPiece: ExperiencePiece[];
};

type CoverLetter = {
  title: string;
  description: string;
  paragraphes: string[];
};

type ResumeData = {
  experience: Experience;
  coverLetter: CoverLetter;
};

// ---------------

function Resume() {
  const data: ResumeData = resumeData;

  return (
    <section id="resume" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            <div className="one-half width-55">
              <h2 className="section-title">{data.experience.title}</h2>

              <ul className="timeline-holder">
                {data.experience.expPiece.map(
                  (exp: ExperiencePiece, i: number) => (
                    <li key={`exp-${i}`} className="timeline-event">
                      <span className="timeline-circle" />
                      <div
                        className="timeline-event-content"
                        dangerouslySetInnerHTML={{
                          __html: markdownToHTML(exp.description),
                        }}
                      />
                      <div className="timeline-event-date">{exp.date}</div>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="one-half width-40 last">
              <h2 className="section-title">{serviceData.title}</h2>
              <p className="section-info">{serviceData.description}</p>
              {serviceData.paragraphes.map((parg: string, i: number) => (
                <p key={`p-${i}`}>{parg}</p>
              ))}

              <div className="button-group-wrapper">
                <a className="button" href="fixme.com">
                  Download CV
                </a>
                <a href="#portfolio" className="button">
                  Check My Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
