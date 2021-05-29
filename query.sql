CREATE TABLE accounts(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
    name VARCHAR(255) NOT NULL ,
    mobile VARCHAR(11) NOT NULL,
    userType VARCHAR(255) NOT NULL DEFAULT'customer',
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME,
    deletedAT DATETIME
)
