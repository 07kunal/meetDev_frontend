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
      className={`collapse collapse-arrow bg-base-100 border border-base-300 rounded-3xl mb-4 shadow-sm transition-all ${
        openId === data._id ? "collapse-open" : ""
      }`}
    >
      <div
        className="collapse-title cursor-pointer p-4"
        onClick={() => setOpenId(openId === data?._id ? null : data?._id)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-base-200">
            <img
              src={data?.fromUserId?.profilePic || "https://via.placeholder.com/150"}
              alt={data?.fromUserId?.fullName || "Profile"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-base-content">
              {data?.fromUserId?.fullName || "Unknown User"}
            </div>
            <div className="text-sm text-base-content/60">
              {data?.fromUserId?.about || "Click to view profile details."}
            </div>
          </div>

        </div>
      </div>

      {openId === data._id && (
        <div className="collapse-content space-y-5 border-t border-base-300/60 p-4 text-base-content">
          <div>
            <h3 className="font-semibold text-base">About</h3>
            <p className="mt-2 text-sm text-base-content/80">
              {data?.fromUserId?.about || "No additional information provided."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-base">Skills</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-base-content/80">
                {data?.fromUserId?.skills?.length ? (
                  data.fromUserId.skills.map((skill, i) => <li key={i}>{skill}</li>)
                ) : (
                  <li className="text-sm text-base-content/60">No skills listed.</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base">Education</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-base-content/80">
                {data?.fromUserId?.education?.length ? (
                  data.fromUserId.education.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li className="text-sm text-base-content/60">No education details.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-base-200/70 pt-4">
            <button
              className="btn btn-outline btn-error"
              onClick={() =>
                handleReviewPendingRequest({
                  status: "rejected",
                  connectionRequestId: data?._id,
                })
              }
            >
              Reject
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                handleReviewPendingRequest({
                  status: "accepted",
                  connectionRequestId: data?._id,
                })
              }
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
