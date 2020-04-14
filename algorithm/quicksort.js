function quicksort(arr){
    if(arr.length<=1) return arr;
    let base = arr.splice(Math.floor(arr.length/2),1)[0];
    let left = []
    let right = []
    for(let i=0;i<arr.length;i++){
        if(arr[i]>=base){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    return quicksort(left).concat(base,quicksort(right))
}
const arr = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];
console.log(quicksort(arr))