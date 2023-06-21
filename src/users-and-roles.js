function UsersAndRoles() {
  const Users = [];
  const Roles = [];

  function isValidRole(role) {
    // validate by type of properties and range of values
    const { Id, Name, Parent } = role;
    return (
      typeof Id === "number" &&
      typeof Name === "string" &&
      typeof Parent === "number" &&
      Id >= 1 &&
      Parent >= 0
    );
  }

  function isValidUser(user) {
    // validate by type of properties and range of values
    const { Id, Name, Role } = user;
    return (
      typeof Id === "number" &&
      typeof Name === "string" &&
      typeof Role === "number" &&
      Id >= 1 &&
      Role >= 1
    );
  }

  function getUserById(userId) {
    return Users.find((user) => user.Id === userId);
  }

  function setUsers(users) {
    users.forEach((user) => {
      if (isValidUser(user) && !getUserById(user.Id)) {
        // validate a user data and check Id duplication
        Users.push(user);
      } else {
        console.log(`Invalid user: ${JSON.stringify(user)}`);
      }
    });
  }

  function setRoles(roles) {
    roles.forEach((role) => {
      if (isValidRole(role)) {
        // validate a role data
        Roles.push(role);
      } else {
        console.log(`Invalid role: ${JSON.stringify(role)}`);
      }
    });
  }

  function getUsersByRoleId(roleId) {
    return Users.filter((user) => user.Role === roleId);
  }

  function getSubRolesByRoleId(roleId) {
    const returnSubRoles = [];

    function findSubRolesByRoleId(roleId) {
      // find roles that has parent value as roleId
      const subRoles = Roles.filter((role) => role.Parent === roleId);
      returnSubRoles.push(...subRoles);
      // find roles from filtered roles
      subRoles.forEach((role) => findSubRolesByRoleId(role.Id));
    }

    findSubRolesByRoleId(roleId);

    return returnSubRoles;
  }

  function getSubOrdinatesByUserId(userId) {
    const user = getUserById(userId);
    if (!user) {
      console.log(`Invalid User Id: ${userId}`);
      return [];
    }
    const subRoles = getSubRolesByRoleId(user.Role);
    const subOrdinates = [];
    subRoles.forEach((role) => {
      const users = getUsersByRoleId(role.Id);
      subOrdinates.push(...users);
    });
    return subOrdinates;
  }

  return {
    setUsers,
    setRoles,
    getSubOrdinatesByUserId,
  };
}

module.exports = { UsersAndRoles };
