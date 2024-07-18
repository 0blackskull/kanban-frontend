import { useContext, useState } from "react";
import "../stylesheets/CreateTicket.css";
import { BASE, UserContext } from "../App";

type FormState = {
  id: string;
  createdBy?: string;
  status: string;
  priority: string;
  description: string;
  title: string;
  assignee: string;
};

const createTicket = async (ticket: FormState) => {
  try {
    const response = await fetch(`${BASE}/api/tickets`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ticket),
      credentials: "include",
    });

    const data = await response.json();

    console.log(`Ticket created: ${data}`);
  } catch (err) {
    console.error(`Ticket creation failed: ${err}`);
  }
};

function CreateTicket(props: any) {
  const userContext = useContext(UserContext);

  const [formState, setFormState] = useState<FormState>({
    id: (Math.floor(Math.random() * 900) + 100).toString(),
    status: "Dev",
    priority: "low",
    description: "",
    title: "",
    assignee: "",
    createdBy: userContext?.user,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formState);

    const newTicket = {
      createdBy: userContext?.user,
      ...formState,
    };

    createTicket(newTicket);

    props.setRefreshDashboard(props.refreshDashboard + 1);

    props.setShowCreateForm(false);
  };

  return (
    <form id="create-ticket" onSubmit={handleSubmit}>
      <button id="close-form" onClick={() => props.setShowCreateForm(false)}>
        X
      </button>
      <div>
        <label id="ticket-id">Ticket ID: {formState.id}</label>
      </div>
      <div>
        <label>Summary:</label>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formState.status}
          onChange={handleChange}
          required
        >
          <option value="Backlog">Backlog</option>
          <option value="Dev">Dev</option>
          <option value="Testing">Testing</option>
          <option value="Released">Released</option>
        </select>
      </div>
      <div>
        <label>Assignee:</label>
        <input
          type="text"
          name="assignee"
          value={formState.assignee}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Priority:</label>
        <select
          name="priority"
          value={formState.priority}
          onChange={handleChange}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          rows={10}
          cols={50}
          placeholder="Describe your task..."
        />
      </div>
      <div id="ticket-submit">
        <input id="submit-ticket" type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default CreateTicket;
