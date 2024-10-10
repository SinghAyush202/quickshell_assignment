
// import React, { useState, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const priorityIcons = {
//   4: 'SVG - Urgent Priority colour.svg',
//   3: 'Img - High Priority.svg',
//   2: 'Img - Medium Priority.svg',
//   1: 'Img - Low Priority.svg',
//   0: 'No-priority.svg'
// };

// const statusIcons = {
//   'Backlog': 'Backlog.svg',
//   'Todo': 'To-do.svg',
//   'In progress': 'in-progress.svg',
// };

// const KanbanBoard = () => {
//   const [tickets, setTickets] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [grouping] = useState('status');
//   const [ordering] = useState('priority');
//   const [statusOrder, setStatusOrder] = useState([]);

//   useEffect(() => {
//     fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
//       .then(response => response.json())
//       .then(data => {
//         setTickets(data.tickets);
//         setUsers(data.users);
//         const uniqueStatuses = [...new Set(data.tickets.map(ticket => ticket.status))];
//         setStatusOrder(uniqueStatuses);
//       });
//   }, []);

//   const groupTickets = () => {
//     const grouped = {};
//     statusOrder.forEach(status => {
//       grouped[status] = tickets.filter(ticket => ticket.status === status);
//     });
//     return grouped;
//   };

//   const sortTickets = (ticketGroup) => {
//     return [...ticketGroup].sort((a, b) => b.priority - a.priority);
//   };

//   const onDragEnd = (result) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) {
//       return;
//     }

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const newTickets = Array.from(tickets);
//     const movedTicket = newTickets.find(ticket => ticket.id === draggableId);
    
//     if (movedTicket) {
//       // Remove the ticket from its original position
//       newTickets.splice(newTickets.indexOf(movedTicket), 1);
      
//       // Find the index where to insert the ticket in its new status column
//       const insertIndex = newTickets.findIndex(ticket => 
//         ticket.status === destination.droppableId && 
//         ticket.priority <= movedTicket.priority
//       );
      
//       // If no ticket with lower priority found, add to the end
//       const newIndex = insertIndex === -1 ? newTickets.length : insertIndex;
      
//       // Insert the ticket at its new position
//       newTickets.splice(newIndex, 0, {...movedTicket, status: destination.droppableId});
      
//       setTickets(newTickets);
//     }
//   };

//   const groupedTickets = groupTickets();

//   return (
//     <div className="kanban-board">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="board">
//           {statusOrder.map((status) => (
//             <Droppable key={status} droppableId={status}>
//               {(provided) => (
//                 <div 
//                   className="column"
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                 >
//                   <h2>
//                     <img src={`/images/${statusIcons[status] || 'default-status.svg'}`} alt={status} className="status-icon" />
//                     <span className="status-label">{status}</span>
//                     <span className="ticket-count">{groupedTickets[status]?.length || 0}</span>
//                     <img src="/images/add.svg" alt="Add" className="add-icon" />
//                     <img src="/images/3 dot menu.svg" alt="Menu" className="menu-icon" />
//                   </h2>
//                   {sortTickets(groupedTickets[status] || []).map((ticket, index) => (
//                     <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
//                       {(provided) => (
//                         <div
//                           className="card"
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                         >
//                           <div className="card-header">
//                             <span className="ticket-id">{ticket.id}</span>
//                             <span className="user-avatar">
//                               {users.find(user => user.id === ticket.userId)?.name.charAt(0)}
//                             </span>
//                           </div>
//                           <h3 className="card-title">{ticket.title}</h3>
//                           <div className="card-footer">
//                             <span className="priority">
//                               <img src={`/images/${priorityIcons[ticket.priority]}`} alt={`Priority ${ticket.priority}`} className="priority-icon" />
//                             </span>
//                             {ticket.tag.map(tag => (
//                               <span key={tag} className="tag">
//                                 <span className="tag-indicator"></span>
//                                 <span className="tag-label">{tag}</span>
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default KanbanBoard;


import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronDown } from 'lucide-react';

const priorityIcons = {
  4: 'SVG - Urgent Priority colour.svg',
  3: 'Img - High Priority.svg',
  2: 'Img - Medium Priority.svg',
  1: 'Img - Low Priority.svg',
  0: 'No-priority.svg'
};

