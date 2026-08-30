# 3Sum Closest - LeetCode Problem #16

## 📌 Problem

Given an integer array `nums` and an integer `target`, find three integers at distinct indices such that their sum is as close as possible to the `target`.

Return the sum of those three integers.

There is guaranteed to be exactly one closest answer.

---

## 🧠 Example

Input:

    nums = [-1, 2, 1, -4]
    target = 1

Possible triplet:

    -1 + 2 + 1 = 2

The difference from the target is:

    |2 - 1| = 1

Therefore, the answer is:

    2

---

# 🚀 My Approach

I approached this problem by building on the ideas I learned from the previous `3Sum` problem.

In `3Sum`, the goal was to find triplets whose sum was exactly `0`.

Here, the goal is different:

    Find the triplet whose sum is closest to target.

I used the same general pattern:

    Sort the Array
          ↓
    Fix one number using i
          ↓
    Use Two Pointers (j and k)
          ↓
    Calculate the current sum
          ↓
    Compare it with the target
          ↓
    Keep track of the closest sum

---

# 🔹 Step 1: Sort the Array

The first step is sorting the array:

    nums.sort((a, b) => a - b);

For example:

    [-1, 2, 1, -4]

becomes:

    [-4, -1, 1, 2]

Sorting is important because it allows us to use the Two Pointers technique.

After sorting:

    j++ → moves toward larger values
    k-- → moves toward smaller values

---

# 🔹 Step 2: Initialize the Closest Sum

We need a variable that stores the best answer found so far.

I initialized it using the first three numbers:

    let closestSum = nums[0] + nums[1] + nums[2];

The meaning of `closestSum` is:

    "The sum that is currently closest to the target."

Whenever we find a better sum, we update `closestSum`.

---

# 🔹 Step 3: Fix One Number

Just like in `3Sum`, we use an outer loop:

    for (let i = 0; i < n - 2; i++)

For every `i`, we fix one number.

Then we use two pointers for the remaining two numbers:

    j = i + 1
    k = n - 1

So we are effectively calculating:

    nums[i] + nums[j] + nums[k]

---

# 🔹 Step 4: Compare the Current Sum With the Target

The most important difference from `3Sum` is that we are not checking:

    sum === 0

Instead, we check how close the current sum is to the target.

The distance is calculated using:

    Math.abs(sum - target)

For example:

    target = 1
    sum = 2

Distance:

    |2 - 1| = 1

If the current sum is closer than our previous `closestSum`, we update it:

    if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
        closestSum = sum;
    }

---

# 🔹 Step 5: Exact Match

If:

    sum === target

then the distance is:

    |sum - target| = 0

Nothing can be closer than an exact match.

Therefore, we immediately return:

    if (sum === target) return sum;

This avoids unnecessary iterations.

---

# 🔹 Step 6: Move the Two Pointers

Because the array is sorted, we can intelligently decide which pointer to move.

If:

    sum > target

the sum is too large.

We need to make it smaller, so:

    k--;

If:

    sum < target

the sum is too small.

We need to make it larger, so:

    j++;

Therefore:

    sum > target → k--
    sum < target → j++

This is the same Two Pointer idea used in `Two Sum II` and `3Sum`.

---

# ⚡ Optimization Journey

After getting the basic `O(n²)` solution working, I looked for ways to reduce unnecessary work.

The final optimized solution uses two additional ideas:

    1. Minimum Possible Sum
    2. Maximum Possible Sum

These allow us to skip parts of the search that cannot possibly produce a better answer.

---

# 🔥 Optimization 1: Minimum Possible Sum

For a fixed `i`, the smallest possible sum is:

    nums[i] + nums[i + 1] + nums[i + 2]

So we calculate:

    const minSum = nums[i] + nums[i + 1] + nums[i + 2];

Because the array is sorted, these are the three smallest available values for this `i`.

Now consider:

    minSum > target

If even the smallest possible sum is already greater than the target, then every other combination for this `i` will also be greater than the target.

Therefore, there is no reason to run the Two Pointer search.

We only compare `minSum` with our current closest answer:

    if (Math.abs(minSum - target) < Math.abs(closestSum - target)) {
        closestSum = minSum;
    }

Then we use:

    break;

---

# ❓ Why `break`?

This is an important optimization.

If:

    minSum > target

then all future `i` values will be even larger because the array is sorted.

Therefore, their minimum possible sums will also be larger.

For example:

    target = 1

If the current minimum possible sum is already:

    5

then moving `i` forward can only make the minimum sum larger:

    5
    6
    7
    8
    ...

So we know that no future `i` can produce a better result.

Therefore:

    break;

completely stops the outer loop.

---

# 🔥 Optimization 2: Maximum Possible Sum

We can also calculate the largest possible sum for the current `i`.

Because `i` is fixed, the two largest remaining numbers are:

    nums[n - 2]
    nums[n - 1]

So:

    const maxSum = nums[i] + nums[n - 2] + nums[n - 1];

This represents the maximum possible sum for the current `i`.

---

# ❓ What if `maxSum < target`?

Suppose:

    target = 10
    maxSum = 6

Even the largest possible sum is only `6`.

Therefore, we cannot reach the target `10` with this `i`.

There is no point running the Two Pointer search.

