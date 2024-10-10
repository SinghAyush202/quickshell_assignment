import React from "react";

const GROUP_OPTIONS = [
  { value: "status", label: "Status" },
  { value: "user", label: "User" },
  { value: "priority", label: "Priority" },
];

const DisplayDropdown = ({ grouping, setGrouping, ordering, setOrdering }) => {
  return (
    <div className="dropdown">
      <label htmlFor="grouping-select">Group by:</label>
      <select
        id="grouping-select"
        value={grouping}
        onChange={(e) => setGrouping(e.target.value)}
      >
        {GROUP_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DisplayDropdown;
