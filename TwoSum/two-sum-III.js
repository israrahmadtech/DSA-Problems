function twoSumThree(numbers) {
    numbers.sort((a, b) => a - b)
    let sum;
    let triplets = []
    let j;
    let k;
    for (let i = 0; i < numbers.length -2; i++) {
        if(numbers[i] > 0) break
        if (i > 0 && numbers[i] == numbers[i - 1]) continue
        j = i + 1
        k = numbers.length - 1
        while (j < k) {
            sum = numbers[i] + numbers[j] + numbers[k]
            if (sum == 0 && sum !== undefined) {
                triplets.push([numbers[i], numbers[j], numbers[k]])
                j++
                k--

                while(j < k && numbers[j] == numbers[j - 1]){
                    j++
                }
                while(j < k && numbers[k] == numbers[k + 1]){
                    k--
                }
            }
            else if (sum > 0) k--
            else j++
        }
    }
    return triplets
}

console.log(twoSumThree([-1, 0, 1, 2, -1, -4]));
console.log(twoSumThree([0, 1, 1]));
console.log(twoSumThree([0, 0, 0]));
