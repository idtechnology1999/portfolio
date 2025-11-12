
import "./Team.css";
import managerImg from "../assets/images/image2.png"
import { useEffect, useState } from "react";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_BASE_URL;
interface Team {
    full_name: string,
    picture: string,
    profession: string,
    _id: string

}



export default function Team() {
const [members, setmembers] = useState<Team[]>([])

useEffect(()=>{
axios.get(`${apiurl}/api/Team/Fetch`)
.then((response)=>setmembers(response.data.message))
.catch((error)=>{
  setmembers([])
  console.log("error occur",error)
}
)
},[])


  return (
    <section id="team" className="team-section py-5 text-center">
      <div className="container">
        <h2
          className="section-title mb-3"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          Meet Our Team
        </h2>
        <p
          className="section-desc mb-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Our passionate professionals combine creativity, technology, and
          strategy to bring digital ideas to life.
        </p>

        {/* 👔 Manager Section */}
        <div
          className="manager-card mx-auto mb-5"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          <img
            src={managerImg}
            alt="Team Manager"
            className="manager-img mb-3"
          />
          <h4 className="fw-bold mb-1">Owolabi Idowu</h4>
          <p className="text-muted">Team Manager / Fullstack Developer</p>
        </div>

        {/* 👥 Other Team Members */}
        <div className="row g-4 justify-content-center">
        {members.length == 0?
        
        <>
          <div className="alert alert-warning text-center mt-4" role="alert">
            <strong>Loading ..........</strong>
          </div>
        </>
        :
        
        <>
          {members.map((member, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="1000"
            >
              <div className="team-card">
                <img
                  src={`${apiurl}/imgTeam/${member.picture}`}
                  alt={member.picture}
                  className="team-img mb-3"
                />
                <h6 className="fw-bold">{member.full_name}</h6>
                <p className="text-muted mb-0">{member.profession}</p>
              
  
                
              </div>
            </div>
          ))}
        </>}
        </div>
    
      </div>
    </section>
  );
} 

