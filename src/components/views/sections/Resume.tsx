// Images
import signature from '../../assets/images/signature2.png';

// Data
import resumeData from '../../data/resume.json';
import { markdownToHTML } from '../../utils/converter';

// -------------

function Resume() {
  return (
    <section id="resume" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            <div className="one-half width-55">
              <h2 className="entry-title section-title">
                {resumeData.experience.title}
              </h2>

              <ul className="timeline-holder">
                {resumeData.experience.expPiece.map((exp, i) => (
                  <li key={'exp-' + i} className="timeline-event">
                    <span className="timeline-circle"></span>
                    <div
                      className="timeline-event-content"
                      dangerouslySetInnerHTML={{
                        __html: markdownToHTML(exp.description),
                      }}></div>
                    <div className="timeline-event-date">{exp.date}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="one-half width-40 last">
              <h2 className="entry-title section-title">
                {resumeData.coverLetter.title}
              </h2>
              <p className="section-info">
                {resumeData.coverLetter.description}
              </p>
              {resumeData.coverLetter.paragraphes.map((parg, i) => (
                <p key={'parg-' + i}>{parg}</p>
              ))}

              <img className="my-signature" src={signature} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
