const testCase1 = {
  time: 7,
  earnings: 3000,
};
const testCase2 = {
  time: 8,
  earnings: 4500,
};
const testCase3 = {
  time: 13,
  earnings: 16500,
};

const establishments = [
  { name: "T", devTime: 5, earning: 1500 },
  { name: "P", devTime: 4, earning: 1000 },
  { name: "C", devTime: 10, earning: 3000 },
];

function getBusinessDetails(details) {
  let result = [];
  let resMap = new Map([
    ["T", 0],
    ["P", 0],
    ["C", 0],
  ]);

  let recordedDevTime = 0;
  let totalRunTime = 0;
  let totalEarning = 0;
  let remainingDevTime = 0;
  let remainingEarning = 0;
  establishments.forEach((est) => {
    remainingDevTime = details.time - recordedDevTime;
    if (est.devTime < remainingDevTime) {
      const numberOfBuildings = parseInt(details.time / est.devTime);
      remainingEarning = details.earnings - totalEarning;

      for (let j = 0; j < numberOfBuildings; j++) {
        let runtime = remainingDevTime - (recordedDevTime + est.devTime);
        recordedDevTime += est.devTime;
        totalRunTime += runtime;
      }

      totalEarning = totalRunTime * est.earning;
      if (totalEarning === remainingEarning) {
        resMap.set(est.name, numberOfBuildings);
        result.push(Object.fromEntries(resMap));

        resMap.forEach((value, key) => resMap.set(key, 0));
        recordedDevTime=0;
        totalRunTime = 0;
        totalEarning = 0;
      } else if(totalEarning < details.earnings){
        resMap.set(est.name, numberOfBuildings);
      }
    }
  });
  return result;
}

console.log(getBusinessDetails(testCase1));
console.log(getBusinessDetails(testCase2));
console.log(getBusinessDetails(testCase3));
