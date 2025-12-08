import type { IObject } from './objects';

export interface IEnvironment {
  createdAt: string;
  env_adjacency: string[];
  env_object_i: IObject;
  env_total_interactions: number;
  env_total_new: number;
  env_total_valid: number;
  objects: string[];
  updatedAt: string;
  _id: string;
}
