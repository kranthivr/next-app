import Link from "next/link";
import UserTable from "./UserTable";
import { Suspense } from "react";
interface Props {
  searchParams: { sortBy: string; order: string };
}

const UsersPage = async ({ searchParams: { sortBy, order } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className="btn">
        New User
      </Link>
      <Suspense fallback={<p className="spinner">Loading...</p>}>
        <UserTable sortBy={sortBy} order={order} />
      </Suspense>
    </>
  );
};

export default UsersPage;
