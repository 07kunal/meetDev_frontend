import React from "react";

import type { myIncommingPendingRequest } from "../utils/type/userConnection";
import type { connectionRequestProps } from "../utils/type/commonType";
type AccordionPendingRequestProps = {
  data: myIncommingPendingRequest;
  openId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
  handleReviewPendingRequest: ({status,connectionRequestId}:connectionRequestProps) => void;
};

const AccordionPendingRequest = ({
  data,
  openId,
  setOpenId,
  handleReviewPendingRequest,
}: AccordionPendingRequestProps) => {
  return (
    <div
      className={`collapse collapse-arrow bg-base-200 border border-base-400 rounded-2xl mb-4 w-2xl ${
        openId === data._id ? "collapse-open" : ""
      }`}
    >

      {/* Title */}
      <div
        className="collapse-title font-semibold cursor-pointer p-2.5"
        onClick={() => setOpenId(openId === data?._id ? null : data?._id)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <img
              src={data?.fromUserId?.profilePic || "-"}
              alt={data?.fromUserId?.profilePic || "-"}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-base font-medium">
            {data?.fromUserId?.fullName}
          </div>
        </div>
      </div>

      {/* Content */}
      {openId === data._id && (
        <div className="collapse-content text-sm space-y-4">
          <div>
            <h3 className="font-semibold text-base">About</h3>
            <p className="mt-1 text-gray-600">Test default</p>
          </div>

          <div>
            <h3 className="font-semibold text-base">Skills</h3>
            <ul className="list-disc list-inside text-gray-600">
              {data?.fromUserId?.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base">Education</h3>
            <ul className="list-disc list-inside text-gray-600">
              {data?.fromUserId?.education.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              className="btn btn-outline btn-error"
              onClick={() => handleReviewPendingRequest({status: "rejected", connectionRequestId:data?._id})}
            >
              Reject
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleReviewPendingRequest({status: "accepted", connectionRequestId:data?._id})}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionPendingRequest;
