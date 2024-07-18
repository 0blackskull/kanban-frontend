import { useEffect, useState } from "react";
import Ticket from "./Ticket";

import "../stylesheets/Dashboard.css";
import { BASE } from "../App";

const getTickets = async (dashboard: string) => {
  console.log(dashboard);

  try {
    const response = await fetch(`${BASE}/api/tickets`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    console.log(`Tickets: ${JSON.stringify(data.data)}`);

    return data.data;
  } catch (err) {
    console.error(`Failed to fetch tickets: ${err}`);
  }
};

function Dashboard(props: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!props.dashboard) return;

    const fetchData = async () => {
      const res = await getTickets(props.dashboard);
      setData(res);
    };

    fetchData();
  }, [props.dashboard, props.refresh]);

  const status = ["Backlog", "Dev", "Testing", "Released"];

  return (
    <div id="dashboard">
      {status.map((stat) => {
        const statusTickets = data?.filter(
          (ticket: any) => ticket.status === stat
        );

        console.log(data);

        return (
          <div key={stat} className="status-column">
            <h2>{stat}</h2>
            {statusTickets?.map((ticket: any) => (
              <Ticket key={ticket._id} ticket={ticket} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
