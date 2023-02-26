# collatz-optimization

Brute-force test optimizations for the Collatz conjecture implemented in NodeJS.

The optimized test saves about 90% time for about 18.6MB of memory/storage use. This space-time tradeoff can be infinitely expanded. At this point, however, it would make sense to implement the same logic in a lower level language, add some lookup tables/indexing, and multi-thread it.

---
### Background

[Intro video to conjecture](https://www.youtube.com/watch?v=094y1Z2wpJg) by Veritasium on Youtube. It provides a good summary of the problem and state of the art as of 2021.

This conjecture probably doesn't have real-world utility, but the strategy below may be useful in cryptography or computational chemistry/biology.

---
### Usage

The optimized test `opt` goes above the test limit specified. You can run it first to figure out what number to specify for the `control` test.
```
PS C:\projects\collatz> node opt 1000000000
saving time by only testing 1.03% of natural numbers
time to brute force test up to 1,006,632,959:  2647ms
PS C:\projects\collatz> node control 1006632959    
time to brute force test up to 1,006,632,959:  25372ms
```

---

### Strategy

Both the control and optimized test iterate through natural numbers in increasing order. When the sequence for a given starting number falls below the starting number, the iteration is cut short, as we have already resolved the rest of the sequence to a 4-2-1 loop.

Additionally, both tests only test a subset of numbers. The control test only tests odd numbers. The optimized test only tests ~1% of numbers. More details in the next section.

Finally, both tests use shortcut computations. The control test uses the well-known `(3n+1)/2` shortcut when it encounters an odd number. The optimized test uses additional shortcuts, which can be found in `opt.js`.

---

### Optimizations

In addition to skipping even numbers, which always resolve to a smaller number in a known, finite number of steps, we can use the same reasoning to skip a 90+% of odd numbers.

For example any starting number n where `n%4 === 1` will always resolve to a smaller number in 3 steps:

```
1. n%4 === 1 (odd, 3x + 1)
2. n%4 === 0 (even, divide by 2)
3. n%2 === 0 (even divide by 2)
4. unknown modular logic, but this number will always be 3/4ths the original.
```

`exclusion-finder.js` is used to find additional patterns in bulk and save them to `exclusion-tier.txt`.

These exclusion tiers are copy-pasted into `inclusion-array.js` and processed to generate an inclusion array (stored in inclusions.txt).

Then, `opt.js` reads inclusions.txt for the test loop.

---
### Note

By default, the logic in the included code excludes multiples of 3 in the inclusion array. This is so that we can only test for infinite loops. Comment the `i%3` check to also test for sequences that go off to infinity.

The reason multiples of 3 are excluded when looking for loops is because after the starting number, the numbers in the sequence can never be divisble by 3. Therefore, a sequence can never come back to the starting number if the starting number is divisible by 3.

---

### Future work

I don't have plans to continue optimizing this test, but would like to use this strategy on a similar problem that has financial or social utility.
