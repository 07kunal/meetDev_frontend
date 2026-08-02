import React from "react";

import type { loggedInUserConnectionType } from "../utils/type/userConnection";
type AccordionPendingRequestProps = {
  data: loggedInUserConnectionType;
  openId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccordionUserConnections = ({
  data,
  openId,
  setOpenId,
}: AccordionPendingRequestProps) => {
  return (
    <div
      className={`collapse collapse-arrow bg-base-200 border border-base-400 rounded-2xl mb-4 w-2xl ${
        openId === data.requestId ? "collapse-open" : ""
      }`}
    >
      {/* <input type="radio" name="user-accordion" /> */}
      {/* Title */}
      <div
        className="collapse-title font-semibold cursor-pointer p-2.5"
        onClick={() =>
          setOpenId(openId === data?.requestId ? null : data?.requestId)
        }
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <img
              src={data?.data?.profilePic || "-"}
              alt={data?.data?.profilePic || "-"}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-base font-medium">{`${data?.data?.firstName} ${data?.data?.lastName}`}</div>
        </div>
      </div>

      {/* Content */}
      {openId === data.requestId && (
        <div className="collapse-content text-sm space-y-4">
          <div>
            <h3 className="font-semibold text-base">About</h3>
            <p className="mt-1 text-gray-600">Test default</p>
          </div>

          <div>
            <h3 className="font-semibold text-base">Skills</h3>
            <ul className="list-disc list-inside text-gray-600">
              {data?.data?.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base">Education</h3>
            <ul className="list-disc list-inside text-gray-600">
              {data?.data?.education.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4">
            <button className="btn btn-outline btn-error">Reject</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionUserConnections;
