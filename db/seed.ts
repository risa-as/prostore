import "dotenv/config";

import sampleData from "./sample-data";
// import { prisma } from "./prisma-db";
import { prisma } from "./prisma";

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log("Database has been seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
