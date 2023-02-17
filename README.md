# js-tools

Useful and reusable JS for any occasion.

---

### estimateTimeRemaining.js:

##### USAGE:

If you are tired of guessing how much time left to complete a series of async calls or want to if you want to know an avarate latensy.

Self containing function with cache.
Trigger every time the operation is completed:

```
estimateTime(totalOperations:Number ,completedOperations:Number, sampleSize:Number)
```

##### OUTPUT:

```
{
    hrTime: XX days XX hours XX minutes XX  seconds,
    secondsRemaining: Number,
    avgOperationLengthMS: Number,
    accurate: Boolean
}
```
