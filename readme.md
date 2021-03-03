# fs.promises is slow

```
readFileSync x 31,592 ops/sec ±5.81% (75 runs sampled)
readFile x 14,390 ops/sec ±5.87% (74 runs sampled)
promises.readFile x 9,193 ops/sec ±3.23% (81 runs sampled)
readFile promisifed x 12,880 ops/sec ±9.60% (74 runs sampled)
Fastest is readFileSync
Slowest is promises.readFile
```
