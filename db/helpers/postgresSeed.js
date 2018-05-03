const faker = require('faker');
const fs = require('fs');
const uuidv4 = require('uuid/v4');


//let projectFilePostgres = 'projects' + Math.floor(Math.random() * 1000) + '.txt';


function createProjects() {
  let id = 1;
  let projects = [];

  for (let i = 1; i <= 10000000; i++) {
    id = i;
    let aboutInfo = faker.lorem.paragraphs();
    let numberOfBackers = Math.floor(Math.random() * 100);

    const tempProject = `${id}|${aboutInfo}|${numberOfBackers}`;
    projects.push(tempProject);

    if (i % 1000 === 0) {
      fs.appendFileSync('projects.txt', `${projects.join('\n')}\n`);
      projects = [];
      process.stdout.write('.');
      if (i % 10000 === 0) {
        console.log(i);
      }
    }
  }
};


//let userFilePostgres = 'users' + Math.floor(Math.random() * 1000) + '.txt';


function createLevels() {
  let tempLevels = [];
  let levelId = 1;
  
  for (let i = 1; i <= 10000000; i++) {
    let projectId = 1 + Math.floor(Math.random() * 10000000);
    let projectNumberOfBackers = 0;
    let numLevels = 1 + Math.floor(Math.random() * 5);

    for (let j = 0; j < numLevels; j++) {
      let id = levelId;
      levelId++;
      let cutoffAmount = faker.commerce.price();
      let name = faker.company.bsNoun();
      let description = faker.lorem.sentence();
      // each level includes 1 to 3 things
      let numIncludes = 1 + Math.floor(Math.random() * 3);
      let includesArray = [];
      for (let k = 0; k < numIncludes; k++) {
        includesArray.push(faker.lorem.words());
      }
      let includes = includesArray;
      let estimatedDelivery = faker.date.future();
      let shipsTo = faker.address.country();
      let numberOfBackers = Math.floor(Math.random() * 100);
      projectNumberOfBackers += numberOfBackers;
      let maxBackers;
      if (Math.random() < 0.10) {
        maxBackers = numberOfBackers;
      } else {
        let continueMaxBackersSearch = true;
        while (continueMaxBackersSearch) {
          maxBackers = Math.floor(Math.random() * 101);
          if (maxBackers > numberOfBackers) {
            continueMaxBackersSearch = false;
          }
        }
      }
      const tempLevel = `${id}|${cutoffAmount}|${name}|${description}|${includes}|${estimatedDelivery}|
      ${shipsTo}|${numberOfBackers}|${maxBackers}|${projectId}`;
      tempLevels.push(tempLevel);
    }

    if (i % 1000 === 0) {
      fs.appendFileSync('levels.txt', `${tempLevels.join('\n')}\n`);
      tempLevels = [];
      process.stdout.write('.');
      if (i % 10000 === 0) {
        console.log(i);
      }
    }
  }
};



//let userFile = 'users' + Math.floor(Math.random() * 1000) + '.txt';


function createUsers() {
  let users = [];
  for (let i = 1; i <= 10000000; i++) {
    let id = i;
    let username = faker.internet.userName() + i;

    let numProjects = 1 + Math.floor(Math.random() * 7);
    let tempProjectsBacked = [];
    for (let j = 0; j < numProjects; j++) {
      let tempProjects = {};
      tempProjects.projectId = 1 + Math.floor(Math.random() * 10000000);
      tempProjects.amount = faker.commerce.price();
      tempProjectsBacked.push(JSON.stringify(tempProjects));
    }
    const tempUser = `${id}|${username}|${tempProjectsBacked}`;
    users.push(tempUser);

    if (i % 1000 === 0) {
      fs.appendFileSync('users.txt', `${users.join('\n')}\n`);
      users = [];
      process.stdout.write('.');
      if (i % 10000 === 0) {
        console.log(i);
      }
    }
  }
};

console.log('Creating Projects');
createProjects();
console.log('Creating levels');
createLevels();
console.log('Creating Users');
createUsers();
console.log('done');




