const faker = require('faker');
const saveProjects = require('../index.js').saveProjects;
const saveUsers = require('../index.js').saveUsers;
const fs = require('fs');
const uuidv4 = require('uuid/v4');
// const stream = require('stream');
// const writeStream = fs.createWriteStream('projects.txt', {
//   flags: 'a'
// });

// seed levels collection
// just pass in array of objects to saveProjects and it will create new models
// do this for 100 projects

let projectFile = 'projects' + Math.floor(Math.random() * 1000) + '.json';

function createProjects() {
  let levelId = 1;
  const projectId = 1;
  let projects = [];

  for (let i = 1; i <= 1000000; i++) {
    const tempProject = {};
    let projectNumberOfBackers = 0;
    tempProject.id = uuidv4();
    // pick a number of levels at random between 3 and 8
    tempLevels = [];
    const numLevels = 3 + Math.floor(Math.random() * 8);
    for (let j = 0; j < numLevels; j++) {
      const tempLevel = {};
      tempLevel.id = levelId++;
      tempLevel.cutoffAmount = faker.commerce.price();
      tempLevel.name = faker.company.bsNoun();
      tempLevel.description = faker.lorem.sentence();
      // each level includes 1 to 3 things
      const numIncludes = 1 + Math.floor(Math.random() * 3);
      const includesArray = [];
      for (let k = 0; k < numIncludes; k++) {
        includesArray.push(faker.lorem.words());
      }
      tempLevel.includes = includesArray;
      tempLevel.estimatedDelivery = faker.date.future();
      tempLevel.shipsTo = faker.address.country();
      tempLevel.numberOfBackers = Math.floor(Math.random() * 100);
      projectNumberOfBackers += tempLevel.numberOfBackers;
      if (Math.random() < 0.10) {
        tempLevel.maxBackers = tempLevel.numberOfBackers;
      } else {
        let continueMaxBackersSearch = true;
        while (continueMaxBackersSearch) {
          const maxBackers = Math.floor(Math.random() * 101);
          if (maxBackers > tempLevel.numberOfBackers) {
            continueMaxBackersSearch = false;
            tempLevel.maxBackers = maxBackers;
          }
        }
      }
      tempLevels.push(tempLevel);
    }
    tempProject.numberOfBackers = projectNumberOfBackers;
    tempProject.levels = tempLevels;
    tempProject.aboutInfo = faker.lorem.paragraphs();
    projects.push(JSON.stringify(tempProject));

    if (i % 1000 === 0) {
      fs.appendFileSync(projectFile, `${projects.join('\n')}\n`);
      projects = [];
      process.stdout.write('.');
      if (i % 10000 === 0) {
        console.log(i);
      }
    }
  }
}
// seed user collection
// create array of users that will be added to user collection

// keep track of usernames already used since that value has to be unique
// create 1000 users

let userFile = 'users' + Math.floor(Math.random() * 1000) + '.json';


function createUsers() {
  let users = [];
  const takenUsers = {};

  for (let i = 1; i <= 10000000; i++) {
    const tempUser = {};
    // ensure unique username
    let continueUserNameSearch = true;
    let tempUserName = '';
    while (continueUserNameSearch) {
      tempUserName = faker.internet.userName() + i;
      if (!(tempUserName in takenUsers)) {
        continueUserNameSearch = false;
      }
    }
    tempUser.username = tempUserName;
    // choose random number of projects between 1 and 7
    const numProjects = 1 + Math.floor(Math.random() * 7);
    const tempProjectsBacked = [];
    for (let j = 0; j < numProjects; j++) {
      const tempProjects = {};
      tempProjects.projectId = 1 + Math.floor(Math.random() * 100);
      tempProjects.amount = faker.commerce.price();
      tempProjectsBacked.push(tempProjects);
    }
    tempUser.projectsBacked = tempProjectsBacked;
    users.push(JSON.stringify(tempUser));

    if (i % 1000 === 0) {
      fs.appendFileSync(userFile, `${users.join('\n')}\n`);
      users = [];
      process.stdout.write('.');
      if (i % 10000 === 0) {
        console.log(i);
      }
    }
  }
}

// console.log('Creating Projects');
// createProjects();
// console.log('Creating Users');
// createUsers();
// console.log('done');

// save levels and users to database
// saveProjects(projects)
//   .then(saveUsers(users))
//   .then((result) => {
//     console.log('done');
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// function writeTenMillionTimes(writer, data, encoding, callback) {
//   let i = 100000;
//   write();

//   function write() {
//     let ok = true;
//     do {
//       i--;
//       if (i === 0) {
//         data();
//         writer.write(JSON.stringify(projects), encoding, callback);
//       } else {
//         console.log(i);
//         data();
//         ok = writer.write(JSON.stringify(projects), encoding);
//         console.log(ok);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       writer.once('drain', () => {
//         console.log('drained');
//         write();
//       });
//     }
//   };
// };


// writeTenMillionTimes(writeStream, createProjects, 'utf8', () => {
//   console.log('completed');
//   writeStream.end();
// });

// writeStream.on('finish', () => {
//   console.log('in Finish - completed');
// });
