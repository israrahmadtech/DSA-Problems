function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;
    while (l1 || l2 || carry) {
        const v1 = l1 ? l1.val : 0;
        const v2 = l2 ? l2.val : 0;
        const total = v1 + v2 + carry;
        carry = Math.floor(total / 10);
        curr.next = new ListNode(total % 10);
        curr = curr.next;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }
    return dummy.next;
}

console.log(addTwoNumbers([2,4,3], [5,6,4])) // [7,0,8]


function addTwoNumbers2(l1, l2){
    const dummy = new ListNode(0)
    let curr = dummy;
    let carry = 0;
    while(l1 || l2 || carry){
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        const sum = val1 + val2 + carry
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }
    return dummy.next;
}

console.log(addTwoNumbers([2,4,3], [5,6,4])) // [7,0,8]