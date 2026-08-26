
function twoSumTwo(nums, target){
    let sum;
    let i = 0;
    let j = nums.length -1
    while(i < j){
        sum = nums[i] + nums[j]
        if(sum == target){
            return [i+1, j+1]
        }
        else if(sum > target) j--
        else i++
    }
}
console.log(twoSumTwo([2, 3, 4, 7, 11, 15], 9));


function twoSumTwo2(numbers, target){
    let sum;
    let i = 0;
    let j = numbers.length -1
    while(i < j){
        sum = numbers[i] + numbers[j]
        if(sum === target) return [i+1, j+1]
        else if(sum > target) j--
        else i++
    }
}

console.log(twoSumTwo2([2, 3, 4, 7, 11, 15], 9));