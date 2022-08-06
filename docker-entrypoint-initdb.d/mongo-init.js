db = db.getSiblingDB('slproposals');
db.createUser(
  {
    user: 'casper',
    pwd: 'meow',
    roles: [{ role: 'readWrite', db: 'slproposals' }],
  },
);
db.createCollection('users');