-- DROP TABLE projects CASCADE;
-- DROP TABLE levels CASCADE;
-- DROP TABLE users CASCADE;
-- DROP TABLE project_level;
-- DROP TABLE project_user;


CREATE TABLE projects (
  id INT NOT NULL,
  aboutInfo text,
  numberOfBackers INT,
  PRIMARY KEY (id)
);

CREATE TABLE levels (
  id INT NOT NULL,
  cutoffAmount INT,
  name text,
  description text,
  includes text[],
  estimatedDelivery date,
  shipsTo text,
  numberOfBackers INT,
  maxBackers INT,
  PRIMARY KEY (id)
);

CREATE TABLE project_level (
  joinId INT NOT NULL,
  id_project INT CONSTRAINT project_level_ref REFERENCES projects (id) ON UPDATE CASCADE ON DELETE CASCADE,
  id_level INT CONSTRAINT level_project_ref REFERENCES levels (id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (joinId)
);


CREATE TABLE users (
  id INT NOT NULL,
  username text,
  projectId INT NOT NULL,
  projectAmount INT,
  PRIMARY KEY (id)
);

CREATE TABLE project_user (
  joinId INT NOT NULL,
  id_project INT CONSTRAINT project_user_ref REFERENCES projects (id) ON UPDATE CASCADE ON DELETE CASCADE,
  id_user INT CONSTRAINT user_project_ref REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (joinId)
);