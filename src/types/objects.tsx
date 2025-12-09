export interface IObject {
  _id: string;
  obj_name: string;
  obj_brand: string;
  obj_access: number;
  obj_function: string[];
  obj_limitation: string[];
  obj_location: number;
  obj_model: string;
  obj_networkMAC: string;
  obj_owner: string;
  obj_qualification: string | number;
  obj_restriction: string[];
  obj_status: number;
  createdAt: string;
  updatedAt: string;
}
