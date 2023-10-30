export interface IBase {
  id: string;
  active: boolean;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IConstant extends IBase {
  id: string;
  name: string;
  value: number;
}

export interface IPermission {
  id: string;
  code: string;
  active: boolean;
  module: string;
  action: string;
  resource_id?: string | null;
}

export interface IPermissionRole {
  active: boolean;
  permission_id: string;
  role_id: string;
  permission: IPermission;
}

export interface IRole extends IBase {
  id: string;
  name: string;
  active: boolean;
  built_in: boolean;
  permissions: IPermissionRole[];
}

export interface IClaim extends IBase {
  id: string;
  user_id: string;
  role_id: string;
  role: IRole;
}

export interface IValidationError {
  field: string;
  rule: string;
  message: string;
}

export interface IApiError extends Error {
  code: string;
  message: string;
}

export interface IApiResponse<T> {
  data?: T;
  validationErrors?: IValidationError[];
  error?: Error;
}

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
}

export interface IBook extends IBase {
  title: string;
  createdBy: string;
  created_by_user: IUser;
  description: string | null;

}
