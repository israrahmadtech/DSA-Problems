# LeetCode #2 — Add Two Numbers

## 🧩 Problem

You are given two non-empty linked lists that represent two non-negative integers.

The digits are stored in **reverse order**, and each node contains a single digit.

Add the two numbers and return the sum as a linked list.

### Example

```text
Input:
l1 = [2,4,3]
l2 = [5,6,4]

342 + 465 = 807

Output:
[7,0,8]
```

## 💡 Approach

I solved this problem using Linked List Traversal, a Dummy Node, and a Carry variable.

Because the digits are stored in reverse order, we can add the values from the beginning of both linked lists.

For every step:

1. Get the current value from l1.
2. Get the current value from l2.
3. If one list has ended, treat its value as 0.
4. Add both values along with carry.
5. Calculate the new carry.
6. Create a new node with the current digit.
7. Attach the new node to the result list.
8. Move curr forward.
9. Move l1 and l2 to their next nodes.
10. Continue until both lists are finished and there is no remaining carry.

## 🔑 Key Concepts

### 1. Dummy Node

```javascript
const dummy = new ListNode(0);
```

The dummy node is used as a starting point for the result linked list.

The 0 is only a placeholder and is not part of the final answer.

```text
dummy
  ↓
[0] -> [7] -> [0] -> [8] -> null
```

At the end, we return:

```javascript
return dummy.next;
```

This skips the dummy node and returns the actual result.

### 2. Current Pointer

```javascript
let curr = dummy;
```

curr is used to build the result linked list.

When a new node is created:

```javascript
curr.next = new ListNode(sum % 10);
curr = curr.next;
```

The first line creates and connects the new node.

The second line moves curr to the newly created node.

```text
[0] -> [7] -> [0] -> [8]
              ↑
             curr
```

The dummy pointer stays at the beginning while curr moves forward.

### 3. Carry

```javascript
let carry = 0;
```

carry stores the extra value that needs to be added to the next digit.

For example:

```text
8 + 7 = 15
```

The current digit is:

```text
5
```

And the carry is:

```text
1
```

In code:

```javascript
carry = Math.floor(sum / 10);
```

To get the current digit:

```javascript
sum % 10
```

## 🔄 Handling Different Lengths

One linked list can be shorter than the other.

For example:

```text
l1 = 9 -> 9
l2 = 1
```

When l2 has no node left, we treat its value as 0.

```javascript
const val2 = l2 ? l2.val : 0;
```

Similarly:

```javascript
const val1 = l1 ? l1.val : 0;
```

This allows the algorithm to continue even when one linked list has already ended.

## 🔁 Loop Condition

```javascript
while (l1 || l2 || carry)
```

The loop continues while:

- l1 still has a node
- OR l2 still has a node
- OR there is still a carry

The carry condition is important because the final addition can create an extra digit.

For example:

```text
9 + 1 = 10
```

Result:

```text
[0] -> [1]
```

The second node is created because of the remaining carry.

## 🧮 How Each Addition Works

For every iteration:

```javascript
const val1 = l1 ? l1.val : 0;
const val2 = l2 ? l2.val : 0;

const sum = val1 + val2 + carry;
```

Then:

```javascript
carry = Math.floor(sum / 10);
```

And the current digit is:

```javascript
sum % 10
```

That digit is added to the result:

```javascript
curr.next = new ListNode(sum % 10);
```

## 🚶 Moving Through the Linked Lists

After processing the current nodes:

```javascript
l1 = l1 ? l1.next : null;
l2 = l2 ? l2.next : null;
```

This moves both pointers to their next nodes.

For example:

```text
l1

[2] -> [4] -> [3] -> null
 ↑
l1
```

After:

```javascript
l1 = l1.next;
```

It becomes:

```text
[2] -> [4] -> [3] -> null
        ↑
       l1
```

The same process is used for l2.

## 💻 Solution

```javascript
function addTwoNumbers2(l1, l2) {

    const dummy = new ListNode(0);

    let curr = dummy;

    let carry = 0;

    while (l1 || l2 || carry) {

        const val1 = l1 ? l1.val : 0;

        const val2 = l2 ? l2.val : 0;

        const sum = val1 + val2 + carry;

        carry = Math.floor(sum / 10);

        curr.next = new ListNode(sum % 10);

        curr = curr.next;

        l1 = l1 ? l1.next : null;

        l2 = l2 ? l2.next : null;
    }

    return dummy.next;
}
```

## 🧠 Dry Run

Let's take:

```text
l1 = [2,4,3]
l2 = [5,6,4]
```

### Step 1

```text
val1 = 2
val2 = 5
carry = 0

sum = 2 + 5 + 0 = 7
```

Current digit:

```text
7
```

Carry:

```text
0
```

Result:

```text
[7]
```

### Step 2

```text
val1 = 4
val2 = 6
carry = 0

sum = 4 + 6 + 0 = 10
```

Current digit:

```text
0
```

Carry:

```text
1
```

Result:

```text
[7] -> [0]
```

### Step 3

```text
val1 = 3
val2 = 4
carry = 1

sum = 3 + 4 + 1 = 8
```

Current digit:

```text
8
```

Carry:

```text
0
```

Result:

```text
[7] -> [0] -> [8]
```

Final answer:

```text
[7,0,8]
```

## ⏱️ Complexity

### Time Complexity

```text
O(max(n, m))
```

We traverse both linked lists once.

Where:

- n = length of l1
- m = length of l2

### Space Complexity

```text
O(max(n, m))
```

We create a new linked list containing the result.

## 🎯 What I Learned

- How linked lists work using val and next
- How to traverse a linked list
- How ListNode is used to create new nodes
- Why a dummy node is useful
- How curr helps build the result list
- How carry works during addition
- How to handle linked lists of different lengths
- How to handle the final carry
- How to solve the problem in O(max(n, m)) time