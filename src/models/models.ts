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