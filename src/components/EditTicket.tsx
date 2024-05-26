import { useState } from "react";
import { TTicket } from "./Ticket";
import "../stylesheets/EditTicket.css";
import { BASE } from "../App";

const updateTicket = async (newTicket: any) => {
  try {
    const response = await fetch(`${BASE}/api/ticket/${newTicket._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTicket),
      credentials: "include",
    });

    const data = await response.json();

    console.log(`Ticket updated: ${data}`);
  } catch (err) {
    console.error(`Ticket update failed: ${err}`);
  }
};

function EditTicket({
  ticket,
  showEdit,
  setShowEdit,
}: {
  ticket: TTicket;
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState(ticket);

  console.log(showEdit);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateTicket(editedTicket);
    setIsEditing(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedTicket({
      ...editedTicket,
      [name]: value,
    });
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    setShowEdit(false);
    console.log(showEdit);
  };

  return (
    <div id="edit-ticket-container">
      <div id="edit-ticket">
        <button id="close-ticket" onClick={handleClose}>
          Close
        </button>
        {isEditing ? (
          <form>
            <div className="input-field">
              <label>Summary:</label>
              <input
                type="text"
                name="title"
                value={editedTicket.title}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label>Assigned To:</label>
              <input
                type="text"
                name="assignedTo"
                value={editedTicket.assignedTo}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label>Created By:</label>
              <input
                type="text"
                name="createdBy"
                value={editedTicket.createdBy}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label>Status:</label>
              <select
                name="status"
                value={editedTicket.status}
                onChange={handleChange}
              >
                <option value="Backlog">Backlog</option>
                <option value="Dev">Dev</option>
                <option value="Testing">Testing</option>
                <option value="Released">Released</option>
              </select>
            </div>
            <div className="input-field">
              <label>Priority:</label>
              <select
                name="priority"
                value={editedTicket.priority}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="input-field">
              <label>Description:</label>
              <textarea
                name="description"
                value={editedTicket.description}
                onChange={handleChange}
              />
            </div>
            <button id="save-btn" type="button" onClick={handleSaveClick}>
              Save
            </button>
          </form>
        ) : (
          <div>
            <h3>{ticket.title}</h3>
            <p>
              <strong>Assigned To:</strong> {ticket.assignedTo}
            </p>
            <p>
              <strong>Created By:</strong> {ticket.createdBy}
            </p>
            <p>
              <strong>Status:</strong> {ticket.status}
            </p>
            <p>
              <strong>Priority:</strong> {ticket.priority}
            </p>
            <p>
              <strong>Description:</strong> <br /> <br />
              {ticket?.description}
            </p>
            <button id="edit-btn" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditTicket;
