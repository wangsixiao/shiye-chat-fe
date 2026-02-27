// babad bab
export const fn = (str) => {
  let result = "";
  const len = str.length;
  for (let i = 0; i < len; i++) {
    let right = i + 1;
    let word = str[i];
    while (right < len && str[right] !== str[i]) {
      word += str[right];
      right++;
    }
    if (str[i] === str[right]) {
      word += str[right];
      if (word.length > result.length) result = word;
    }
  }
  return result;
};
// console.log(fn("babad"));

// abcabcbb 无重复字符最长子串
function fn1(str) {
  let result = "";
  const len = str.length;
  for (let i = 0; i < len; i++) {
    let right = i + 1;
    let word = str[i];
    while (right < len && word.indexOf(str[right]) === -1) {
      word += str[right];
      right++;
    }
    if (word.length > result.length) result = word;
  }
  return result;
}
// console.log(fn1('pwwkew'))
function twoSum(nums, target) {
  const mapData = new Map();
  let result;
  for (const index in nums) {
    const item = nums[index];
    if (mapData.has(target - item)) {
      result = [mapData.get(target - item), index];
      break;
    }
    mapData.set(item, index);
  }
  return result;
}
// console.log(twoSum([2, 7, 11, 15], 9));

function curry(fn) {
  return function curryRepeat(...args) {
    if (args.length < fn.length) {
      return function (...args1) {
        return curryRepeat.apply(this, args.concat(args1));
      };
    }
    return fn.apply(this, args);
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const currySum = curry(sum);

// console.log(currySum(1,2)(3))

function memoize(fn, context = this) {
  let cacheObj = new Map();
  return (...value) => {
    if (!cacheObj.has(value)) {
      cacheObj.set(value, fn.apply(context, value));
    }
    console.log("value", value, cacheObj, cacheObj.get(value));
    return cacheObj.get(value);
  };
}

const add = (x, y) => {
  console.log("111");
  console.log(x + y);
};

const calc = memoize(add);
const num1 = calc(100, 200);
const num2 = calc(100, 200);

const fileChunk = (file, size) => {
  let list = [];
  let cur = 0;
  let index = 0;
  while (cur < file.size) {
    const formData = new FormData();
    const fileSlice = file.slice(cur, cur + size);
    formData.append("chunk", fileSlice);
    list.push({ file: fileSlice, hash: `${file.name}-${index}` });
    cur += size;
  }
  return list;
};

class myPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("MyPlugin", () => {});
  }
}

// 然后在配置中： plugins: [new MyExamplePlugin()]

const promiseAll = (list) => {
  return new Promise((resolve, reject) => {
    let result = [];
    let flag = 0;
    for (let i = 0; i < list.length; i++) {
      Promise.resolve(list[i]).then(
        (res) => {
          result[i] = res;
          flag++;
          if (flag === list.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        },
      );
    }
  });
};

function deepClone(obj) {
  //过滤特殊情况
  if (typeof obj !== "object") return obj;
  if (obj == null) return obj;
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  //不直接创建空对象的目的：克隆的结果和之前保持相同的所属类 就不用区分数组和对象
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
}

var a = {
  name: "qwe",
  sex: "male",
};

var b = deepClone(a);
var c = Object.assign(a);

b.age = 13;
c.age = 11;

console.log(a);
console.log(b);
console.log(c);

const numTrees = (n) => {
  // n个整数能创建出的BST的种类数
  if (n == 0 || n == 1) {
    return 1;
  }
  let num = 0;
  for (let i = 0; i < n; i++) {
    num += numTrees(i) * numTrees(n - i - 1);
  }
  return num;
};

console.log(numTrees(3));

var longestPalindrome = function (s) {
  let result = s[0];
  // if(s.length < 2) return s
  for (let i = 0; i < s.length; i++) {
    let right = i + 1;
    let str = s[i];
    while (right < s.length && s[right] !== s[i]) {
      str += s[right];
      right++;
    }
    if (s[right] === s[i]) {
      str += s[right];
      result = result.length < str.length ? str : result;
    }
  }
  return result;
};

// console.log(longestPalindrome("babad"));

// abcabcbb 无重复最长子串
var lengthOfLongestSubstring = (s) => {
  let left = 0;
  let right = 0;
  let start = "";
  let max = 0;
  let mapData = new Map();
  for (let i in s) {
    if (mapData.has(s[i])) {
      left = Math.max(mapData.get(s[i]) + 1, left);
    }
    if(right - left + 1 > max) {
      start = left
      max = right - left + 1
    }
    right++;
    mapData.set(s[i], i)
  }
  return s.substr(start, max)
};

console.log(lengthOfLongestSubstring("abcabcbb"));
