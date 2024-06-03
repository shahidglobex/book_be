import { DEFAULT_ROLES } from "../../src/constants";
import AuthRepo from "../../src/modules/auth/auth.repo";
import { kysely } from "../../src/providers/db";

import { prisma } from "../../src/providers/db/prisma.db";

async function main() {
  console.log("**** Seeding Starting ****");
  console.log("**** Adding super user ****");
  await Promise.all(
    DEFAULT_ROLES.map((role) =>
      kysely.insertInto("roles").values(role).execute()
    )
  );
  await AuthRepo.seedSuperAdmin();
  console.log("**** Seeding Done ****");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);

    // return;
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
