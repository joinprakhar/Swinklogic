import moment from 'moment';
import { IJobPost } from './models/JobPost';

const generateJobEmailTemplate = (jobs: IJobPost[] = []) => {
  if (!jobs.length) {
    return `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f4f6f8; padding: 50px 20px;">
        <table align="center" cellpadding="0" cellspacing="0" width="600" style="background: white; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); text-align: center;">
          <tr>
            <td style="padding: 60px 30px;">
              <h1 style="margin: 0; font-size: 28px; color: #34495e;">No Jobs Found</h1>
              <p style="margin-top: 15px; font-size: 16px; color: #7f8c8d; line-height: 1.5;">
                There are currently no job listings available. Stay tuned and check back later for fresh opportunities! 🌟
              </p>
              <div style="margin-top: 30px;">
                <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No Jobs" width="120" style="opacity: 0.8;"/>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  const totalJobs = jobs.length;
  const sources = [...new Set(jobs.map((job) => job.source))].join(", ");

  const jobCards = jobs.map((job) => {
    return `
      <tr>
        <td style="padding: 25px 15px; border-bottom: 1px solid #e6e9ec;">
          <table style="width: 100%; background: #ffffff; border-radius: 12px; box-shadow: 0 3px 8px rgba(0,0,0,0.05); padding: 20px; border-collapse: collapse;">
            <tr>
              <td style="padding-bottom: 10px;">
                <h2 style="margin: 0; font-size: 22px; color: #2c3e50;">${job.title}</h2>
                <p style="margin: 6px 0 0; font-size: 15px; color: #555;"><strong>Company:</strong> ${job.company}</p>
                <p style="margin: 6px 0 0; font-size: 15px; color: #555;"><strong>Location:</strong> ${job.location}</p>
                <p style="margin: 6px 0 0; font-size: 14px; color: #888;"><strong>Posted:</strong> ${job.posted}</p>
                <p style="margin: 6px 0 0; font-size: 14px; color: #888;"><strong>Scraped At:</strong> ${moment(job.scrapedAt).format("hh:mm A, ddd DD-MM-YY")}</p>
                <p style="margin: 6px 0 0; font-size: 14px; color: #3498db;"><strong>Source:</strong> <a href="${job.url}" target="_blank" style="color: #2980b9; text-decoration: underline;">${job.source}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 12px;">
                <a href="${job.link}" target="_blank" style="display: inline-block; padding: 12px 25px; background: linear-gradient(135deg, #6a11cb, #2575fc); color: white; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">View Job Posting</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  });

  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f4f6f8; padding: 50px 20px;">
      <table align="center" cellpadding="0" cellspacing="0" width="650" style="background: linear-gradient(to right, #6a11cb, #2575fc); border-radius: 12px 12px 0 0; color: white;">
        <tr>
          <td align="center" style="padding: 35px;">
            <h1 style="margin: 0; font-size: 30px; font-weight: bold;">🚀 Latest Job Listings</h1>
            <p style="margin-top: 12px; font-size: 17px; line-height: 1.4;">
              We've discovered <strong>${totalJobs}</strong> exciting job(s) across <strong>${sources}</strong>.
            </p>
          </td>
        </tr>
      </table>

      <table align="center" cellpadding="0" cellspacing="0" width="650" style="background: #ffffff; border-radius: 0 0 12px 12px; padding: 15px 25px; box-shadow: 0 6px 20px rgba(0,0,0,0.1);">
        ${jobCards.join("")}
        <tr>
          <td align="center" style="padding: 30px 25px 15px; color: #aaa; font-size: 13px;">
            <p>Powered by <strong>Job Scraper</strong> 🛠 | Designed with ❤️ for better job updates</p>
          </td>
        </tr>
      </table>
    </div>
  `;
};

export default generateJobEmailTemplate;
