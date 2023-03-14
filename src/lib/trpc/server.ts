import { initTRPC } from "@trpc/server";
import { z } from "zod";
import type { User } from "../../models/User";

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

let userList: User[] = [
  {
    id: 1,
    name: "KATT",
  },
  {
    id: 2,
    name: "JJJ",
  },
];
export const appRouter = router({
  userById: publicProcedure.input(z.number()).query((req) => {
    const input = req.input;
    const user = userList.find((it) => it.id === input);

    return user;
  }),
  userAll: publicProcedure.query(() => {
    return userList;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const user: User = {
        id: !userList.length ? 0 : userList[userList.length - 1].id + 1,
        name: req.input.name,
      };

      userList.push(user);

      return userList;
    }),
  userDeleteById: publicProcedure.input(z.number()).query((req) => {
    userList = userList.filter((it) => it.id != req.input);
    return userList;
  }),
});

export type AppRouter = typeof appRouter;
