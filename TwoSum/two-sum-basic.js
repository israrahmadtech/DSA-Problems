// ........................  Complexity: 0n*n  ...............................
// const nums = [2, 7, 11, 15]
// const nums = [3,2,4]
const nums = [3,3]
// const target = 9
const target = 6
let result = []

for(let i = 0; i < nums.length; i++){
    for(let j = i + 1; j < nums.length; j++){
        if(nums[i] + nums[j] == target){
            result = [i, j]
            break;
        }
    }
}

console.log(result);

// ........................  Complexity: 0n  ...............................
const numbers = [2, 7, 11, 15]
const target2 = 9
const map = {}
let result2;
for(let i = 0; i < numbers.length; i++){
    const complement = target2 - numbers[i]

    if(map[complement] !== undefined){
        result2 = [map[complement], i]
        break;
    }
    map[numbers[i]] = i
}
console.log(result2);


// .............................. 100% optimized ....................
function twoSum(nums, target){
    const map = new Map()
    let complement;
    for(let i = 0; i < nums.length; i++){
        complement = target - nums[i]
        if(map.has(complement)){
            return [map.get(complement), i]
        }
        map.set(nums[i], i)
    }
}
console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));