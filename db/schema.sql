-- DROP TABLE projects CASCADE;
-- DROP TABLE levels CASCADE;
-- DROP TABLE users CASCADE;
-- DROP TABLE project_level;
-- DROP TABLE project_user;

-- CREATE TABLE users (
--   id INT NOT NULL,
--   username text,
--   tempProjectsBacked JSON,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE projects (
--   id INT NOT NULL,
--   aboutInfo text,
--   numberOfBackers INT,
--   PRIMARY KEY (id)
-- );

CREATE TABLE levels (
  id INT NOT NULL,
  cutoffAmount DECIMAL,
  name text,
  description text,
  includes JSON,
  estimatedDelivery date,
  shipsTo text,
  numberOfBackers INT,
  maxBackers INT,
  projectId INT CONSTRAINT project_level_ref REFERENCES projects (id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);


