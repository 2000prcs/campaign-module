const faker = require('faker');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

//let projectFilePostgres = 'projects' + Math.floor(Math.random() * 1000) + '.txt';


function createProjects() {
  let id = 1;
  let projects = [];

  for (let i = 1; i <= 10000000; i++) {
    id = i;
    let aboutInfo = faker.lorem.paragraph();
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


let levelsFile = 'levels' + Math.floor(Math.random() * 1000) + '.txt';


function createLevels() {
  let tempLevels = [];
  let levelId = 0;
  
  for (let i = 14996839; i <= 9000000; i++) {
    let projectId = 1 + Math.floor(Math.random() * 10000000);
    let projectNumberOfBackers = 0;
    let numLevels = 1 + Math.floor(Math.random() * 5);
    
    for (let j = 0; j < numLevels; j++) {
      let id = i + levelId;
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
      let estimatedDelivery = moment(faker.date.future()).format('MM/DD/YYYY h:mm:ss a');
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
      let includes = {'includes': includesArray};
      const tempLevel = `${id}|${cutoffAmount}|${name}|${description}|${JSON.stringify(includes)}|${estimatedDelivery}|${shipsTo}|${numberOfBackers}|${maxBackers}|${projectId}`;
      tempLevels.push(tempLevel);
    }

    if (i % 1000 === 0) {
      fs.appendFileSync(levelsFile, `${tempLevels.join('\n')}\n`);
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
  for (let i = 1; i <= 5000000; i++) {
    let id = i;
    let username = faker.internet.userName() + i;

    let numProjects = 1 + Math.floor(Math.random() * 7);
    let tempProjectsBacked = [];
    for (let j = 0; j < numProjects; j++) {
      let tempProjects = {};
      tempProjects.projectId = 1 + Math.floor(Math.random() * 10000000);
      tempProjects.amount = faker.commerce.price();
      tempProjectsBacked.push(tempProjects);
    }
    let tempObj = {'tempProjectsBacked': tempProjectsBacked}
    const tempUser = `${id}|${username}|${JSON.stringify(tempObj)}`;
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

// console.log('Creating Projects');
// createProjects();
console.log('Creating levels');
createLevels();
// console.log('Creating Users');
// createUsers();
console.log('done');




