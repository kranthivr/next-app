import Link from "next/link";
import { sort } from "fast-sort";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortBy: string;
  order: string;
}

const UserTable = async ({ sortBy, order }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();
  const sortedUsers =
    order === "desc"
      ? sort(users).desc(
          sortBy === "email" ? (user) => user.email : (user) => user.name
        )
      : sort(users).asc(
          sortBy === "email" ? (user) => user.email : (user) => user.name
        );
  const nameHref = `/users?sortBy=name&order=${
    order === "desc" ? "asc" : "desc"
  }`;
  const emailHref = `/users?sortBy=email&order=${
    order === "desc" ? "asc" : "desc"
  }`;

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href={nameHref} className="flex">
              Name
              {!sortBy || sortBy === "name" ? (
                order === "desc" ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )
              ) : (
                ""
              )}
            </Link>
          </th>
          <th>
            <Link href={emailHref} className="flex">
              Email
              {sortBy === "email" ? (
                order === "desc" ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )
              ) : (
                ""
              )}
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
