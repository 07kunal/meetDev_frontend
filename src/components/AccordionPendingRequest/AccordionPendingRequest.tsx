import React from "react";

const AccordionPendingRequest = () => {
  return (
    <div className="collapse collapse-arrow bg-base-200 border border-base-400 rounded-2xl">
      <input type="checkbox" />

      {/* Title Section */}
      <div className="collapse-title font-semibold">
        <div className="flex items-center gap-3">
          {/* Image */}
          <div className="w-10 h-10">
            <img
              src="/path/to/avatar.png"
              alt="User avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {/* Name */}
          <div className="text-base font-medium">John Doe</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="collapse-content text-sm space-y-4">
        {/* About */}
        <div>
          <h3 className="font-semibold text-base">About</h3>
          <p className="mt-1 text-gray-600">
            Short description about the person goes here.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-semibold text-base">Skills</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        {/* Education */}
        <div>
          <h3 className="font-semibold text-base">Education</h3>
          <p className="mt-1 text-gray-600">Bachelor of Computer Science</p>
        </div>

        {/* Footer with Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <button className="btn btn-outline btn-error">Reject</button>
          <button className="btn btn-primary">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default AccordionPendingRequest;
