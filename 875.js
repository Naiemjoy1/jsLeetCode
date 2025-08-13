// Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

// Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

// Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

// Return the minimum integer k such that she can eat all the bananas within h hours.

 

// Example 1:

// Input: piles = [3,6,7,11], h = 8
// Output: 4
// Example 2:

// Input: piles = [30,11,23,4,20], h = 5
// Output: 30
// Example 3:

// Input: piles = [30,11,23,4,20], h = 6
// Output: 23
 

// Constraints:

// 1 <= piles.length <= 104
// piles.length <= h <= 109
// 1 <= piles[i] <= 109

var minEatingSpeed = function(piles, h) {
    // Helper function to calculate hours for a given eating speed k
    function canFinish(k) {
        let hours = 0;
        for (let pile of piles) {
            hours += Math.ceil(pile / k); // Total hours needed for this pile
        }
        return hours <= h; // Check if it is within the allowed hours
    }

    let low = 1, high = Math.max(...piles);
    
    // Binary search to find the minimum valid k
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        
        if (canFinish(mid)) {
            high = mid; // Try smaller speeds
        } else {
            low = mid + 1; // Increase the speed
        }
    }
    
    return low; // The minimum speed at which Koko can finish within h hours
};
console.log(minEatingSpeed([3,6,7,11], 8));  // Output: 4
console.log(minEatingSpeed([30,11,23,4,20], 5));  // Output: 30
console.log(minEatingSpeed([30,11,23,4,20], 6));  // Output: 23
