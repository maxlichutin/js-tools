/* 
USAGE:
Trigger every time the operation is completed
    estimateTime(totalOperations, completedOperations, sampleSize)

OUTPUT:
      hrTime: XX minutes,
      secondsRemaining: Number,
      avgOperationLengthMS: Number,
      accurate: Boolean
*/

const ETR = function () {
  let cache = {
    timeStamp: [],
    timeMS: [],
  };

  return function (totalOperations, completedOperations, sampleSize) {
    const opersRemaining = totalOperations - completedOperations;

    // sampleSize, min 10 count, or 10% of total
    let maxSamples = sampleSize
      ? sampleSize
      : Math.min(Math.floor(totalOperations / 10), 10);

    // calculate time for each cycle
    cache.timeStamp.push(new Date());
    cache.timeMS = [];
    for (let index = cache.timeStamp.length; index > 0; index--) {
      let ms = cache.timeStamp[index] - cache.timeStamp[index - 1];
      if (!isNaN(ms)) {
        cache.timeMS.push(ms);
      }
    }

    // remove extra elemets
    if (cache.timeStamp.length > maxSamples) {
      cache.timeStamp.splice(0, 1);
    }

    // calculate avarage
    let sumMS = cache.timeMS.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const avgOperationLengthMS = Math.floor(sumMS / maxSamples);
    const secRemainig = Math.floor(
      (opersRemaining * avgOperationLengthMS) / 1000
    );

    const d = Math.floor(secRemainig / (3600 * 24));
    const h = Math.floor((secRemainig % (3600 * 24)) / 3600);
    const m = Math.floor((secRemainig % 3600) / 60);
    const s = Math.floor(secRemainig % 60);

    const dShow = d > 0 ? `${d} ${d === 1 ? "day" : "days"} ` : "";
    const hShow = h > 0 ? `${h} ${h === 1 ? "hour" : "hours"} ` : "";
    const mShow = m > 0 ? `${m} ${m === 1 ? "minute" : "minutes"} ` : "";
    const sShow = s > 0 ? `${s} ${s === 1 ? "second" : "seconds"}` : "";

    return {
      hrTime: `${dShow}${hShow}${mShow}${sShow}`,
      secondsRemaining: secRemainig,
      avgOperationLengthMS: avgOperationLengthMS,
      accurate: cache.timeStamp.length === maxSamples ? true : false,
    };
  };
};
const estimateTime = ETR();


/* ASYNC FUNCTION EMULATOR */
let totalOperations = 100;
let completedOperations = 0;

// async function representation
let go = function () {
  setTimeout(function () {
    completedOperations++;
    process.stdout.moveCursor(0, -2); // moving two lines up
    process.stdout.cursorTo(0); // then getting cursor at the begining of the line
    process.stdout.clearScreenDown(); // clearing whatever is next or down to cursor

    let remainig = estimateTime(totalOperations, completedOperations);

    process.stdout.write(
      `Remaining count: ${totalOperations - completedOperations}\n`
    );
    process.stdout.write(
      `Remainig time: ${!remainig.accurate ? "appx." : ""} ${
        remainig.hrTime
      } \n`
    );
    process.stdout.write(
      `Avarage operation: ${remainig.avgOperationLengthMS}ms.`
    );

    clearTimeout(go);
    if (totalOperations - completedOperations > 0) {
      go();
    }
  }, Math.random() * 3000);
};

process.stdout.write("\n\n");
go();
