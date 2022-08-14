db.createUser(
    {
        user: "casper",
        pwd: "meow",
        roles: [
            {
                role: "userAdminAnyDatabase",
                db: "slproposals"
            }
        ]
    }
);