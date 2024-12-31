import { User } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Tambahkan tipe user yang berasal dari model Anda
    }
  }
}
