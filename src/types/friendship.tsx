import type { IObject } from './objects';

export interface IFriendship {
  createdAt: string;
  rank_adjacency: string[];
  rank_object: IObject;
  updatedAt: string;
  _id: string;
}
