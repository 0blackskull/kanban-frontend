import { Dispatch, SetStateAction, useContext, useState } from "react";
import "../stylesheets/Topbar.css";
import { UserContext } from "../App";
import CreateTicket from "./CreateTicket";

function Topbar({
  setDashboard,
}: {
  setDashboard: Dispatch<SetStateAction<any>>;
}) {
  const userContext = useContext(UserContext);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div id="topbar">
      <div>KANBAN</div>
      <div id="options">
        <button onClick={() => setDashboard(null)}>Dashboards</button>
        <button id="create-ticket-btn" onClick={() => setShowCreateForm(true)}>
          Create
        </button>
      </div>
      <div id="logout">
        {" "}
        <button onClick={() => userContext?.setUser(null)}>Logout</button>
      </div>
      {showCreateForm ? (
        <CreateTicket setShowCreateForm={setShowCreateForm} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Topbar;
