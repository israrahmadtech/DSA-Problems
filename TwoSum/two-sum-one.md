# Two Sum — My Journey from `O(n²)` to `O(n)`

## Problem

The **Two Sum** problem looks simple at first:

> Given an array of integers and a target, return the indices of two different numbers whose sum is equal to the target.

For example:

```javascript
nums = [2, 7, 11, 15]
target = 9
```

The answer is:

```javascript
[0, 1]
```

Because:

```text
nums[0] + nums[1] = 2 + 7 = 9
```

This README documents my step-by-step journey of solving the problem, including the failed attempts, the brute-force solution, the optimization using an object, and the final implementation using JavaScript's `Map`.

---

# 1. The Beginning: Failed Attempts

My submission history shows that the journey was not successful from the beginning.

I first encountered a **Runtime Error**, followed by several **Wrong Answer** submissions.

After experimenting with the logic and fixing the mistakes, I eventually started getting **Accepted** submissions.

The important part of this process was that I did not stop after getting one working solution. Instead, I kept asking:

> Can this solution be improved?

That question took the solution from checking every possible pair with nested loops to using a hash-based lookup system.

---

# 2. First Working Approach — Brute Force

The first approach was straightforward.

I used two nested loops:

* The first loop selects one number.
* The second loop checks the remaining numbers.
* If the sum of both numbers equals the target, their indices are saved.

```javascript
// Time Complexity: O(n²)
// Space Complexity: O(1)

// const nums = [2, 7, 11, 15]
// const nums = [3, 2, 4]
const nums = [3, 3]

// const target = 9
const target = 6

let result = []

for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
            result = [i, j]
            break
        }
    }
}

console.log(result)
```

## How It Works

For this array:

```text
[2, 7, 11, 15]
```

The algorithm checks pairs like this:

```text
2 + 7
2 + 11
2 + 15

7 + 11
7 + 15

11 + 15
```

Using:

```javascript
let j = i + 1
```

was important because it prevented two problems:

1. The same element could not be used twice.
2. The same pair did not need to be checked again.

For example, after checking:

```text
2 + 7
```

there was no need to later check:

```text
7 + 2
```

## Complexity

The problem with this approach is the nested loop.

For every number, I may need to check many other numbers.

So the time complexity is:

```text
O(n²)
```

The space complexity is:

```text
O(1)
```

This was a correct approach, but it could become slow for larger arrays.

---

# 3. The Main Optimization Idea

Instead of checking every possible pair, I changed my thinking.

For every current number, I asked:

> What number do I need to reach the target?

For example:

```text
Current Number = 2
Target = 9

Required Number = 9 - 2 = 7
```

So instead of searching through the entire array again for every number, I needed a fast way to answer:

> Have I already seen `7`?

This is where extra memory became useful.

I decided to trade:

```text
More Space
```

for:

```text
Less Time
```

---

# 4. Optimizing with a JavaScript Object

The next solution used an object as a lookup table.

The object stored:

```text
Number → Index
```

Here is the code:

```javascript
// Time Complexity: O(n)
// Space Complexity: O(n)

const numbers = [2, 7, 11, 15]
const target2 = 9

const map = {}
let result2

for (let i = 0; i < numbers.length; i++) {
    const complement = target2 - numbers[i]

    if (map[complement] !== undefined) {
        result2 = [map[complement], i]
        break
    }

    map[numbers[i]] = i
}

console.log(result2)
```

## Step-by-Step Example

Input:

```text
numbers = [2, 7, 11, 15]
target = 9
```

### Iteration 1

Current number:

```text
2
```

Calculate the complement:

```text
9 - 2 = 7
```

Check if `7` already exists in the object:

```text
No
```

Store the current number and its index:

```text
{
    2: 0
}
```

---

### Iteration 2

Current number:

```text
7
```

Calculate the complement:

```text
9 - 7 = 2
```

Check if `2` exists:

```text
Yes!
```

The object contains:

```text
2 → index 0
```

The current number is at:

```text
index 1
```

So the answer is:

```javascript
[0, 1]
```

