import { labelType, UserActivity } from "types";

export const getTimeLag = (timestamp: number) => {
  const currentTimestamp = Date.now();
  const timeDifference = currentTimestamp - timestamp;

  if (timeDifference < 1000) {
    return "Just now";
  }
  if (timeDifference < 60 * 1000) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
  if (timeDifference < 60 * 60 * 1000) {
    const minutes = Math.floor(timeDifference / (60 * 1000));
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }
  const hours = Math.floor(timeDifference / (60 * 60 * 1000));
  return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
};

export const computeTotals = (
  activityData: Record<string, UserActivity>,
  isLoading: boolean,
  selectedUser: string
) => {
  if (isLoading || !selectedUser) return;
  const totals = {
    "PR Open": 0,
    "PR Merged": 0,
    Commits: 0,
    "PR Reviewed": 0,
    "PR Comments": 0,
    "Incident Alerts": 0,
    "Incidents Resolved": 0,
  };

  const users =
    selectedUser === "All" ? Object.keys(activityData) : [selectedUser];
  users.forEach((user) => {
    const userActivities = activityData[user] as UserActivity;
    if (userActivities) {
      (Object.keys(userActivities) as labelType[]).forEach((activity) => {
        if (totals.hasOwnProperty(activity)) {
          totals[activity] += parseInt(userActivities[activity] as string, 10);
        }
      });
    }
  });

  return totals;
};
