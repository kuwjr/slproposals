db.createUser(
    {
        user: "casper",
        pwd: "meow",
        roles: [
            {
                role: "root",
                db: "slproposals"
            }
        ]
    }
);