export type UsersModel = {
  id: number;
  username: string;
  password: string;
  state: 1 | 0;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

/**
 * This is the data that will be returned when a user requests a JWT token.
 */
export type UserAuth = {
  id: number;
  username: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
