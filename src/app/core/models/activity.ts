import { Category } from "./category"
import { User } from "./user"

export type Activities = Activity[];

export interface Activity {
  id: string
  companyName: string
  position: string
  location: string
  jobType: string
  status: string
  jobPosted: string
  category: Category
  appliedOn: string
  user: User
}
