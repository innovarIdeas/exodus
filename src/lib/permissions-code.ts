export const PERMISSION_CODES = {
  ADMIN: ["000"],
  CLIENT: ["001"],
  CREATE_USER: ["000", "100"],
  DELETE_USER: ["000", "101"],
  UPDATE_USER: ["000", "102"],
  READ_USER: ["000", "103"],

};

export type TPermissionsCodes = typeof PERMISSION_CODES;
