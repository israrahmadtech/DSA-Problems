// Return the sum of a triplet which is closest to the target
function twoSumIIIClosest(numbers, target) {
    numbers.sort((a, b) => a - b)
    let closest = numbers[0] + numbers[1] + numbers[2];
    let sum;
    let j;
    let k;
    for (let i = 0; i < numbers.length - 2; i++) {
        if (i > 0 && numbers[i] === numbers[i - 1]) continue;
        j = i + 1;
        k = numbers.length - 1;
        while (j < k) {
            sum = numbers[i] + numbers[j] + numbers[k]

            if (Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum
            }
            if (sum === target) {
                return sum
            }
            else if (sum > target) k--
            else j++
        }
    }
    return closest
}

console.log(twoSumIIIClosest([-1, 2, 1, -4], 1));

// output: 2

// [-4, -1, 1, 2]


var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let closestSum = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        const minSum = nums[i] + nums[i + 1] + nums[i + 2];
        if (minSum > target) {
            if (Math.abs(minSum - target) < Math.abs(closestSum - target)) {
                closestSum = minSum;
            }
            break;
        }

        const maxSum = nums[i] + nums[n - 2] + nums[n - 1];
        if (maxSum < target) {
            if (Math.abs(maxSum - target) < Math.abs(closestSum - target)) {
                closestSum = maxSum;
            }
            continue;
        }

        let j = i + 1;
        let k = n - 1;

        while (j < k) {
            const sum = nums[i] + nums[j] + nums[k];

            if (sum === target) return sum;

            if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
                closestSum = sum;
            }

            if (sum > target) {
                k--;
                while (j < k && nums[k] === nums[k + 1]) k--;
            } else {
                j++;
                while (j < k && nums[j] === nums[j - 1]) j++;
            }
        }
    }
    return closestSum;
}