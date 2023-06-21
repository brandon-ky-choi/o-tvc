const { expect } = require("chai");
const { UsersAndRoles } = require("./users-and-roles");

describe("UsersAndRoles", () => {
  it("getSubOrdinatesByUserId should return [] if there are no users, roles", () => {
    const UserDB = UsersAndRoles();
    const result = UserDB.getSubOrdinatesByUserId(1);
    expect(result).to.deep.equal([]);
  });

  it("getSubOrdinatesByUserId should return a User with Role #2", () => {
    const UserDB = UsersAndRoles();
    UserDB.setRoles([
      {
        Id: 1,
        Name: "System Administrator",
        Parent: 0,
      },
      {
        Id: 2,
        Name: "Location Manager",
        Parent: 1,
      },
    ]);
    UserDB.setUsers([
      {
        Id: 1,
        Name: "User Admin",
        Role: 1,
      },
      {
        Id: 2,
        Name: "User Manager",
        Role: 2,
      },
    ]);
    const result = UserDB.getSubOrdinatesByUserId(1);
    expect(result[0]).to.deep.equal({
      Id: 2,
      Name: "User Manager",
      Role: 2,
    });
  });

  it("getSubOrdinatesByUserId should return [] if user data invalid - duplicated Id, wrong Id format, wrong Role", () => {
    const UserDB = UsersAndRoles();
    UserDB.setRoles([
      {
        Id: 1,
        Name: "System Administrator",
        Parent: 0,
      },
      {
        Id: 2,
        Name: "Location Manager",
        Parent: 1,
      },
    ]);
    UserDB.setUsers([
      {
        Id: 1,
        Name: "User Admin",
        Role: 1,
      },
      {
        Id: 1,
        Name: "User Manager",
        Role: 2,
      },
    ]);
    const result = UserDB.getSubOrdinatesByUserId(1);
    expect(result).to.deep.equal([]);

    UserDB.setUsers([
      {
        Id: "2",
        Name: "User Manager",
        Role: 2,
      },
    ]);
    const result2 = UserDB.getSubOrdinatesByUserId(1);
    expect(result2).to.deep.equal([]);

    UserDB.setUsers([
      {
        Id: 2,
        Name: "User Manager",
        Role: -1,
      },
    ]);
    const result3 = UserDB.getSubOrdinatesByUserId(1);
    expect(result3).to.deep.equal([]);
  });

  it("getSubOrdinatesByUserId should return [] if role data invalid - wrong Id, wrong Id format, wrong Parent", () => {
    const UserDB = UsersAndRoles();
    UserDB.setRoles([
      {
        Id: 1,
        Name: "System Administrator",
        Parent: 0,
      },
      {
        Id: 0,
        Name: "Location Manager",
        Parent: 1,
      },
    ]);
    UserDB.setUsers([
      {
        Id: 1,
        Name: "User Admin",
        Role: 1,
      },
      {
        Id: 2,
        Name: "User Manager",
        Role: 2,
      },
    ]);
    const result = UserDB.getSubOrdinatesByUserId(1);
    expect(result).to.deep.equal([]);

    UserDB.setRoles([
      {
        Id: "2",
        Name: "Location Manager",
        Parent: 1,
      },
    ]);
    const result2 = UserDB.getSubOrdinatesByUserId(1);
    expect(result2).to.deep.equal([]);

    UserDB.setRoles([
      {
        Id: 2,
        Name: "Location Manager",
        Parent: -1,
      },
    ]);
    const result3 = UserDB.getSubOrdinatesByUserId(1);
    expect(result3).to.deep.equal([]);
  });

  it("getSubOrdinatesByUserId should return [] if user does not exist", () => {
    const UserDB = UsersAndRoles();
    UserDB.setRoles([
      {
        Id: 1,
        Name: "System Administrator",
        Parent: 0,
      },
      {
        Id: 2,
        Name: "Location Manager",
        Parent: 1,
      },
    ]);
    UserDB.setUsers([
      {
        Id: 1,
        Name: "User Admin",
        Role: 1,
      },
      {
        Id: 2,
        Name: "User Manager",
        Role: 2,
      },
    ]);
    const result = UserDB.getSubOrdinatesByUserId(3);
    expect(result).to.deep.equal([]);
  });

  it("getSubOrdinatesByUserId should return [] if user with role does not exist", () => {
    const UserDB = UsersAndRoles();
    UserDB.setRoles([
      {
        Id: 1,
        Name: "System Administrator",
        Parent: 0,
      },
      {
        Id: 2,
        Name: "Location Manager",
        Parent: 1,
      },
    ]);
    UserDB.setUsers([
      {
        Id: 1,
        Name: "User Admin",
        Role: 1,
      },
      {
        Id: 2,
        Name: "User Staff",
        Role: 3,
      },
    ]);
    const result = UserDB.getSubOrdinatesByUserId(3);
    expect(result).to.deep.equal([]);
  });

  it("getSubOrdinatesByUserId should return suborinates of suborinates", () => {
    const UserDB = UsersAndRoles();
    UserDB.setRoles([
      {
        Id: 1,
        Name: "System Administrator",
        Parent: 0,
      },
      {
        Id: 2,
        Name: "Location Manager",
        Parent: 1,
      },
      {
        Id: 3,
        Name: "Supervisor",
        Parent: 2,
      },
      {
        Id: 4,
        Name: "Employee",
        Parent: 3,
      },
      {
        Id: 5,
        Name: "Trainer",
        Parent: 3,
      },
    ]);
    UserDB.setUsers([
      {
        Id: 1,
        Name: "Adam Admin",
        Role: 1,
      },
      {
        Id: 2,
        Name: "Emily Employee",
        Role: 4,
      },
      {
        Id: 3,
        Name: "Sam Supervisor",
        Role: 3,
      },
      {
        Id: 4,
        Name: "Mary Manager",
        Role: 2,
      },
      {
        Id: 5,
        Name: "Steve Trainer",
        Role: 5,
      },
    ]);
    const result = UserDB.getSubOrdinatesByUserId(1);
    expect(result.length).to.equal(4);
  });
});
