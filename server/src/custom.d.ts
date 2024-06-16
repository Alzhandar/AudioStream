import 'express';
import { IUser } from './models/User';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      file?: { 
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        destination: string;
        filename: string;
        path: string;
        size: number;
      };
    }
  }
}
