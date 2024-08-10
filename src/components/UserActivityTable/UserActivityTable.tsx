import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import React, { useContext } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { initialUserActivityResponseType } from "Slices/FetchUserGithubActivity";
import { useUserActivityData } from "Hooks/useUserActivityData";

const UserActivityTable: React.FC = () => {
  const { selectedUser } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const {
    data: { userActivityCount } = {} as initialUserActivityResponseType,
    isLoading,
  } = useUserActivityData();

  const filteredData =
    selectedUser === "All"
      ? userActivityCount
      : { [selectedUser as string]: userActivityCount[selectedUser as string] };

  if (isLoading) return <></>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>PR Open</TableCell>
            <TableCell>PR Merged</TableCell>
            <TableCell>Commits</TableCell>
            <TableCell>PR Reviewed</TableCell>
            <TableCell>PR Comments</TableCell>
            <TableCell>Incident Alerts</TableCell>
            <TableCell>Incidents Resolved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(filteredData).map((user) => (
            <TableRow key={user}>
              <TableCell>{user}</TableCell>
              <TableCell>{filteredData[user]["PR Open"]}</TableCell>
              <TableCell>{filteredData[user]["PR Merged"]}</TableCell>
              <TableCell>{filteredData[user]["Commits"]}</TableCell>
              <TableCell>{filteredData[user]["PR Reviewed"]}</TableCell>
              <TableCell>{filteredData[user]["PR Comments"]}</TableCell>
              <TableCell>{filteredData[user]["Incident Alerts"]}</TableCell>
              <TableCell>{filteredData[user]["Incidents Resolved"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserActivityTable;
