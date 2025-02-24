const ROLES = {
  Admin: {
    project: {
      view: true,
      create: true,
      update: true,
      delete: true
    }
  },
  User: {
    project: {
      view: true,
      create: false,
      update: false,
      delete: false
    }
  }
};

export const hasPermission = (user, resource, action, data) => {
  return user.roles.some((role) => {
    const permission = ROLES[role][resource]?.[action];
    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;
    // return data != null && permission(user,data)
  });
};
