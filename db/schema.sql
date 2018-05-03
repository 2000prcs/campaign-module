DROP TABLE projects CASCADE;
DROP TABLE levels CASCADE;
DROP TABLE users CASCADE;
DROP TABLE projects_levels;
DROP TABLE projects_users;


CREATE TABLE projects (
  id INT NOT NULL,
  aboutInfo text,
  numberOfBackers INT,
  PRIMARY KEY (id)
);

CREATE TABLE levels (
  id INT NOT NULL,
  cutoffAmount, INT,
  name text,
  description text,
  includes text[],
  estimatedDelivery date,
  shipsTo text,
  numberOfBackers INT,
  maxBackers INT,
  PRIMARY KEY (id)
);

CREATE TABLE projects_levels (

);


CREATE TABLE quickstarter.users (
  id INT NOT NULL,
  username text,
  projectId INT NOT NULL,
  projectAmount INT, 
  FOREIGN KEY (projectId),
  PRIMARY KEY (id)
);