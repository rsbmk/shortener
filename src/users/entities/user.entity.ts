export type UsersModel = {
  id: number;
  username: string;
  password: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

/**
 * This is the data that will be returned when a user requests a JWT token.
 */
export type UserAuth = {
  id: number;
  username: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
