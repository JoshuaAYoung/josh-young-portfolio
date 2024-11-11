import { useRef, useEffect, useState } from 'react';

// Plugins
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Data
import skillsData from '../../data/skills.json';

// ------------------

function Skills() {
  const circleProgressBarRef = useRef<HTMLDivElement>(null);
  const [circleProgress, setCircleProgress] = useState<number[]>(
    new Array(skillsData.circleProgress.length).fill(0)
  );
  const normalProgressBarRef = useRef<HTMLDivElement>(null);
  const [normalProgress, setNormalProgress] = useState<number[]>(
    new Array(skillsData.horizontalProgress.length).fill(0)
  );

  useEffect(() => {
    const progressBarYPosition =
      circleProgressBarRef.current!.getBoundingClientRect().top +
      window.scrollY;
    const handleScroll = () => {
      if (window.scrollY >= progressBarYPosition) {
        setCircleProgress(
          skillsData.circleProgress.map((progress) => progress.percentage)
        );
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [circleProgress]);

  useEffect(() => {
    const progressBarYPosition =
      normalProgressBarRef.current!.getBoundingClientRect().top +
      window.scrollY;
    const handleScroll = () => {
      if (window.scrollY >= progressBarYPosition) {
        setNormalProgress(
          skillsData.horizontalProgress.map((progress) => progress.percentage)
        );
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [normalProgress]);

  return (
    <section id="skills" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row m-bottom-60">
            <h2 className="entry-title section-title">{skillsData.title}</h2>

            <div className="skill-circle-holder">
              {skillsData.circleProgress.map((prog, i) => (
                <div key={'circle-prog-' + i} className="skill-circle">
                  <div ref={circleProgressBarRef}>
                    <CircularProgressbar
                      value={circleProgress[i]}
                      text={`${prog.percentage}%`}
                      counterClockwise
                      strokeWidth={15}
                      styles={buildStyles({
                        textColor: '#F37B83',
                        textSize: 18,
                        pathColor: '#F37B83',
                        trailColor: '#554247',
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 2,
                      })}
                    />
                  </div>
                  <p className="skill-circle-text">{prog.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="row" ref={normalProgressBarRef}>
            <div className="one-half">
              <div className="skills-holder">
                {skillsData.horizontalProgress
                  .slice(0, Math.ceil(skillsData.horizontalProgress.length / 2))
                  .map((skill, i) => (
                    <div key={'skill-' + i} className="skill-holder">
                      <div className="skill-text">
                        <div className="skill">
                          <div
                            className="skill-fill"
                            style={{ width: `${normalProgress[i]}%` }}></div>
                        </div>
                        <span>{skill.title}</span>
                      </div>
                      <div className="skill-percent">{skill.percentage}%</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="one-half last">
              <div className="skills-holder sec-skills-holder">
                {skillsData.horizontalProgress
                  .slice(Math.ceil(skillsData.horizontalProgress.length / 2))
                  .map((skill, i) => (
                    <div key={'skill2-' + i} className="skill-holder">
                      <div className="skill-text">
                        <div className="skill">
                          <div
                            className="skill-fill"
                            style={{
                              width: `${
                                normalProgress[
                                  i +
                                    Math.ceil(
                                      skillsData.horizontalProgress.length / 2
                                    )
                                ]
                              }%`,
                            }}></div>
                        </div>
                        <span>{skill.title}</span>
                      </div>
                      <div className="skill-percent">{skill.percentage}%</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
