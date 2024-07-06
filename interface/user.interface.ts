export type TUser = {
  name: string;
  email: string;
  password: string;
  role: string;
};

// export interface TUserModel extends Model<TUser> {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(userId: number): Promise<TUser | null>;
// }
