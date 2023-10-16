import { NextAuthOptions, User } from "next-auth";
import { Permission, Role } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { IPermission } from "@/models/models";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

async function getUserPermissions (user: User): Promise<IPermission[]> {
  const permissions = new Set<Permission>();
  const roles: Role[] = [];

  const claims = await prisma.claim.findMany({
    where: { user_id: user.id, active: true },
    include: { permission: true, role: true }
  });

  claims
    .forEach(({ role, permission }) => {
      if (permission?.active) permissions.add(permission);
      if (role) roles.push(role);
    });

  const rolePermissions = await prisma.permissionRole.findMany({
    where: {
      active: true,
      role_id: { in: roles.map(({ id }) => id) },
      permission_id: { notIn: [...permissions].map(({ id }) => id) },
    },
    include: { permission: true }
  });

  rolePermissions.forEach(({ permission }) => permissions.add(permission));

  return [...permissions];
}

export const options: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize (credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.username } });

        console.log({ user });

        if (!user) {
          return null;
        }

        const password = credentials?.password;

        if (!password) {
          return null;
        }

        const isPasswordValid = await compare(password, user.password_hash);

        if (isPasswordValid) return user;

        return null;
      },
    }),
  ],

  pages: { signIn: "/" },

  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.permissions = await getUserPermissions(user);
      }

      return token;
    },
    async session ({ session, token }) {
      return {
        ...session,
        user: {
          id: token.sub,
          name: token.name,
          email: token.email,
        },
        permissions: token.permissions,
      };
    },
  },
};

export default options;
