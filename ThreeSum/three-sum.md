# 3Sum - LeetCode Problem #15

## 📌 Problem

Given an integer array `nums`, return all the unique triplets:

    [nums[i], nums[j], nums[k]]

Such that:

    i != j
    i != k
    j != k

And:

    nums[i] + nums[j] + nums[k] === 0

The result must not contain duplicate triplets.

---

# 🧠 Example

Input:

    nums = [-1, 0, 1, 2, -1, -4]

Output:

    [
        [-1, -1, 2],
        [-1, 0, 1]
    ]

Because:

    -1 + -1 + 2 = 0

And:

    -1 + 0 + 1 = 0

Even though there are multiple ways to encounter the same values, the final result must contain only unique triplets.

---

# 🎯 How I Approached This Problem

I did not directly start with the final solution.

I solved this problem step by step by connecting it with the concepts I learned from the previous problems:

    Two Sum
        ↓
    Two Sum II
        ↓
    3Sum

In Two Sum, we had to find two numbers.

In 3Sum, we need to find three numbers.

My first idea was to use three pointers:

    i → First number
    j → Second number
    k → Third number

However, simply moving all three pointers was not enough.

The important idea was to fix one number and use the Two Pointers technique to find the remaining two numbers.

---

# 🔍 Step 1: Sort the Array

The original input is:

    [-1, 0, 1, 2, -1, -4]

This array is not sorted.

The Two Pointers technique works efficiently when we can take advantage of sorted values.

So the first step is:

    numbers.sort((a, b) => a - b);

After sorting:

    [-4, -1, -1, 0, 1, 2]

Now the numbers are arranged from smallest to largest.

---

# 🔍 Step 2: Fix One Number

We use an outer loop.

The current value at `i` becomes our fixed first number.

Conceptually:

    numbers[i] + numbers[j] + numbers[k] = 0

For every new `i`:

    i = current position
    j = i + 1
    k = last index

For example:

    [-4, -1, -1, 0, 1, 2]
      ↑   ↑              ↑
      i   j              k

The first number is fixed at `i`.

Now we need to find two other numbers using `j` and `k`.

---

# 🔍 Step 3: Use Two Pointers

For every fixed `i`:

    j = i + 1
    k = numbers.length - 1

Then we calculate:

    sum = numbers[i] + numbers[j] + numbers[k]

There are three possible cases.

---

## Case 1: Sum Equals 0

If:

    sum === 0

Then we found a valid triplet.

Example:

    -1 + -1 + 2 = 0

So we save:

    [-1, -1, 2]

After finding a valid triplet, both pointers need to move:

    j++
    k--

This allows us to continue searching for other possible triplets.

---

## Case 2: Sum Is Greater Than 0

If:

    sum > 0

The sum is too large.

Since the array is sorted, `k` is pointing to the larger value.

To reduce the sum:

    k--

We move the right pointer to the left.

---

## Case 3: Sum Is Less Than 0

If:

    sum < 0

The sum is too small.

Since the array is sorted, moving `j` to the right gives us a larger value.

So:

    j++

---

# 🚫 Step 4: Handling Duplicate Values

One of the most important parts of this problem is avoiding duplicate triplets.

For example:

    [-2, 0, 0, 2, 2]

The correct result is:

    [
        [-2, 0, 2]
    ]

Not:

    [
        [-2, 0, 2],
        [-2, 0, 2]
    ]

There are three places where duplicates can happen.

---

# 1️⃣ Skipping Duplicate `i`

Suppose the sorted array is:

    [-4, -1, -1, 0, 1, 2]

Here we have two `-1` values.

If we process both of them as the fixed number, we may generate the same triplet again.

So before processing `i`, we check:

    if (i > 0 && numbers[i] === numbers[i - 1]) {
        continue;
    }

This means:

    If this is not the first element
    AND
    the current value is the same as the previous value

Then skip it.

---

# 2️⃣ Skipping Duplicate `j`

After finding a valid triplet, we move:

    j++

Now the new value at `j` may be the same as the previous value.

We keep moving `j` while it points to a duplicate:

    while (j < k && numbers[j] === numbers[j - 1]) {
        j++;
    }

Using `while` instead of `if` is important.

There can be multiple duplicate values.

For example:

    [0, 0, 0, 0]

We need to keep skipping duplicates until we reach a new value.

---

# 3️⃣ Skipping Duplicate `k`

After finding a valid triplet, we also move:

    k--

Now `k` may point to the same value we just moved away from.

We keep moving `k` while duplicate values exist:

    while (
        j < k &&
        k < numbers.length - 1 &&
        numbers[k] === numbers[k + 1]
    ) {
        k--;
    }

This prevents the same triplet from being added multiple times.

---

