import "./Skills.css";
import { useEffect, useState } from "react";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_BASE_URL;
interface data{
  title: string,
  image: string,
  Description: string
}
export default function Skills() {
const [skills, setskills] = useState<data[]>([])
useEffect(()=>{
  axios.get(`${apiurl}/api/Course/Fetch`).
  then((response)=>setskills(response.data))
  .catch((error)=>{
    console.log("unable to fetch, error occur", error)
    setskills([])
  })
},[])



  return (
    <section id="skills" className="skills-section text-center py-5">
      <div className="container">
        <h2 className="section-title mb-3">Skills & Expertise make </h2>
        <p className="section-desc mx-auto mb-5">
          I’m a passionate <strong>Website and Mobile App Developer</strong> with
          a strong foundation in <strong>Computer Engineering</strong>. I
          specialize in building responsive, user-friendly, and high-performing
          digital solutions that bring ideas to life.
        </p>

        <div className="row g-4">
        {skills.length == 0 ?
         <>
              <div className="alert alert-warning text-center mt-4" role="alert">
            <strong>Loading ....... </strong>
          </div>
         </>
         :
         <>    {skills.map((skill, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="skill-card shadow-sm">
                <img
                  src={`${apiurl}/imgCourse/${skill.image}`}
                  alt={skill.title}
                  className="img-fluid skill-img"
                />
                <h5 className="mt-3 skill-title">{skill.title}</h5>
                <p className="skill-desc">{skill.Description}</p>
              </div>
            </div>
          ))}</>}
        </div>
      </div>
    </section>
  );
}
