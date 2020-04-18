// Estamos acrecentado dentro do express o user.id.
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