The loop stops immediately.

---

## Why This Is Faster

The old approach was:

```text
For every number
    Check many other numbers
```

The new approach is:

```text
For every number
    Calculate the required complement
    Check whether it already exists
```

The nested loop is gone.

That changes the time complexity from:

```text
O(n²)
```

to:

```text
O(n)
```

The trade-off is that we now use extra memory:

```text
Space Complexity: O(n)
```

---

# 5. Final Version — Using `Map`

The object solution was already `O(n)`, but JavaScript provides a data structure specifically designed for key-value storage:

```javascript
Map
```

So the final version became:

```javascript
// Time Complexity: O(n)
// Space Complexity: O(n)

function twoSum(nums, target) {
    const map = new Map()
    let complement

    for (let i = 0; i < nums.length; i++) {
        complement = target - nums[i]

        if (map.has(complement)) {
            return [map.get(complement), i]
        }

        map.set(nums[i], i)
    }
}

console.log(twoSum([2, 7, 11, 15], 9))
console.log(twoSum([3, 2, 4], 6))
console.log(twoSum([3, 3], 6))
```

## Test Cases

### Test Case 1

```javascript
twoSum([2, 7, 11, 15], 9)
```

Output:

```text
[0, 1]
```

---

### Test Case 2

```javascript
twoSum([3, 2, 4], 6)
```

Output:

```text
[1, 2]
```

Because:

```text
2 + 4 = 6
```

---

### Test Case 3

```javascript
twoSum([3, 3], 6)
```

Output:

```text
[0, 1]
```

This case is important because the values are the same, but they are two different elements at two different indices.

---

# 6. Why `Map`?

The object approach works:

```javascript
const map = {}
```

But `Map` is more explicitly designed for storing key-value pairs.

With `Map`, the code clearly expresses the operations:

```javascript
map.set(key, value)
map.has(key)
map.get(key)
```

For this problem, we are storing:

```text
Number → Index
```

For example:

```text
2 → 0
7 → 1
11 → 2
```

So `Map` makes the intention of the code clearer.

---

# 7. A Small Runtime Optimization

In an earlier version, the complement was declared inside the loop:

```javascript
for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
}
```

In the final version, the variable was declared once outside the loop and assigned a new value during each iteration:

```javascript
let complement

for (let i = 0; i < nums.length; i++) {
    complement = target - nums[i]
}
```

This avoids declaring a new block-scoped variable on every iteration.

However, it is important to note that this does **not** change the algorithm's Big-O complexity.

The complexity remains:

```text
Time: O(n)
Space: O(n)
```

Any improvement shown in an individual LeetCode runtime result is a practical benchmark result and can vary depending on the execution environment and test run.

---

# 8. Final Comparison

| Approach         | Time Complexity | Space Complexity | Idea                                                        |
| ---------------- | --------------: | ---------------: | ----------------------------------------------------------- |
| Nested Loops     |         `O(n²)` |           `O(1)` | Check pairs manually                                        |
| Object Lookup    |          `O(n)` |           `O(n)` | Store number and index                                      |
| JavaScript `Map` |          `O(n)` |           `O(n)` | Faster lookup strategy with a dedicated key-value structure |

---

# What I Learned

This problem taught me an important lesson about optimization.

The first goal is not always to immediately write the most optimized solution.

A better learning process is:

```text
Understand the problem
        ↓
Write a simple working solution
        ↓
Analyze its complexity
        ↓
Find the bottleneck
        ↓
Change the approach
        ↓
Use an appropriate data structure
        ↓
Test edge cases
        ↓
Optimize the implementation where meaningful
```

I started with:

```text
O(n²) time
O(1) space
```

Then I increased the space complexity to:

```text
O(n)
```

in exchange for reducing the time complexity to:

```text
O(n)
```

The biggest optimization was not a small syntax change.

The real optimization came from changing the way I thought about the problem:

> Instead of searching for every possible pair, calculate the number you need and use a lookup structure to find it efficiently.

That is how the Two Sum solution evolved from a brute-force approach into an efficient hash-map-based solution.
