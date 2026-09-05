# 3. Longest Substring Without Repeating Characters

## 🧩 Problem

Given a string `s`, find the length of the **longest substring** that contains no repeating characters.

A substring must contain characters that are **continuous**.

### Examples

```text
Input:  "abcabcbb"
Output: 3

Explanation:
The longest substring without repeating characters is "abc".
```

```text
Input:  "bbbbb"
Output: 1

Explanation:
The longest substring without repeating characters is "b".
```

```text
Input:  "pwwkew"
Output: 3

Explanation:
The longest substring without repeating characters is "wke".
```

## 💭 My Approach

When I first looked at this problem, the main question was:

> How can I keep track of a substring while making sure that no character appears twice?

The important word here is **substring**.

A substring has to be **continuous**.

For example:

```text
"pwwkew"
```

`"wke"` is a valid substring because the characters are next to each other.

But `"pwke"` is **not** a substring because we skipped characters.

So instead of checking every possible substring, I decided to maintain a window that always contains unique characters.

This is where the **Sliding Window** technique comes in.

## 🪟 Sliding Window

I used two pointers:

```text
left
 ↓
[a b c]
      ↑
      i
```

The range from `left` to `i` represents my current substring/window.

As `i` moves forward, the window grows.

If a duplicate character appears, I move `left` forward until the duplicate is no longer inside the window.

The basic idea becomes:

```text
Expand the window → duplicate appears → move left → continue
```

## 🗺️ Why I Used a Map

I used JavaScript's `Map` to remember the last index where each character appeared.

For example:

```javascript
map.set("a", 0);
map.set("b", 1);
map.set("c", 2);
```

The Map conceptually looks like:

```text
a → 0
b → 1
c → 2
```

This is important because when I find a duplicate, I need to know:

> Where did this character appear previously?

Then I can move `left` to the correct position.

## 🚶 Let's Walk Through "abb"

Consider:

```text
s = "abb"

index:
0 1 2

char:
a b b
```

### Step 1 — a

We start with:

```text
left = 0
i = 0
```

The current window is:

```text
[a]
```

No duplicate exists.

So:

```text
current length = 1
maxLength = 1
```

And we store:

```text
a → 0
```

### Step 2 — b

Now:

```text
i = 1
```

The character is `b`.

It is not already inside our current window.

So we expand:

```text
[a b]
```

Now:

```text
current length = 2
maxLength = 2
```

And store:

```text
b → 1
```

At this point, our longest substring is:

```text
"ab"
```

### Step 3 — Another b

Now:

```text
i = 2
```

The string looks like:

```text
a b b
0 1 2
```

We already saw `b` at index 1.

So if we keep the current window:

```text
[a b b]
```

we have a duplicate.

That's not allowed.

So we move `left` to one position after the previous `b`.

The previous `b` was at:

```text
index = 1
```

Therefore:

```text
left = 2
```

Now our current window becomes:

```text
[b]
```

Notice something important:

The answer did **NOT** become 1.

We already found:

```text
"ab" → length 2
```

So we keep `maxLength = 2`.

The current window is only:

```text
"b" → length 1
```

but the maximum we have seen so far is still:

```text
2
```

This distinction between **current window length** and **maximum length found so far** is one of the most important parts of the solution.

## 🔥 An Important Problem I Faced

While solving the problem, I initially thought that when a duplicate appeared, I could simply do something like:

```text
left = previousIndex
```

But that is **not correct**.

If the duplicate is at index 1, then the duplicate itself must be removed from the current window.

So `left` needs to move **after** the duplicate:

```text
previousIndex + 1
```

For example:

```text
a b b
0 1 2
  ↑
old b
```

After detecting the duplicate:

```text
a b b
0 1 2
    ↑
   left
```

The old `b` is now outside the window.

## ⚠️ Another Important Case: "abba"

The example `"abba"` helped me understand another important rule.

```text
a b b a
0 1 2 3
```

When the second `b` appears:

```text
left → 2
```

So the current window becomes:

```text
"ba"
```

Then when `a` appears again at index 3, its previous index is 0.

But `left` is already 2.

That means the old `a` is already outside the current window.

So we must **NOT** move `left` backwards.

This gives us an important rule:

> `left` should never move backward.

It can only stay where it is or move forward.

This prevents us from accidentally bringing duplicate characters back into our current window.

## 🧠 Final Logic

For every character:

1. Move `i` forward through the string.
2. Check whether the character already exists in the Map.
3. If it is a duplicate:
   - Find its previous index.
   - Move `left` after that previous occurrence.
   - Make sure `left` never moves backward.
4. Update the character's latest index in the Map.
5. Calculate the current window length.
6. Compare it with `maxLength`.
7. Keep the larger value.

Conceptually:

```text
Map:
character → latest index

Window:
[left ... i]

Current length:
i - left + 1

Answer:
maximum current window length
```

## 💻 JavaScript Solution

```javascript
var lengthOfLongestSubstring = function (s) {
    if (!s) return 0;

    if (s.length === 1) return 1;

    const map = new Map();

    let maxLength = 0;
    let left = 0;

    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            left = Math.max(left, map.get(s[i]) + 1);
        }

        map.set(s[i], i);

        const currentLength = i - left + 1;

        maxLength = Math.max(maxLength, currentLength);
    }

    return maxLength;
};
```

## ⏱️ Complexity

### Time Complexity

```text
O(n)
```

We traverse the string only once.

Even though `left` moves forward, it never moves backward, so the overall work remains linear.

### Space Complexity

```text
O(k)
```

Where `k` is the number of unique characters stored in the Map.

For the given character set, this is effectively bounded by the number of possible characters.

## 🎯 Key Takeaways

The main concepts I learned from this problem were:

- A substring must be continuous.
- A Sliding Window is useful when working with continuous ranges.
- `left` represents the beginning of the current window.
- `i` represents the end of the current window.
- A Map can store the last index of each character.
- When a duplicate appears, move `left` after its previous occurrence.
- `left` must never move backward.
- `currentLength` and `maxLength` are two different things.
- We don't throw away the previous maximum just because the current window becomes smaller.

## 🚀 Final Thought

The biggest lesson from this problem was understanding that we don't need to restart the search whenever a duplicate appears.

Instead, we maintain a window:

```text
Expand → Duplicate → Move left → Continue
```

That simple idea turns what could be an expensive brute-force solution into an efficient:

```text
O(n)
```

solution using the **Sliding Window + Hash Map** technique.