// rules defined here for any type should be mentioned in the routes if you want to authenticate using role based.
// role is mentioned in User Schema
// authentication is based on token
const allRoles = {
  user: ['getUsers', 'manageUsers'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
