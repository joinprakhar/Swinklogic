import React from "react";

const ResumePreview: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Resume Preview
          </h2>
          <p className="text-lg text-gray-600">
            A modern and elegant SVG resume design
          </p>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <svg
              width="800"
              height="1100"
              viewBox="0 0 800 1100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="800"
                height="1100"
                fill="#ffffff"
                stroke="#e0e0e0"
                stroke-width="1"
              />

              <rect x="0" y="0" width="800" height="150" fill="#2c3e50" />
              <text
                x="50"
                y="50"
                font-family="Arial, sans-serif"
                font-size="36"
                font-weight="bold"
                fill="#ffffff"
              >
                John Doe
              </text>
              <text
                x="50"
                y="80"
                font-family="Arial, sans-serif"
                font-size="18"
                fill="#ecf0f1"
              >
                Software Engineer
              </text>
              <text
                x="50"
                y="110"
                font-family="Arial, sans-serif"
                font-size="14"
                fill="#bdc3c7"
              >
                San Francisco, CA | john.doe@email.com | (555) 123-4567 |
                linkedin.com/in/johndoe
              </text>

              <text
                x="50"
                y="200"
                font-family="Arial, sans-serif"
                font-size="20"
                font-weight="bold"
                fill="#2c3e50"
              >
                Professional Summary
              </text>
              <line
                x1="50"
                y1="210"
                x2="750"
                y2="210"
                stroke="#3498db"
                stroke-width="2"
              />
              <text
                x="50"
                y="235"
                font-family="Arial, sans-serif"
                font-size="14"
                fill="#34495e"
              >
                <tspan x="50" dy="0">
                  Experienced software engineer with 5+ years in full-stack
                  development.
                </tspan>
                <tspan x="50" dy="20">
                  Proficient in React, Node.js, Python, and cloud technologies.
                </tspan>
                <tspan x="50" dy="20">
                  Passionate about creating scalable, user-centric applications.
                </tspan>
              </text>

              <text
                x="50"
                y="320"
                font-family="Arial, sans-serif"
                font-size="20"
                font-weight="bold"
                fill="#2c3e50"
              >
                Work Experience
              </text>
              <line
                x1="50"
                y1="330"
                x2="750"
                y2="330"
                stroke="#3498db"
                stroke-width="2"
              />

              <text
                x="50"
                y="360"
                font-family="Arial, sans-serif"
                font-size="16"
                font-weight="bold"
                fill="#2c3e50"
              >
                Senior Software Engineer
              </text>
              <text
                x="50"
                y="380"
                font-family="Arial, sans-serif"
                font-size="14"
                fill="#7f8c8d"
              >
                TechCorp Inc. | San Francisco, CA | June 2020 - Present
              </text>
              <text
                x="70"
                y="405"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                • Led development of microservices architecture serving 1M+
                users
              </text>
              <text
                x="70"
                y="420"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                • Implemented CI/CD pipelines reducing deployment time by 40%
              </text>
              <text
                x="70"
                y="435"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                • Mentored junior developers and conducted code reviews
              </text>

              <text
                x="50"
                y="470"
                font-family="Arial, sans-serif"
                font-size="16"
                font-weight="bold"
                fill="#2c3e50"
              >
                Software Engineer
              </text>
              <text
                x="50"
                y="490"
                font-family="Arial, sans-serif"
                font-size="14"
                fill="#7f8c8d"
              >
                StartupXYZ | Remote | Jan 2019 - May 2020
              </text>
              <text
                x="70"
                y="515"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                • Developed responsive web applications using React and Node.js
              </text>
              <text
                x="70"
                y="530"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                • Optimized database queries improving performance by 30%
              </text>
              <text
                x="70"
                y="545"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                • Collaborated with design team to implement pixel-perfect UIs
              </text>

              <text
                x="50"
                y="590"
                font-family="Arial, sans-serif"
                font-size="20"
                font-weight="bold"
                fill="#2c3e50"
              >
                Education
              </text>
              <line
                x1="50"
                y1="600"
                x2="750"
                y2="600"
                stroke="#3498db"
                stroke-width="2"
              />
              <text
                x="50"
                y="630"
                font-family="Arial, sans-serif"
                font-size="16"
                font-weight="bold"
                fill="#2c3e50"
              >
                Bachelor of Science in Computer Science
              </text>
              <text
                x="50"
                y="650"
                font-family="Arial, sans-serif"
                font-size="14"
                fill="#7f8c8d"
              >
                University of California, Berkeley | 2015 - 2019
              </text>
              <text
                x="70"
                y="670"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                • GPA: 3.8/4.0 • Magna Cum Laude
              </text>
              <text
                x="70"
                y="685"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                • Relevant Coursework: Data Structures, Algorithms, Software
                Engineering
              </text>

              <text
                x="50"
                y="730"
                font-family="Arial, sans-serif"
                font-size="20"
                font-weight="bold"
                fill="#2c3e50"
              >
                Skills
              </text>
              <line
                x1="50"
                y1="740"
                x2="750"
                y2="740"
                stroke="#3498db"
                stroke-width="2"
              />

              <text
                x="50"
                y="770"
                font-family="Arial, sans-serif"
                font-size="14"
                font-weight="bold"
                fill="#2c3e50"
              >
                Programming Languages:
              </text>
              <text
                x="200"
                y="770"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                JavaScript, Python, Java, C++, SQL
              </text>

              <text
                x="50"
                y="790"
                font-family="Arial, sans-serif"
                font-size="14"
                font-weight="bold"
                fill="#2c3e50"
              >
                Frameworks & Libraries:
              </text>
              <text
                x="200"
                y="790"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                React, Node.js, Express, Django, Spring Boot
              </text>

              <text
                x="50"
                y="810"
                font-family="Arial, sans-serif"
                font-size="14"
                font-weight="bold"
                fill="#2c3e50"
              >
                Tools & Technologies:
              </text>
              <text
                x="200"
                y="810"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#34495e"
              >
                AWS, Docker, Kubernetes, Git, Jenkins, MongoDB, PostgreSQL
              </text>

              <text
                x="50"
                y="850"
                font-family="Arial, sans-serif"
                font-size="20"
                font-weight="bold"
                fill="#2c3e50"
              >
                Certifications
              </text>
              <line
                x1="50"
                y1="860"
                x2="750"
                y2="860"
                stroke="#3498db"
                stroke-width="2"
              />
              <text
                x="50"
                y="890"
                font-family="Arial, sans-serif"
                font-size="14"
                fill="#34495e"
              >
                • AWS Certified Solutions Architect (2022)
              </text>
              <text
                x="50"
                y="910"
                font-family="Arial, sans-serif"
                font-size="14"
                fill="#34495e"
              >
                • Google Cloud Professional Developer (2021)
              </text>
              <text
                x="50"
                y="930"
                font-family="Arial, sans-serif"
                font-size="14"
                fill="#34495e"
              >
                • Certified Scrum Master (2020)
              </text>

              <rect x="0" y="1050" width="800" height="50" fill="#2c3e50" />
              <text
                x="400"
                y="1075"
                font-family="Arial, sans-serif"
                font-size="12"
                fill="#ffffff"
                text-anchor="middle"
              >
                Resume generated with SVG - Modern & Elegant Design
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumePreview;
