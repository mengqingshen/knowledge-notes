---
title: 无重复字符的最长子串
categories:
    - 算法拾零
tag:
    - js
---

## 问

给定一个字符串，找出不含有重复字符的最长子串的长度。比如

+ 给定 `"abcabcbb"` ，没有重复字符的最长子串是 `"abc"` ，那么长度就是3。

+ 给定 `"bbbbb"` ，最长的子串就是 `"b"` ，长度是1。

+ 给定 `"pwwkew"` ，最长子串是 `"wke"` ，长度是3。请注意答案必须是一个 **子串** ， `"pwke"` 是 *子序列* 而不是子串。



## 答

**JavaScript**

```typescript
/**
 * 字符状态表
 */
type CharacterHash = {
  [propName: string]: boolean
}

/**
 * Longest Substring Without Repeating Characters
 * 无重复字符的最长子串
*/
function lengthOfLongestSubstring (s: string): number {
  const hash: CharacterHash = {}
  let start: number = 0
  let ans: number = 0

  for (let i = 0, len = s.length; i < len; i++) {
    const item = s[i]

    // 这里的 hash[item] 的值有两种情况
    // 1. undefined: 首次遍历到这类字符
    // 2. false: 之前遍历到过，但由于 start 位置变动后，该字符在上一个 start 和变动后的 start 位置之间，因此作为新的“潜在最长字符串”的一部分，被设置为了 false
    if (!hash[item]) {
      // 标记当前“潜在最长字符串”生长过程中识别到该字符一次
      hash[item] = true
    }
    // 当前“潜在最长字符串”生长过程中第二次遇到该字符
    else {
      // 定位洗一次“潜在最长字符串”的开始位置（即当前“潜在最长字符串”中和当前遍历的字符重复的那个字符的下一个位置）
      for (; ;) {
        if (s[start] === item) {
          start++
          break
        }

        // 只把上一个 start 和变动后的 start 位置之间的字符状态设置为 false（因为再之前的子串部分的最长不重复子串的长度已经记录在了 ans 中）
        hash[s[start]] = false
        start++
      }
    }

    // 每次和之前已经统计出的最大不重复子串做对比，始终保证 ans 是当前找到的不重复子串的最大长度
    ans = Math.max(ans, i - start + 1)
  }

  return ans
}
```

