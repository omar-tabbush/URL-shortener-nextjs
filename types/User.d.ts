import { Url } from "./url";

export interface User {
  id: String;
  email: String;
  name: String;
  isAdmin: Boolean;
  access_token?: String;
  urls?: Url[];
}
