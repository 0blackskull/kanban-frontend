import { useState } from "react";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";
import DefaultBoard from "./DefaultBoard";

function Layout() {
  const [dashboard, setDashboard] = useState(null);
  const [refreshDashboard, setRefreshDashboard] = useState(0);

  return (
    <div>
      <Topbar setDashboard={setDashboard} refreshDashboard={refreshDashboard} setRefreshDashboard={setRefreshDashboard} />
      {!dashboard ? (
        <DefaultBoard setDashboard={setDashboard} />
      ) : (
        <Dashboard dashboard={dashboard} refresh={refreshDashboard} />
      )}
    </div>
  );
}

export default Layout;
