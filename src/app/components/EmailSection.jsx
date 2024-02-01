"use client"
import React, { useState } from "react";
import axios from "axios";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Image from "next/image";

// EmailSection component
const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [fullName, setFullName] = useState("")
  const [email, setMail] = useState("");
  const [comments, setComments] = useState("")


  // Handle form submission using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Extract form data
    const data = {
      fullName: fullName,
      email: email,
      comments: comments
    };
    console.log(data);
    try {
      // Send POST request using Axios
      const response = await axios.post("http://localhost:4000/email", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful
      if (response.status === 200) {
        console.log("Message sent.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <section id="contact" className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative">
      {/* Background circle */}
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      
      {/* Contact information */}
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities. My inbox is always open. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        
        {/* Social icons */}
        <div className="socials flex flex-row gap-2">
          <a href="https://github.com/Nistavilo" target="_blank" rel="noopener noreferrer">
            <Image src={GithubIcon} alt="Github Icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </a>
        </div>
      </div>
      
      {/* Email form */}
      <div>
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">Email sent successfully!</p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="mb-6">
              <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">Your Fullname</label>
              <input
                name="fullname"
                type="text"
                id="fullname"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            
            {/* Subject input */}   
            <div className="mb-6">
              <label htmlFor="subject" className="text-white block text-sm mb-2 font-medium">Your email</label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="email"
                value={email}
                onChange={(e) => setMail(e.target.value)}

              />
            </div>
            
            {/* Message textarea */}
            <div className="mb-6">
              <label htmlFor="message" className="text-white block text-sm mb-2 font-medium">Message</label>
              <textarea
                name="message"
                id="message"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;