if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { db } from '../models';
import { cleanDb } from '../helpers/testHelpers';
import fetch from 'node-fetch';
import { umzug } from '../migrate';

const populate = async () => {
  await cleanDb();
  await umzug.up();
  console.log('Populating database...');

  const ships = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ ships { id name image class active } }' }),
  })
    .then(res => res.json())
    .then(data => data.data.ships);

  const missionsName = ['Save the Dolphins', 'Rescue sunken ship', 'Find the missing treasure', 'Classified 1', 'Classified 2', 'Classified 3', 'Save the Dolphins again', 'Important Mission 1', 'Important Mission 2', 'Important Mission 3', 'Important Mission 4', 'Important Mission 5', 'Vacation 1', 'Vacation 2', 'Vacation 3', 'Vacation 4', 'Vacation 5', 'Another mission on the ocean 1', 'Another mission on the ocean 2', 'Another mission on the ocean 3', 'Another mission on the ocean 4', 'Another mission on the ocean 5'];

  await Promise.all(
    ships.map((ship: any) => {
      return db.Ship.create({
        active: ship.active,
        name: ship.name,
        class: ship.class,
        image: ship.image,
      });
    }),
  );

  const shipsOnDb = await db.Ship.findAll();

  await Promise.all(
    missionsName.map((missionName: string) => {
      return db.Mission.create({
        name: missionName,
        shipId: shipsOnDb[Math.floor(Math.random() * shipsOnDb.length)].id,
      })
    }),
  );

  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
