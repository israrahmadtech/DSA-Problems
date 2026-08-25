# Two Sum II - Input Array Is Sorted

## 📌 Problem

Given a **1-indexed sorted array** of integers `numbers` and an integer `target`, find two different numbers whose sum is equal to the target.

Return their indices as `[index1, index2]`.

The returned indices must be **1-indexed**, not JavaScript's default 0-indexed positions.

### Example

    numbers = [2, 7, 11, 15];
    target = 9;

Output:

    [1, 2]

Because:

    2 + 7 = 9

---

# 🧠 Understanding the Important Constraints

This problem gives us two very important clues.

## 1. The Array Is Already Sorted

For example:

    [2, 3, 4, 7, 11, 15]

The numbers are arranged from smaller to larger.

This means we can use the sorted order to make smarter decisions instead of checking every possible pair.

## 2. Only Constant Extra Space Is Allowed

We cannot use a `Map` or an `Object` like we did in the previous Two Sum problem.

For example:

    const map = new Map();

This would require extra space.

Instead, we need to solve the problem using only a few variables.

This gives us an important hint:

> Since the array is already sorted, can we use two pointers instead of storing values in a Map?

The answer is yes.

---

# 🚀 Step 1: Start with Two Pointers

We start with two pointers.

The first pointer starts at the beginning:

    let i = 0;

The second pointer starts at the end:

    let j = numbers.length - 1;

Example:

    [2, 3, 4, 7, 11, 15]
     ↑                 ↑
     i                 j

Then we calculate:

    numbers[i] + numbers[j];

---

# 🔍 Step 2: Compare the Sum with the Target

There are three possible cases.

## Case 1: Sum Equals the Target

    sum === target

We found the answer.

Since the problem requires **1-indexed positions**, we return:

    [i + 1, j + 1]

For example:

    JavaScript Index:  0   1   2   3
    Array:           [2,  7, 11, 15]

    LeetCode Index:    1   2   3   4

So if JavaScript finds indices `[0, 1]`, we return:

    [1, 2]

---

## Case 2: Sum Is Greater Than the Target

    sum > target

The sum is too large.

Since the array is sorted, the right pointer contains the larger number.

So we move the right pointer one step to the left:

    j--;

### Example

    numbers = [2, 3, 4, 7, 11, 15]
               ↑                 ↑
               i                 j

    target = 9

    2 + 15 = 17

`17` is greater than `9`.

We need a smaller number.

Therefore:

    j--;

Now:

    [2, 3, 4, 7, 11, 15]
     ↑              ↑
     i              j

The left pointer stays in the same position.

Only the right pointer moves.

---

## Case 3: Sum Is Less Than the Target

    sum < target

The sum is too small.

Since the array is sorted, the left pointer contains the smaller number.

To increase the sum, we move the left pointer one step to the right:

    i++;

### Example

    numbers = [2, 3, 4, 7, 11, 15]
               ↑        ↑
               i        j

    target = 13

    2 + 7 = 9

`9` is smaller than `13`.

We need a larger number.

Therefore:

    i++;

Now:

    [2, 3, 4, 7, 11, 15]
        ↑     ↑
        i     j

The right pointer stays where it is.

Only the left pointer moves.

---

# 🧩 My Initial Thinking

At first, I was thinking about whether the two values or pointers needed to be swapped.

However, swapping is not required.

The array is already sorted.

We simply move the pointers based on the current sum:

    sum === target
            ↓
        Return answer

    sum > target
            ↓
     Move right pointer left
            ↓
            j--

    sum < target
            ↓
     Move left pointer right
            ↓
            i++

The pointers keep moving toward each other until the correct pair is found.

---

# 💻 Final Solution

    var twoSum = function(numbers, target) {

        let sum;

        let i = 0;

        let j = numbers.length - 1;

        while (i < j) {

            sum = numbers[i] + numbers[j];

            if (sum === target) {

                return [i + 1, j + 1];

            }

            else if (sum > target) {

                --j;

            }

            else {

                ++i;

            }

        }

    };

---

# 🔄 Step-by-Step Example

Let's trace the algorithm.

### Input

    numbers = [2, 7, 11, 15];
    target = 9;

Initial pointers:

    [2, 7, 11, 15]
     ↑           ↑
     i           j

Calculate:

    2 + 15 = 17

Since:

    17 > 9

Move the right pointer:

    j--;

Now:

    [2, 7, 11, 15]
     ↑       ↑
     i       j

Calculate:

    2 + 11 = 13

Since:

    13 > 9

Move the right pointer again:

    j--;

Now:

    [2, 7, 11, 15]
     ↑   ↑
     i   j

Calculate:

    2 + 7 = 9

The sum matches the target.

JavaScript indices are:

    i = 0
    j = 1

But the problem requires 1-indexed positions.

Therefore:

    [0 + 1, 1 + 1]

Final answer:

    [1, 2]

---

# 🧪 Test Cases

## Test Case 1

    console.log(twoSum([2, 7, 11, 15], 9));

Output:

    [1, 2]

Because:

    2 + 7 = 9

---

## Test Case 2

    console.log(twoSum([2, 3, 4], 6));

Output:

    [1, 3]

Because:

    2 + 4 = 6

---

## Test Case 3

    console.log(twoSum([-1, 0], -1));

Output:

    [1, 2]

Because:

    -1 + 0 = -1

---

# ⏱️ Time Complexity

    O(n)

Even though there are two pointers, each pointer only moves in one direction.

The left pointer:

    0 → 1 → 2 → ...

The right pointer:

    n → n - 1 → n - 2 → ...

Therefore, we do not check every possible pair.

This is much better than the brute-force approach.

---

# 💾 Space Complexity

    O(1)

We only use a few variables:

    let sum;
    let i = 0;
    let j = numbers.length - 1;

The amount of extra memory does not increase as the input array gets larger.

Therefore, the solution uses constant extra space.

---

# 📊 Comparison with the Previous Two Sum Problem

| Problem | Array Type | Best Approach | Time | Extra Space |
|---|---|---|---|---|
| Two Sum | Unsorted | Hash Map | `O(n)` | `O(n)` |
| Two Sum II | Sorted | Two Pointers | `O(n)` | `O(1)` |

In the previous problem, we needed a `Map` because the array was not sorted.

In this problem, the array is already sorted.

That sorted order allows us to avoid using extra memory and solve the problem with two pointers.

---

# 🎯 What I Learned

This problem taught me an important lesson:

> Always pay attention to the constraints and special properties of the input.

The fact that the array was already sorted was the biggest clue.

Instead of using:

    Nested Loops → O(n²)

or:

    Hash Map → O(n) time + O(n) space

we can use:

    Two Pointers → O(n) time + O(1) space

My problem-solving journey was:

    Understand the problem
            ↓
    Notice that the array is sorted
            ↓
    Understand the 1-indexed requirement
            ↓
    Notice that constant extra space is required
            ↓
    Avoid using a Map
            ↓
    Use a left and right pointer
            ↓
    Move the correct pointer based on the sum
            ↓
    Return the 1-indexed positions

## Final Complexity

    Time Complexity:  O(n)
    Space Complexity: O(1)

This is the optimal approach for this problem.

---

# 🔥 Key Pattern Learned

    Sorted Array + Target Sum
            ↓
    Think About Two Pointers