We compare `maxSum` with the current closest answer:

    if (Math.abs(maxSum - target) < Math.abs(closestSum - target)) {
        closestSum = maxSum;
    }

Then:

    continue;

---

# ❓ Why `continue` Instead of `break`?

This is different from the `minSum` case.

If:

    maxSum < target

we cannot reach the target with the current `i`.

However, when `i` moves forward, the fixed number becomes larger.

That means future `i` values may allow us to get closer to the target.

Therefore, we only skip the current `i`:

    continue;

and move to the next `i`.

---

# 🔥 Optimization 3: Skip Duplicate `i`

Because the array is sorted, duplicate values can appear next to each other.

For example:

    [-4, -1, -1, 0, 1, 2]

If we already processed `-1`, processing the next identical `-1` is unnecessary.

So:

    if (i > 0 && nums[i] === nums[i - 1]) continue;

This avoids repeated work.

---

# 🔥 Optimization 4: Skip Duplicate Two-Pointer Values

After moving `k`:

    k--;

we can skip duplicate values:

    while (j < k && nums[k] === nums[k + 1]) k--;

Similarly, after moving `j`:

    j++;

we skip duplicate values:

    while (j < k && nums[j] === nums[j - 1]) j++;

This prevents repeatedly checking the same values.

This optimization is not required to change the Big-O complexity, but it can reduce unnecessary operations when many duplicate values exist.

---

# 💻 Final Optimized Solution

    var threeSumClosest = function (nums, target) {
        nums.sort((a, b) => a - b);

        const n = nums.length;

        let closestSum = nums[0] + nums[1] + nums[2];

        for (let i = 0; i < n - 2; i++) {

            if (i > 0 && nums[i] === nums[i - 1]) {
                continue;
            }

            const minSum = nums[i] + nums[i + 1] + nums[i + 2];

            if (minSum > target) {

                if (
                    Math.abs(minSum - target) <
                    Math.abs(closestSum - target)
                ) {
                    closestSum = minSum;
                }

                break;
            }

            const maxSum =
                nums[i] + nums[n - 2] + nums[n - 1];

            if (maxSum < target) {

                if (
                    Math.abs(maxSum - target) <
                    Math.abs(closestSum - target)
                ) {
                    closestSum = maxSum;
                }

                continue;
            }

            let j = i + 1;
            let k = n - 1;

            while (j < k) {

                const sum =
                    nums[i] + nums[j] + nums[k];

                if (sum === target) {
                    return sum;
                }

                if (
                    Math.abs(sum - target) <
                    Math.abs(closestSum - target)
                ) {
                    closestSum = sum;
                }

                if (sum > target) {

                    k--;

                    while (
                        j < k &&
                        nums[k] === nums[k + 1]
                    ) {
                        k--;
                    }

                } else {

                    j++;

                    while (
                        j < k &&
                        nums[j] === nums[j - 1]
                    ) {
                        j++;
                    }
                }
            }
        }

        return closestSum;
    };

---

# 🧪 Example

Input:

    nums = [-1, 2, 1, -4]
    target = 1

After sorting:

    [-4, -1, 1, 2]

The closest triplet is:

    -1 + 1 + 2 = 2

Distance from target:

    |2 - 1| = 1

Therefore:

    Output = 2

---

# 📊 Complexity

Sorting takes:

    O(n log n)

The outer loop runs up to:

    O(n)

For every `i`, the two pointers move through the array:

    O(n)

Therefore the overall worst-case time complexity is:

    O(n²)

The algorithm uses only a few variables besides the input array.

Auxiliary Space Complexity:

    O(1)

The sorting implementation may use some internal memory depending on the JavaScript engine, but the algorithm itself uses constant extra space.

---

# 📈 Optimization Summary

My solution evolved like this:

    3Sum Closest
          ↓
    Sort the Array
          ↓
    Fix i
          ↓
    Two Pointers
          ↓
    Track Closest Sum
          ↓
    Exact Target → Return Immediately
          ↓
    Skip Duplicate i
          ↓
    Calculate Minimum Possible Sum
          ↓
    minSum > target → Break
          ↓
    Calculate Maximum Possible Sum
          ↓
    maxSum < target → Continue
          ↓
    Skip Duplicate j and k
          ↓
    Final O(n²) Solution

---

# 🎯 Key Lessons

The most important concepts I learned from this problem were:

1. Sorting can make pointer-based searching possible.

2. The Two Pointer technique can reduce unnecessary combinations.

3. `Math.abs(sum - target)` can be used to measure how close a sum is to the target.

4. An exact target match has a distance of `0`, so we can return immediately.

5. `minSum` can tell us when we should stop searching completely.

6. `maxSum` can tell us when the current `i` cannot reach the target.

7. `break` and `continue` can be used as powerful pruning techniques.

8. Duplicate values can be skipped to reduce unnecessary work.

---

# 🏁 Final Result

Instead of checking every possible combination using three nested loops:

    O(n³)

I used:

    Sorting
        +
    One Fixed Pointer
        +
    Two Pointers
        +
    Closest-Sum Tracking
        +
    Search Pruning

Result:

    Time Complexity: O(n²)
    Auxiliary Space: O(1)

The main improvement was not changing the Big-O complexity from `O(n²)`, but reducing unnecessary iterations through intelligent pruning and early exits.