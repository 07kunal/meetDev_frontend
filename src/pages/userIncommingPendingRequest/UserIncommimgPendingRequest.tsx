import AccordionPendingRequest from "@/components/AccordionPendingRequest/AccordionPendingRequest";
import React from "react";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  image: string;
  about: string;
  skills: string[];
  education: string;
};

const dummyData: User[] = [
  {
    id: 1,
    name: "John Doe",
    image: "/images/john.png",
    about: "Frontend developer with 3 years of experience.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    education: "B.Sc. Computer Science",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/images/jane.png",
    about: "UI/UX designer passionate about clean design.",
    skills: ["Figma", "Adobe XD", "CSS"],
    education: "B.A. Design",
  },
  {
    id: 3,
    name: "Alex Johnson",
    image: "/images/alex.png",
    about: "Fullstack engineer working with MERN stack.",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    education: "M.Sc. Software Engineering",
  },
];
const UserIncommimgPendingRequest = () => {
  return (
    <div className="flex justify-center align-center">
      <AccordionPendingRequest data={dummyData} />
    </div>
  );
};

export default UserIncommimgPendingRequest;
