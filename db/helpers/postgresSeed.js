const faker = require('faker');
const fs = require('fs');

let projectId = 1;
let levelId = 1;
let pledgeId = 1;

// generating ramdom unique number betweem 1 and limit
const randomUniqueGenerator = (limit) => {
  const arr = [];
  while (arr.length < 1) {
    const randomnumber = Math.floor(Math.random() * limit) + 1;
    if (arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;
  }
  return arr[0];
};

function createProjects() {
  const projects = [];

  // generate Project 10M
  for (let i = 1; i <= 10000000; i++) {
    const id = projectId;

    const aboutInfo = faker.lorem.paragraph();
    const numberOfBackers = Math.floor(Math.random() * 100);

    const tempProject = `${id}|${aboutInfo}|${numberOfBackers}`;
    projects.push(tempProject);

    // if (i % 1000 === 0) {
    // fs.appendFileSync('projects.txt', `${projects.join('\n')}\n`);
    // projects = [];
    // process.stdout.write('.');
    // if (i % 10000 === 0) {
    //   console.log(i);
    // }
    // }

    // generate levels of pledges
    let tempLevels = [];
    let projectNumberOfBackers = 0;
    const numLevels = 3 + Math.floor(Math.random() * 8);

    for (let j = 0; j < numLevels; j++) {
      const id = levelId;

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

      if (i % 1000 === 0) {
        fs.appendFileSync('levels.txt', `${tempLevels.join('\n')}\n`);
        tempLevels = [];
        process.stdout.write('.');
        if (i % 10000 === 0) {
          console.log(i);
        }
      }

      let pledges = [];
      const pledgeRandom = 1 + Math.floor(Math.random() * 3);

      for (let k = 0; k <= pledgeRandom; k++) {
        const id = pledgeId;

        const userId = 1 + Math.floor(Math.random() * 10000000);
        const backedAmount = parseInt(faker.commerce.price());

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
        pledgeId++;
      }
      levelId++;
    }
    projectId++;
  }
}


console.log('Creating Projects');
createProjects();
// console.log('Creating Pledges');
// createPledges();
// console.log('Creating levels');
// createLevels();
console.log('done');
