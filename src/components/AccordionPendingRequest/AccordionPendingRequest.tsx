import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  image: string;
  about: string;
  skills: string[];
  education: string;
};

const AccordionPendingRequest = ({ data }: { data: User }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  return (
    <div
      className={`collapse collapse-arrow bg-base-200 border border-base-400 rounded-2xl mb-4  ${
        openId === data.id ? "collapse-open" : ""
      }`}
    >
      {/* <input type="radio" name="user-accordion" /> */}
      {/* Title */}
      <div
        className="collapse-title font-semibold cursor-pointer"
        onClick={() => setOpenId(openId === data.id ? null : data.id)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-base font-medium">{data.name}</div>
        </div>
      </div>

      {/* Content */}
      <div className="collapse-content text-sm space-y-4">
        <div>
          <h3 className="font-semibold text-base">About</h3>
          <p className="mt-1 text-gray-600">{data.about}</p>
        </div>

        <div>
          <h3 className="font-semibold text-base">Skills</h3>
          <ul className="list-disc list-inside text-gray-600">
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base">Education</h3>
          <p className="mt-1 text-gray-600">{data.education}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4">
          <button className="btn btn-outline btn-error">Reject</button>
          <button className="btn btn-primary">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default AccordionPendingRequest;
