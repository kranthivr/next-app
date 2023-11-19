import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <Link href="/changepassword">Change Password</Link>
    </div>
  );
};

export default Dashboard;
