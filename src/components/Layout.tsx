import { useState } from "react";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";
import DefaultBoard from "./DefaultBoard";

function Layout() {
  const [dashboard, setDashboard] = useState(null);

  return (
    <div>
      <Topbar setDashboard={setDashboard} />
      {!dashboard ? (
        <DefaultBoard setDashboard={setDashboard} />
      ) : (
        <Dashboard dashboard={dashboard} />
      )}
    </div>
  );
}

export default Layout;
