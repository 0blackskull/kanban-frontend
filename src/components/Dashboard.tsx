import { useEffect, useState } from "react";
import Ticket from "./Ticket";

import "../stylesheets/Dashboard.css";

const BASE = "http://localhost:3000/api";

const getTickets = async (dashboard: string) => {
  try {
    const response = await fetch(`${BASE}/tickets`, {
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

function Dashboard(params: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!params.dashboard) return;

    const fetchData = async () => {
      const res = await getTickets(params.dashboard);
      setData(res);
    };

    fetchData();
  }, [params.dashboard]);

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
