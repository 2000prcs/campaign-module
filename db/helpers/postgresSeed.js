const faker = require('faker');
const fs = require('fs');
// const uuidv4 = require('uuid/v4');
// const moment = require('moment');

// let projectFilePostgres = 'projects' + Math.floor(Math.random() * 1000) + '.txt';


function createProjects() {
  // let id = 1;
  let projects = [];

  // generate Project 10M
  for (let i = 1; i <= 1000; i++) {
    let id = i;
    const aboutInfo = faker.lorem.paragraph();
    const numberOfBackers = Math.floor(Math.random() * 100);

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

    let tempLevels = [];
    // let levelId = 87738500;
    let pId = i;
    let levelsFile = 'levels' + Math.floor(Math.random() * 1000) + '.txt';

    // generate levels of pledges
    let projectNumberOfBackers = 0;
    let numLevels = 3 + Math.floor(Math.random() * 8);
    let levelId = 1

    for (let j = 0; j < numLevels; j++) {
      let id = levelId;
      levelId++;
      let projectId = pId;
      //pId++;
      // if (pId === 10000000) {
      //   pId = 1;
      // }
      const cutoffAmount = parseInt(faker.commerce.price());
      const name = faker.company.bsNoun();
      const description = faker.lorem.sentence();
      // each level includes 1 to 3 things
      const numIncludes = 1 + Math.floor(Math.random() * 3);
      const includesArray = [];
      for (let k = 0; k < numIncludes; k++) {
        includesArray.push(faker.lorem.words());
      }
      const estimatedDelivery = faker.date.future().toISOString();
      // let estimatedDelivery = moment(faker.date.future()).format('MM/DD/YYYY h:mm:ss a');
      const shipsTo = faker.address.country();
      const numberOfBackers = Math.floor(Math.random() * 100);
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
      const includes = { includes: includesArray };
      const tempLevel = `${id}|${cutoffAmount}|${name}|${description}|${JSON.stringify(includes)}|${estimatedDelivery}|${shipsTo}|${numberOfBackers}|${maxBackers}|${projectId}`;
      tempLevels.push(tempLevel);
      if (i % 1000 === 0) {
        fs.appendFileSync(levelsFile, `${tempLevels.join('\n')}\n`);
        tempLevels = [];
        process.stdout.write('.');
        if (i % 10000 === 0) {
          console.log(i);
        }
      }
    
      let pledges = [];
      for (let k = 1; k <= 50; k++) {
        let id = k;
        const userId = 1 + Math.floor(Math.random() * 15000000);
        // let username = faker.internet.userName() + i;
        // let numProjects = 1 + Math.floor(Math.random() * 7);
        // let tempProjectsBacked = [];
        // for (let j = 0; j < numProjects; j++) {
        //   let tempProjects = {};
        const backedAmount = parseInt(faker.commerce.price());
        // const projectId = 1 + Math.floor(Math.random() * 10000000);
        // const levelId = 1 + Math.floor(Math.random() * 90989249);
        // tempProjectsBacked.push(tempProjects);
        // }
        // let tempObj = {'tempProjectsBacked': tempProjectsBacked}
        let projectId = pId;
        const pledge = `${id}|${userId}|${backedAmount}|${projectId}|${levelId}`;
        pledges.push(pledge);
  
        if (i % 1000 === 0) {
          fs.appendFileSync('pledges.txt', `${pledges.join('\n')}\n`);
          pledges = [];
          process.stdout.write('.');
          if (i % 10000 === 0) {
            console.log(i);
          }
        }
      }
    
    
    }
  }
}


// let levelsFile = 'levels' + Math.floor(Math.random() * 1000) + '.txt';


// function createLevels() {
//   let tempLevels = [];
//   let levelId = 87738500;
//   let pId = 1;

//   for (let i = 1; i <= 500000; i++) {

//     let projectNumberOfBackers = 0;
//     let numLevels = 3 + Math.floor(Math.random() * 8);

//     for (let j = 0; j < numLevels; j++) {
//       let id = levelId;
//       levelId++;
//       let projectId = pId;
//       pId++;
//       if (pId === 10000000) {
//         pId = 1;
//       }
//       let cutoffAmount = parseInt(faker.commerce.price());
//       let name = faker.company.bsNoun();
//       let description = faker.lorem.sentence();
//       // each level includes 1 to 3 things
//       let numIncludes = 1 + Math.floor(Math.random() * 3);
//       let includesArray = [];
//       for (let k = 0; k < numIncludes; k++) {
//         includesArray.push(faker.lorem.words());
//       }
//       let estimatedDelivery = faker.date.future().toISOString();
//       // let estimatedDelivery = moment(faker.date.future()).format('MM/DD/YYYY h:mm:ss a');
//       let shipsTo = faker.address.country();
//       let numberOfBackers = Math.floor(Math.random() * 100);
//       projectNumberOfBackers += numberOfBackers;
//       let maxBackers;
//       if (Math.random() < 0.10) {
//         maxBackers = numberOfBackers;
//       } else {
//         let continueMaxBackersSearch = true;
//         while (continueMaxBackersSearch) {
//           maxBackers = Math.floor(Math.random() * 101);
//           if (maxBackers > numberOfBackers) {
//             continueMaxBackersSearch = false;
//           }
//         }
//       }
//       let includes = {'includes': includesArray};
//       const tempLevel = `${id}|${cutoffAmount}|${name}|${description}|${JSON.stringify(includes)}|${estimatedDelivery}|${shipsTo}|${numberOfBackers}|${maxBackers}|${projectId}`;
//       tempLevels.push(tempLevel);
//     }

//     if (i % 1000 === 0) {
//       fs.appendFileSync(levelsFile, `${tempLevels.join('\n')}\n`);
//       tempLevels = [];
//       process.stdout.write('.');
//       if (i % 10000 === 0) {
//         console.log(i);
//       }
//     }
//   }
// };


// let userFile = 'users' + Math.floor(Math.random() * 1000) + '.txt';


// function createPledges() {
//   let pledges = [];
//   for (let i = 1; i <= 15000000; i++) {
//     const id = i;
//     const userId = 1 + Math.floor(Math.random() * 15000000);
//     // let username = faker.internet.userName() + i;
//     // let numProjects = 1 + Math.floor(Math.random() * 7);
//     // let tempProjectsBacked = [];
//     // for (let j = 0; j < numProjects; j++) {
//     //   let tempProjects = {};
//     const backedAmount = parseInt(faker.commerce.price());
//     const projectId = 1 + Math.floor(Math.random() * 10000000);
//     const levelId = 1 + Math.floor(Math.random() * 90989249);
//     // tempProjectsBacked.push(tempProjects);
//     // }
//     // let tempObj = {'tempProjectsBacked': tempProjectsBacked}
//     const pledge = `${id}|${userId}|${backedAmount}|${projectId}|${levelId}`;
//     pledges.push(pledge);

//     if (i % 1000 === 0) {
//       fs.appendFileSync('pledges.txt', `${pledges.join('\n')}\n`);
//       pledges = [];
//       process.stdout.write('.');
//       if (i % 10000 === 0) {
//         console.log(i);
//       }
//     }
//   }
// }

console.log('Creating Projects');
createProjects();
// console.log('Creating Pledges');
// createPledges();
// console.log('Creating levels');
// createLevels();
console.log('done');

