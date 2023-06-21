import { readFile } from "fs/promises";
import { UsersAndRoles } from "./src/users-and-roles.js";

async function init() {
  const Roles = JSON.parse(
    await readFile(new URL("./data/roles.json", import.meta.url))
  );

  const Users = JSON.parse(
    await readFile(new URL("./data/users.json", import.meta.url))
  );

  const UserDB = UsersAndRoles();
  UserDB.setRoles(Roles);
  UserDB.setUsers(Users);
  const subOrdinatesOfUser3 = UserDB.getSubOrdinatesByUserId(3);
  console.log("subOrdinates of user #3", subOrdinatesOfUser3);
  const subOrdinatesOfUser1 = UserDB.getSubOrdinatesByUserId(1);
  console.log("subOrdinates of user #1", subOrdinatesOfUser1);
}

init();
