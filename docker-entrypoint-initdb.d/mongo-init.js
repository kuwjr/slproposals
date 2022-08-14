db.createUser(
    {
        user: "casper",
        pwd: "meow",
        roles: [
            {
                role: "readWrite",
                db: "slproposals"
            }
        ]
    }
);