import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export interface IContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  decodeToken: {
    id: string | null;
  } | null;
}

export interface IJwtPayload {
  id: string;
  email: string;
}
