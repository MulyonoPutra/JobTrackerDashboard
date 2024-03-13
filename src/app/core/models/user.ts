import { Address } from "./address";
import { Education } from "./education";
import { Experience } from "./experience";

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  summary?: string;
  phone: string;
  birthday: string;
  address: Address;
  education: Education[]
  experience: Experience[]
}
