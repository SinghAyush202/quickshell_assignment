import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DisplayDropdown from "./DisplayDropdown";
import Column from "./Column";

const priorityIcons = {
  4: "SVG - Urgent Priority colour.svg",
  3: "Img - High Priority.svg",
  2: "Img - Medium Priority.svg",
  1: "Img - Low Priority.svg",
  0: "No-priority.svg",
};

const statusIcons = {
  Backlog: "Backlog.svg",
  Todo: "To-do.svg",
  "In progress": "in-progress.svg",
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
        updateGroups(data.tickets, grouping);
      });
  }, []);

  useEffect(() => {
    updateGroups(tickets, grouping);
  }, [grouping, tickets]);

  const updateGroups = (tickets, grouping) => {
    let newGroups;
    if (grouping === "status") {
      newGroups = [...new Set(tickets.map((ticket) => ticket.status))];
    } else if (grouping === "user") {
      newGroups = [...new Set(tickets.map((ticket) => ticket.userId))];
    } else if (grouping === "priority") {
      newGroups = [4, 3, 2, 1, 0];
    }
    setGroups(newGroups);
  };

  const groupTickets = () => {
    const grouped = {};
    groups.forEach((group) => {
      grouped[group] = tickets.filter((ticket) => {
        if (grouping === "status") return ticket.status === group;
        if (grouping === "user") return ticket.userId === group;
        if (grouping === "priority") return ticket.priority === group;
      });
    });
    return grouped;
  };

  const sortTickets = (ticketGroup) => {
    return [...ticketGroup].sort((a, b) => {
      if (ordering === "priority") return b.priority - a.priority;
      if (ordering === "title") return a.title.localeCompare(b.title);
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTickets = Array.from(tickets);
    const movedTicket = newTickets.find((ticket) => ticket.id === draggableId);

    if (movedTicket) {
      newTickets.splice(newTickets.indexOf(movedTicket), 1);

      const insertIndex = newTickets.findIndex(
        (ticket) =>
          (grouping === "status" &&
            ticket.status === destination.droppableId) ||
          (grouping === "user" && ticket.userId === destination.droppableId) ||
          (grouping === "priority" &&
            ticket.priority === parseInt(destination.droppableId))
      );

      const newIndex = insertIndex === -1 ? newTickets.length : insertIndex;

      if (grouping === "status") movedTicket.status = destination.droppableId;
      if (grouping === "user") movedTicket.userId = destination.droppableId;
      if (grouping === "priority")
        movedTicket.priority = parseInt(destination.droppableId);

      newTickets.splice(newIndex, 0, movedTicket);

      setTickets(newTickets);
    }
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <DisplayDropdown
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-columns">
          {groups.map((group) => (
            <Column
              key={group}
              group={group}
              groupedTickets={groupedTickets}
              grouping={grouping}
              users={users}
              priorityIcons={priorityIcons}
              statusIcons={statusIcons}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
