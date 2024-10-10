import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TicketCard = ({ ticket, index, users, grouping, priorityIcons }) => {
  return (
    <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-header">
            <span className="ticket-id">{ticket.id}</span>
            {grouping !== "user" && (
              <span className="user-avatar">
                {users
                  .find((user) => user.id === ticket.userId)
                  ?.name.charAt(0)}
              </span>
            )}
          </div>
          <h3 className="card-title">{ticket.title}</h3>
          <div className="card-footer">
            {grouping !== "priority" && (
              <span className="priority">
                <img
                  src={`/images/${priorityIcons[ticket.priority]}`}
                  alt={`Priority ${ticket.priority}`}
                  className="priority-icon"
                />
              </span>
            )}
            {ticket.tag.map((tag) => (
              <span key={tag} className="tag">
                <span className="tag-indicator"></span>
                <span className="tag-label">{tag}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TicketCard;
