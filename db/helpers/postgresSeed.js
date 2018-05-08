const faker = require('faker');
const fs = require('fs');

let projects = [];
let projectId = 1;

let tempLevels = [];
let levelId = 1;

let pledges = [];
let pledgeId = 1;


function createProjects() {
  // generate 10M projects
  for (let i = 1; i <= 10000000; i++) {
    const id = projectId;

    const aboutInfo = faker.lorem.paragraph();
    const numberOfBackers = Math.floor(Math.random() * 100);

    const tempProject = `${id}|${aboutInfo}|${numberOfBackers}`;
    projects.push(tempProject);

    if (projectId % 100000 === 0) {
      fs.appendFileSync('projects.txt', `${projects.join('\n')}\n`);
      projects = [];
      if (projectId % 100000 === 0) {
        console.log('project: ', projectId);
      }
    }

    // generate pledge level for each project
    let projectNumberOfBackers = 0;

    // each project has 3 to 10 pledge levels
    const numLevels = 3 + Math.floor(Math.random() * 8);

    for (let j = 0; j < numLevels; j++) {
      const id = levelId;

      const cutoffAmount = 10 + Math.floor(Math.random() * 1000);
      const name = faker.company.bsNoun();
      const description = faker.lorem.sentence();
      // each level includes 1 to 3 options
      const numIncludes = 1 + Math.floor(Math.random() * 3);
      const includesArray = [];
      for (let k = 0; k < numIncludes; k++) {
        includesArray.push(faker.lorem.words());
      }
      const estimatedDelivery = faker.date.future().toISOString();
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
      const tempLevel = `${id}|${projectId}|${cutoffAmount}|${name}|${description}|${JSON.stringify(includes)}|${estimatedDelivery}|${shipsTo}|${numberOfBackers}|${maxBackers}`;
      tempLevels.push(tempLevel);


      if (levelId % 100000 === 0) {
        fs.appendFileSync('levels11.txt', `${tempLevels.join('\n')}\n`);
        tempLevels = [];
        if (levelId % 100000 === 0) {
          console.log('level: ', levelId);
        }
      }

      // generate pledge for each project's pledge level
      // each level can have 1 to 3 pledges
      const pledgeRandom = 1 + Math.floor(Math.random() * 3);

      for (let k = 0; k <= pledgeRandom; k++) {
        const id = pledgeId;
        const userId = 1 + Math.floor(Math.random() * 10000000);
        const backedAmount = 10 + Math.floor(Math.random() * 1000);

        const pledge = `${id}|${userId}|${backedAmount}|${projectId}|${levelId}`;
        pledges.push(pledge);

        if (pledgeId % 100000 === 0) {
          fs.appendFileSync('pledges11.txt', `${pledges.join('\n')}\n`);
          pledges = [];
        }
        if (pledgeId % 100000 === 0) {
          console.log('pledge: ', pledgeId);
        }
        pledgeId++;
      }
      levelId++;
    }
    projectId++;
  }
}


console.time('Seeding');
createProjects();
console.log('done');
console.timeEnd('Seeding');

