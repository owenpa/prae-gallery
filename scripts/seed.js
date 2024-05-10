const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS Users (
        UserId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        Email TEXT NOT NULL UNIQUE,
        Password TEXT NOT NULL
      );
    `;

    console.log(`------- Created users table`);
    return createTable;

  } catch (error) {
    throw new Error('Error seeding users: ');
  }
}

async function seedGallery(client) {
  try {
    const createGallery = await client.sql`
    CREATE TABLE IF NOT EXISTS Images (
      ImageID SERIAL PRIMARY KEY,
      ImageName VARCHAR(255) NOT NULL,
      ImageTitle VARCHAR(255) DEFAULT 'Untitled Piece',
      ImageUrl TEXT NOT NULL,
      Likes INT DEFAULT 0,
      Shares INT DEFAULT 0,
      Price TEXT DEFAULT '0.00',
      Description TEXT DEFAULT '-',
      DescriptionFooter TEXT DEFAULT '-',
      Date VARCHAR(255)
    );`;

    console.log('------- Created Images table');
    return createGallery;

  } catch (error) {
    throw new Error('Error seeding gallery / Images table: ');
  }
}

async function seedCommissions(client) {
  try {
    const createCommissionsTable = await client.sql`
    CREATE TABLE IF NOT EXISTS CommissionsPage (
      ConfigVersion SERIAL PRIMARY KEY,
      CommissionStatus TEXT DEFAULT 'false',
      TextBeforePrice TEXT DEFAULT '-',
      PriceList TEXT,
      TextAfterPrice TEXT DEFAULT '-',
      ContactInfo TEXT DEFAULT '-'
    );`
    console.log('------- Created CommissionsPage table')
    return createCommissionsTable

  } catch (error) {
    throw new Error('Error seeding commissions page: ')
  }
}

async function main() {
  const client = await db.connect();
  await seedUsers(client);
  await seedGallery(client);
  await seedCommissions(client)
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});