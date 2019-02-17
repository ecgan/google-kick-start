# Big Buttons

[Direct link to Google Kick Start](https://codingcompetitions.withgoogle.com/kickstart/round/0000000000050ee2/0000000000051136)

## Usage

[solution.js](solution.js) file is the solution to be submitted to Google Kick Start site. It gets perfect score with both small and large dataset. Note that Google Kick Start uses Node version 4.8.2.

[solution.test.js](solution.test.js) contains tests using [Jest](https://jestjs.io/). Tests are based on the samples on Google site and my own analysis. To run the test, make sure you have recent stable node version ([nvm](https://github.com/creationix/nvm) would be helpful here) and run the following in your console:

```
npm install
npm run test
```

## Explanation

### Trie data structure

The solution makes use of the [trie](https://en.wikipedia.org/wiki/Trie) data structure. This allows us to achieve time and space efficiency in calculating number of invalid prefix strings. 

In each problem, the case parser will construct a new trie with an empty trie node as its root. When the case parser parse a prefix string, it will add the prefix string into the trie, where each trie node represents a character in the prefix string. This allows us to save space in memery, even more so when there are large number of strings.

```
String 1: RRRB
String 2: RRBR

Trie: 
R - R - R - B
    \ - B - R
```

### Trie node and `isPrefixEnded` property

Each trie node contains two major properties. `children` links to other trie nodes. `isPrefixEnded` is used to indicate that the node is the last character of the prefix string. This is used to eliminate unnecessary prefix strings. Consider the following example: 

```
String 1: RBR
String 2: RBRBR
String 3: RBRRRBB
```

Notice the above three strings share the same `RBR` prefix. When String 1 is parsed into the trie, this is how it looks like: 

```
Trie: 
R - B - R
        ^(isPrefixEnded is true.)
```

Subsequently, when String 2 and String 3 are parsed into the trie, it will encounter R node having `isPrefixEnded`, and it will automatically stop processing String 2 and String 3. The final trie would be:

```
Trie: 
R - B - R
```

When we process the last character of any prefix string, we must set the `isPrefixEnded` to `true` and clear the `children`. This allows us to cater for any order of prefix strings: 

```
String 1: RBRRRBB
String 2: RBR
String 3: RBRBR

Trie:
R - B - R
```

### Simplifying `B` and `R` leaf nodes 

Consider the following scenario: 

```
String 1: RR
String 2: RB
```

The above strings can be simplified into the following trie: 

```
Trie: 
R
```

Before we create the leaf trie node, we check whether the parent node contains the other character node as a leaf node (i.e. `isPrefixEnded` is true). If it does, then we don't create the leaf node, and mark the parent node's `isPrefixEnded` as true and clear its children. This is implemented in the `preCheckLastNode` function. 

This also means that if a problem contains the following prefix strings: 

```
String 1: R
String 2: B

Trie: 
(empty)
```

The generated trie would only have one empty root node with no children, meaning all generated winning sequence are actually forbidden.

### Calculating the number of winning sequence

If there is no forbidden prefix string, the total number of winning sequence is `2^N`.

With forbidden prefix string, we need to minus the possible number of prefix string from the total number to get the final number of winning sequence. 

We can get the sum of invalid strings from the length of the branches in the trie. Consider the following: 

```
String 1: RRR
String 2: RBBBB
String 3: RBBRRB

Trie:
R - R - R               # Length: 3
  \ B - B - B - B       # Length: 5
        \ - R - R - B   # Length: 6
```

The `getTrieBranches` function is a recursive function that returns the length of the branches (i.e. `[3, 5, 6]`). 

With the lengths, the number of invalid strings is `sum( 2^(N - length) )`.
