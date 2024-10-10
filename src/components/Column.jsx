import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TicketCard from "./TicketCard";
import ColumnHeader from "./ColumnHeader";

const Column = ({
  group,
  groupedTickets,
  grouping,
  users,
  priorityIcons,
  statusIcons,
}) => {
  const tickets = groupedTickets[group] || [];

  return (
    <Droppable droppableId={group.toString()}>
      {(provided) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <ColumnHeader
            group={group}
            grouping={grouping}
            users={users}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            groupedTickets={groupedTickets}
          />
          {tickets.map((ticket, index) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              index={index}
              users={users}
              grouping={grouping}
              priorityIcons={priorityIcons}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
