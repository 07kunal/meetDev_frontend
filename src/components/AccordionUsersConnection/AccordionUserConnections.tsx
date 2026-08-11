import React from "react";
import type { connectionRequestProps } from "../utils/type/commonType";
import type { loggedInUserConnectionType } from "../utils/type/userConnection";
type AccordionPendingRequestProps = {
  data: loggedInUserConnectionType;
  openId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
  handleReviewConnection: ({
    status,
    connectionRequestId,
  }: connectionRequestProps) => void;
};

const AccordionUserConnections = ({
  data,
  openId,
  setOpenId,
  handleReviewConnection,
}: AccordionPendingRequestProps) => {
  return (
    <div
      className={`collapse collapse-arrow bg-base-100 border border-base-300 rounded-3xl mb-4 shadow-sm transition-all ${
        openId === data.requestId ? "collapse-open" : ""
      }`}
    >
      <div
        className="collapse-title cursor-pointer p-4"
        onClick={() =>
          setOpenId(openId === data?.requestId ? null : data?.requestId)
        }
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-base-200">
            <img
              src={data?.data?.profilePic || "https://via.placeholder.com/150"}
              alt={`${data?.data?.firstName} ${data?.data?.lastName}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-base-content">
              {`${data?.data?.firstName || "Unknown"} ${data?.data?.lastName || "User"}`}
            </div>
            <div className="text-sm text-base-content/60">
              {data?.data?.about || "Tap to see connection details."}
            </div>
          </div>
        </div>
      </div>

      {openId === data.requestId && (
        <div className="collapse-content space-y-5 border-t border-base-300/60 p-4 text-base-content">
          <div>
            <h3 className="font-semibold text-base">About</h3>
            <p className="mt-2 text-sm text-base-content/80">
              {data?.data?.about || "No additional information provided."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-base">Skills</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-base-content/80">
                {data?.data?.skills?.length ? (
                  data.data.skills.map((skill, i) => <li key={i}>{skill}</li>)
                ) : (
                  <li className="text-sm text-base-content/60">No skills listed.</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base">Education</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-base-content/80">
                {data?.data?.education?.length ? (
                  data.data.education.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li className="text-sm text-base-content/60">No education details.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="btn btn-outline btn-error"
              onClick={() =>
                handleReviewConnection({
                  status: "rejected",
                  connectionRequestId: data?.requestId,
                })
              }
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionUserConnections;
