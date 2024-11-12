import React from 'react';
import signature from '../../../assets/images/signature2.png';
import resumeData from '../../../data/resume.json';
import { markdownToHTML } from '../../../utils/converter';

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
              <h2 className="entry-title section-title">
                {data.experience.title}
              </h2>

              <ul className="timeline-holder">
                {data.experience.expPiece.map(
                  (exp: ExperiencePiece, i: number) => (
                    <li key={'exp-' + i} className="timeline-event">
                      <span className="timeline-circle"></span>
                      <div
                        className="timeline-event-content"
                        dangerouslySetInnerHTML={{
                          __html: markdownToHTML(exp.description),
                        }}
                      ></div>
                      <div className="timeline-event-date">{exp.date}</div>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="one-half width-40 last">
              <h2 className="entry-title section-title">
                {data.coverLetter.title}
              </h2>
              <p className="section-info">{data.coverLetter.description}</p>
              {data.coverLetter.paragraphes.map((parg: string, i: number) => (
                <p key={'parg-' + i}>{parg}</p>
              ))}
              <img className="my-signature" src={signature} alt="signature" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
