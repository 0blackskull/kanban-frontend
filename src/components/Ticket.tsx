import { useState } from "react";
import EditTicket from "./EditTicket";
import "../stylesheets/Ticket.css";

export type TTicket = {
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
  watcher: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  priority: string;
};

function Ticket(params: any) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      {showEdit ? (
        <EditTicket
          showEdit={showEdit}
          ticket={params.ticket}
          setShowEdit={setShowEdit}
        />
      ) : (
        <></>
      )}
      <div className="ticket-card" onClick={() => setShowEdit(true)}>
        <h2 className="ticket-title">{params?.ticket?.title}</h2>
        <div className="ticket-details">
          <p>
            <strong>Assigned To: </strong>
            {params?.ticket?.assignedTo}
          </p>
          <p>
            <strong>Created By: </strong>
            {params?.ticket?.createdBy}
          </p>
          <p>
            <strong>Status: </strong>
            {params?.ticket?.status}
          </p>
          <p>
            <strong>Created At:</strong> {params?.ticket?.createdAt}
          </p>
          <p>
            <strong>Updated At:</strong> {params?.ticket?.updatedAt}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
