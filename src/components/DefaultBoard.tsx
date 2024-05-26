import { useEffect, useState } from "react";
import "../stylesheets/DefaultBoard.css";
import { BASE } from "../App";

const fetchDashboards = async () => {
  try {
    const response = await fetch(`${BASE}/api/dashboard`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    console.log(`Dashboards recieved: ${JSON.stringify(data.data)}`);

    if (data.status === 200) {
      return data.data;
    }
  } catch (err) {
    console.error(`Error fetching dashboards: ${err}`);
  }
};

function DefaultBoard(params: any) {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDashboards();

      setDashboards(data);
    };

    fetchData();
  }, []);

  const handleSelectBoard = (e: any, title: string) => {
    e.preventDefault();

    params.setDashboard(title);
  };

  return (
    <div id="defaultBoard">
      {dashboards.length === 0 ? (
        <p> Create a Dashboard to get started! </p>
      ) : (
        <></>
      )}

      {dashboards.map((board: any) => {
        return (
          <div
            key={board._id}
            onClick={(e) => handleSelectBoard(e, board.title)}
          >
            <button className="tile-button">{board.title}</button>
          </div>
        );
      })}
    </div>
  );
}

export default DefaultBoard;