# 💻 Final Solution

    function twoSumThree(numbers) {
        numbers.sort((a, b) => a - b);

        let sum;
        let triplets = [];
        let j;
        let k;

        for (let i = 0; i < numbers.length; i++) {
            j = i + 1;
            k = numbers.length - 1;

            if (i > 0 && numbers[i] === numbers[i - 1]) {
                continue;
            }

            while (j < k) {
                sum = numbers[i] + numbers[j] + numbers[k];

                if (sum === 0) {
                    triplets.push([
                        numbers[i],
                        numbers[j],
                        numbers[k]
                    ]);

                    j++;
                    k--;

                    while (
                        j < k &&
                        numbers[j] === numbers[j - 1]
                    ) {
                        j++;
                    }

                    while (
                        j < k &&
                        k < numbers.length - 1 &&
                        numbers[k] === numbers[k + 1]
                    ) {
                        k--;
                    }
                }
                else if (sum > 0) {
                    k--;
                }
                else {
                    j++;
                }
            }
        }

        return triplets;
    }

---

# 🧪 Test Cases

## Test Case 1

    console.log(
        twoSumThree([-1, 0, 1, 2, -1, -4])
    );

Output:

    [
        [-1, -1, 2],
        [-1, 0, 1]
    ]

---

## Test Case 2

    console.log(
        twoSumThree([0, 1, 1])
    );

Output:

    []

Because:

    0 + 1 + 1 = 2

There is no triplet whose sum is `0`.

---

## Test Case 3

    console.log(
        twoSumThree([0, 0, 0])
    );

Output:

    [
        [0, 0, 0]
    ]

Because:

    0 + 0 + 0 = 0

---

## Test Case 4: Duplicate Values

    console.log(
        twoSumThree([-2, 0, 0, 2, 2])
    );

Output:

    [
        [-2, 0, 2]
    ]

Even though there are duplicate `0` and `2` values, the triplet appears only once.

---

# 🔄 Algorithm Flow

The complete logic can be understood like this:

    Unsorted Array
          ↓
    Sort the Array
          ↓
    Loop through every number using i
          ↓
    Skip duplicate i values
          ↓
    j = i + 1
    k = last index
          ↓
    While j < k
          ↓
    Calculate:
    nums[i] + nums[j] + nums[k]
          ↓
    ┌─────────────────────────────┐
    │                             │
    │ sum === 0                   │
    │ → Save triplet              │
    │ → j++                       │
    │ → k--                       │
    │ → Skip duplicate j          │
    │ → Skip duplicate k          │
    │                             │
    ├─────────────────────────────┤
    │                             │
    │ sum > 0                     │
    │ → k--                       │
    │                             │
    ├─────────────────────────────┤
    │                             │
    │ sum < 0                     │
    │ → j++                       │
    │                             │
    └─────────────────────────────┘
          ↓
    Return all unique triplets

---

# ⏱️ Time Complexity

The array is first sorted:

    O(n log n)

Then we loop through the array:

    O(n)

For every `i`, the two pointers `j` and `k` move through the remaining part of the array:

    O(n)

Therefore, the dominant complexity is:

    O(n²)

Final Time Complexity:

    O(n²)

---

# 💾 Space Complexity

Ignoring the output array, the algorithm only uses a few variables:

    sum
    i
    j
    k

Therefore, the auxiliary space complexity is:

    O(1)

The `triplets` array stores the answer, so if output space is counted, the total memory used depends on the number of valid triplets.

Final Auxiliary Space Complexity:

    O(1)

---

# 📊 Comparison With Previous Problems

| Problem | Main Idea | Time Complexity | Extra Space |
|---|---|---|---|
| Two Sum | Nested Loops | O(n²) | O(1) |
| Two Sum | Hash Map | O(n) | O(n) |
| Two Sum II | Two Pointers | O(n) | O(1) |
| 3Sum | Sorting + Two Pointers | O(n²) | O(1) auxiliary |

---

# 🎯 What I Learned

This problem helped me understand how previous patterns can be reused in more complex problems.

My learning journey was:

    Two Sum
        ↓
    Learn Hash Map
        ↓
    Two Sum II
        ↓
    Learn Two Pointers
        ↓
    3Sum
        ↓
    Sort the Array
        ↓
    Fix One Number
        ↓
    Use Two Pointers for the Other Two Numbers
        ↓
    Handle Duplicate Values

The biggest lesson from this problem was:

    When an array is sorted,
    pointer movement can help us avoid checking
    every possible combination.

Instead of checking every possible three-number combination using three nested loops:

    O(n³)

We sort the array and use:

    One fixed pointer + Two Pointers

This improves the solution to:

    O(n²)

---

# 🔥 Key Pattern Learned

    3Sum Problem
         ↓
    Sort the Array
         ↓
    Fix One Value
         ↓
    Use Two Pointers
         ↓
    Skip Duplicates
         ↓
    Return Unique Triplets

## Final Complexity

    Time Complexity: O(n²)
    Space Complexity: O(1) auxiliary space