const statusIcons = {
  'Backlog': 'Backlog.svg',
  'Todo': 'To-do.svg',
  'In progress': 'in-progress.svg',
};

const DisplayDropdown = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left mb-4">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Display
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 py-2 text-sm text-gray-700">
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grouping">
                  Grouping
                </label>
                <select
                  id="grouping"
                  value={grouping}
                  onChange={(e) => setGrouping(e.target.value)}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ordering">
                  Ordering
                </label>
                <select
                  id="ordering"
                  value={ordering}
                  onChange={(e) => setOrdering(e.target.value)}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
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
    if (grouping === 'status') {
      newGroups = [...new Set(tickets.map(ticket => ticket.status))];
    } else if (grouping === 'user') {
      newGroups = [...new Set(tickets.map(ticket => ticket.userId))];
    } else if (grouping === 'priority') {
      newGroups = [4, 3, 2, 1, 0];
    }
    setGroups(newGroups);
  };

  const groupTickets = () => {
    const grouped = {};
    groups.forEach(group => {
      grouped[group] = tickets.filter(ticket => {
        if (grouping === 'status') return ticket.status === group;
        if (grouping === 'user') return ticket.userId === group;
        if (grouping === 'priority') return ticket.priority === group;
      });
    });
    return grouped;
  };

  const sortTickets = (ticketGroup) => {
    return [...ticketGroup].sort((a, b) => {
      if (ordering === 'priority') return b.priority - a.priority;
      if (ordering === 'title') return a.title.localeCompare(b.title);
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
    const movedTicket = newTickets.find(ticket => ticket.id === draggableId);
    
    if (movedTicket) {
      newTickets.splice(newTickets.indexOf(movedTicket), 1);
      
      const insertIndex = newTickets.findIndex(ticket => 
        (grouping === 'status' && ticket.status === destination.droppableId) ||
        (grouping === 'user' && ticket.userId === destination.droppableId) ||
        (grouping === 'priority' && ticket.priority === parseInt(destination.droppableId))
      );
      
      const newIndex = insertIndex === -1 ? newTickets.length : insertIndex;
      
      if (grouping === 'status') movedTicket.status = destination.droppableId;
      if (grouping === 'user') movedTicket.userId = destination.droppableId;
      if (grouping === 'priority') movedTicket.priority = parseInt(destination.droppableId);

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
        <div className="board">
          {groups.map((group) => (
            <Droppable key={group} droppableId={group.toString()}>
              {(provided) => (
                <div 
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>
                    {grouping === 'status' && (
                      <img src={`/images/${statusIcons[group] || 'default-status.svg'}`} alt={group} className="status-icon" />
                    )}
                    {grouping === 'user' && (
                      <span className="user-avatar">
                        {users.find(user => user.id === group)?.name.charAt(0)}
                      </span>
                    )}
                    {grouping === 'priority' && (
                      <img src={`/images/${priorityIcons[group]}`} alt={`Priority ${group}`} className="priority-icon" />
                    )}
                    <span className="group-label">{
                      grouping === 'user' 
                        ? users.find(user => user.id === group)?.name 
                        : grouping === 'priority'
                          ? ['No Priority', 'Low', 'Medium', 'High', 'Urgent'][group]
                          : group
                    }</span>
                    <span className="ticket-count">{groupedTickets[group]?.length || 0}</span>
                    <img src="/images/add.svg" alt="Add" className="add-icon" />
                    <img src="/images/3 dot menu.svg" alt="Menu" className="menu-icon" />
                  </h2>
                  {sortTickets(groupedTickets[group] || []).map((ticket, index) => (
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
                            {grouping !== 'user' && (
                              <span className="user-avatar">
                                {users.find(user => user.id === ticket.userId)?.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <h3 className="card-title">{ticket.title}</h3>
                          <div className="card-footer">
                            {grouping !== 'priority' && (
                              <span className="priority">
                                <img src={`/images/${priorityIcons[ticket.priority]}`} alt={`Priority ${ticket.priority}`} className="priority-icon" />
                              </span>
                            )}
                            {ticket.tag.map(tag => (
                              <span key={tag} className="tag">
                                <span className="tag-indicator"></span>
                                <span className="tag-label">{tag}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;