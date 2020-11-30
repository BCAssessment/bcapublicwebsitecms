// DB Config for PSQL used on Azure.  Had to pivot from CosmosDB.
// requires the following environment variables:
// export DATABASE_HOST="{PQSSERVICENAME}.postgres.database.azure.com"
// export DATABASE_PORT="5432"
// export DATABASE_USERNAME="{USERNAME}@{HOSTNAME}"
// export DATABASE_PASSWORD="{PASSWORD}}"
// export DATABASE_SSL="true"

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'strapi'),
          username: env('DATABASE_USERNAME', ''),
          password: env('DATABASE_PASSWORD', ''),
          schema: 'public',
          ssl: env('DATABASE_SSL', 'true'),
        },
      options: {},
    },
  },
});

// Keeping this here for use with Mongo and docker-compose
// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'mongoose',
//       settings: {
//         client: 'mongo',
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 27017),
//         database: env('DATABASE_NAME', 'strapi'),
//         username: env('DATABASE_USERNAME', ''),
//         password: env('DATABASE_PASSWORD', ''),
//       },
//       options: {
//         authenticationDatabase: env('AUTHENTICATION_DATABASE'),
//         ssl: env('DATABASE_SSL'),
//       },
//     },
//   },
// });