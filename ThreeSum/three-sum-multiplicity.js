// 923. 3Sum With Multiplicity

function threeSumMultiple(nums, target){
    nums.sort((x, y) => x - y)
    let tripletsCount = 0;
    let sum;
    for(let i = 0; i < nums.length -2; i++){
        let j = i + 1;
        let k = nums.length -1;
        while(j < k){
            sum = nums[i] + nums[j] + nums[k]
            if(sum === target){
                tripletsCount++
                j++; k--
                continue;
            }
            if(sum > target) k--;
            else j++
        }
    }
    return tripletsCount
}

console.log(threeSumMultiple([1,1,2,2,3,3,4,4,5,5], 8))
console.log(threeSumMultiple([1,1,2,2,2,2], 5))
console.log(threeSumMultiple([2,1,3], 6))


var threeSumMulti = function(arr, target) {
    const MOD = 1000000007n;
    arr.sort((a, b) => a - b);
    let count = 0n;

    for (let i = 0; i < arr.length - 2; i++) {
        let j = i + 1;
        let k = arr.length - 1;
        const rem = target - arr[i];

        while (j < k) {
            const sum = arr[j] + arr[k];

            if (sum < rem) {
                j++;
            } else if (sum > rem) {
                k--;
            } else if (arr[j] !== arr[k]) {
                // arr[j] se leke uske duplicates ka count, arr[k] se leke uske duplicates ka count
                let left = 1n;
                let right = 1n;

                while (j + 1 < k && arr[j] === arr[j + 1]) {
                    left++;
                    j++;
                }
                while (k - 1 > j && arr[k] === arr[k - 1]) {
                    right++;
                    k--;
                }

                count = (count + left * right) % MOD;
                j++;
                k--;
            } else {
                // arr[j] === arr[k], matlab j se k tak saare elements equal hain
                const n = BigInt(k - j + 1);
                count = (count + (n * (n - 1n)) / 2n) % MOD;
                break; // yeh window khatam, agla i try karo
            }
        }
    }

    return Number(count);
};