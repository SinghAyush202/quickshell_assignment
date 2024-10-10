import React from "react";
import { ChevronDown } from "lucide-react";

const ColumnHeader = ({
  group,
  grouping,
  users,
  priorityIcons,
  statusIcons,
  groupedTickets,
}) => {
  return (
    <h2>
      {grouping === "status" && (
        <img
          src={`/images/${statusIcons[group] || "default-status.svg"}`}
          alt={group}
          className="status-icon"
        />
      )}
      {grouping === "user" && (
        <span className="user-avatar">
          {users.find((user) => user.id === group)?.name.charAt(0)}
        </span>
      )}
      {grouping === "priority" && (
        <img
          src={`/images/${priorityIcons[group]}`}
          alt={`Priority ${group}`}
          className="priority-icon"
        />
      )}
      <span className="group-label">
        {grouping === "user"
          ? users.find((user) => user.id === group)?.name
          : grouping === "priority"
          ? ["No Priority", "Low", "Medium", "High", "Urgent"][group]
          : group}
      </span>
      <span className="ticket-count">{groupedTickets[group]?.length || 0}</span>
      <img src="/images/add.svg" alt="Add" className="add-icon" />
      <img src="/images/3 dot menu.svg" alt="Menu" className="menu-icon" />
    </h2>
  );
};

export default ColumnHeader;
