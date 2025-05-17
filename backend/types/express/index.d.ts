import { User } from "../../drizzle/schema"; // adjust path as needed
 
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}