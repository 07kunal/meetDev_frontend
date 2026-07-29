import AccordionPendingRequest from "@/components/AccordionPendingRequest/AccordionPendingRequest";

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
     const [openId, setOpenId] = useState<number | null>(null);
  return (
    <div className="flex justify-center align-center flex-col">
      {dummyData?.map((dummyItem) => (
        <AccordionPendingRequest data={dummyItem} key={dummyItem?.id} openId={openId} setOpenId={setOpenId} />
      ))}
    </div>
  );
};

export default UserIncommimgPendingRequest;
