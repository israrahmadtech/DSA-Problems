// Problem 01 : Checking Sum Zero
// [-5, -4, -3, -2, 0, 2, 4, 6, 8] --> Input

// Lets find from which pair we get their sum equals to zero?
// The pair should be first

// a + b == 0   Output [?, ?]
// [-4, 4] --> This is the pair whose sum is zero

function getSumPairZero(array){
    // getting all values  
    for(let number of array){
        // console.log(number) // Triversing
        for(let j = 1; j < array.length; j++){
            if(number + array[j] === 0){
                return [number, array[j]]
            }
        }
    }
}
const result = getSumPairZero([-5, -4, -3, -2, 0, 2, 4, 6, 8])
console.log(result) // Output ==> [-4, 4]
// o(n^2) --> Quadratic Time Complexity







// Time Complexity
// Improvise: To optimise or to less time complexity
// Triverse: To visit each and every value of array

// function getPair(arr){
//     for (let value of arr){
//         for (let j = 0; j < arr.length; j++){
//             if(value + arr[j] == 0){
//                 return [value, arr[j]];
//             }
//         }
//     }
// }
// console.log(getPair([1, 2, 3, 4, 5, 0, -8, -7, -6, -5, -4]))