// Using Object
function lengthOfLongestSubstring(string) {
    const map = {};
    let maxLength = 0;
    let left = 0;
    for (let right = 0; right < string.length; right++) {
        const current = string[right]
        if (map[current] !== undefined && map[current] >= left) {
            left = map[current] + 1;
        }
        map[current] = right;
        maxLength = Math.max(maxLength, right - left + 1)
    }
    return maxLength
}
console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));


// Using Map()

function lengthOfLongestSubstringMap(string){
    const map = new Map();
    let maxLength = 0;
    let left = 0;
    for(let right = 0; right < string.length; right++){
        let current = string[right];
        if(map.has(current) && map.get(current) >= left) left = map.get(current) + 1;

        map.set(current, right);
        maxLength = Math.max(maxLength, right - left + 1)
    }
    return maxLength;
}

console.log(lengthOfLongestSubstringMap("abcabcbb"));
console.log(lengthOfLongestSubstringMap("bbbbb"));
console.log(lengthOfLongestSubstringMap("pwwkew"));