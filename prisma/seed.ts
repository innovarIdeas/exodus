import * as fs from "node:fs/promises";
import { ParseArgsConfig } from "util";
import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line no-restricted-imports
import { ROLE_OWNER } from "../src/lib/rbac";
import bcrypt from "bcryptjs";
import { parseArgs } from "node:util";

const prisma = new PrismaClient();
const config: ParseArgsConfig = { options: { environment: { type: "string" } } };

async function seedUsers () {
  const testOwnerData = {
    name: "John Doe",
    email: "exodus.test@yopmail.com",
    password: "secret"
  };

  const ownerRole = await prisma.role.findUnique({ where: { name: ROLE_OWNER } });

  await prisma.user.upsert(
    {
      where: { email: testOwnerData.email },
      update: {
        name: testOwnerData.name,
        password: bcrypt.hashSync(testOwnerData.password),
        claims: {
          createMany: {
            data: [{ role_id: ownerRole?.id, type: "ROLE" }],
            skipDuplicates: true
          }
        },
      },
      create: {
        ...testOwnerData,
        password: bcrypt.hashSync(testOwnerData.password),
        claims: { create: { role_id: ownerRole?.id, type: "ROLE" } },
      }
    }
  );

  console.log("Owner seeding complete");
}

async function seedPermissionsAndRoles () {
  interface TPermission {
    code: string;
    module: string;
    action: string;
    resource_id?: string;
  }

  interface TRole {
    name: string;
    built_in: boolean;
    permission_codes: string[];
  }

  const permissionsJson = JSON.parse(await fs.readFile("./prisma/seed-data/dev/permissions.json", "utf-8")) as TPermission[];
  const rolesJson = JSON.parse(await fs.readFile("./prisma/seed-data/dev/roles.json", "utf-8")) as TRole[];

  await prisma.permission.createMany({
    data: permissionsJson.map((item) => ({ ...item, active: true })),
    skipDuplicates: true,
  });

  const permissions = await prisma.permission.findMany({ where: { code: { in: permissionsJson.map(({ code }) => code) } } });

  console.log("Permissions seeding complete");

  for (const { name, built_in: builtIn, permission_codes: permissionCodes } of rolesJson) {
    const permissionIds = permissions.filter(({ code }) => permissionCodes.includes(code)).map(({ id }) => id);

    await prisma.role.upsert({
      where: { name },
      update: {
        permissions: {
          createMany: {
            data: permissionIds.map((id) => ({
              active: true,
              permission_id: id
            })),
            skipDuplicates: true,
          }
        }
      },
      create: {
        name,
        built_in: builtIn,
        active: true,
        permissions: {
          createMany: {
            data: permissionIds.map((id) => ({
              active: true,
              permission_id: id
            })),
            skipDuplicates: true,
          }
        }
      }
    });
  }

  console.log("Roles seeding complete");
}

async function seedConstants () {
  const file = await fs.readFile("./prisma/seed-data/dev/constants.json", "utf-8");
  const data = JSON.parse(file) as { name: string; value: string | number; shortcode: string; description: string}[];

  for (const item of data) {
    await prisma.constants.upsert({
      where: { shortcode: item.name },
      update: {
        name: item.name,
        value: Number(item.value),
        shortcode: item.shortcode
      },
      create: {
        name: item.name,
        value: Number(item.value),
        shortcode: item.shortcode
      }
    });
  }

  console.log("Constants seeding complete");
}

async function seedDev () {
  try {
    await seedPermissionsAndRoles();
    await seedUsers();
    await seedConstants();
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedProd () {
  try {
    await seedPermissionsAndRoles();
    await seedUsers();
    await seedConstants();
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main () {
  const { values: { environment } } = parseArgs(config);

  if (
    environment
      ?.toString()
      ?.toLocaleLowerCase()
      ?.includes("prod")
  ) {
    await seedProd();

    return;
  }

  await seedDev();
}

main();
