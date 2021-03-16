# MuHash-Node

A Node implementation of MuHash algorithm, **Ported from [Bitcoin source](https://github.com/bitcoin/bitcoin) code.** The package is developed based on [node-addon-api](https://github.com/nodejs/node-addon-api), and the core algorithm of MuHash is [implemented in C++](https://github.com/JezaChen/MuHash).

As stated in the Bitcoin source code, **MuHash** is a hashing algorithm that supports adding set elements in any order but also deleting in any order. As a result, it can maintain a 
running sum for a set of data as a whole, and add/remove when data is added to or removed from it.

The paper that proposed the algorithm is *A New Paradigm for Collision-free Hashing:
Incrementality at Reduced Cost* (https://cseweb.ucsd.edu/~mihir/papers/inchash.pdf).

# Install

You can install directly using npm:

```
npm install muhash-node
```

If you want to download and compile it, follow the steps below:

```
git clone https://github.com/JezaChen/muhash-node.git

cd muhash-node

npm install
```

# Usage

A complete example is given below, which covers all the usage of the package.

```
const MuHash = require('muhash-node').MuHash;

//Definition and initialization， the parameter must be of Buffer type
let muhash = new MuHash(Buffer.from("Test 1")); 

//MuHash supports the insertion of elements, the parameter must be of Buffer type
muhash.insert(Buffer.from("Test 2")); 

console.log(muhash.finalizeBase64()); //H("Test1", "Test2")

let muhash_1 = new MuHash(Buffer.from("Test 1"));
let muhash_2 = new MuHash(Buffer.from("Test 2"));

muhash_1.mul(muhash_2); //H("Test1") * H("Test2")
console.log(muhash_1.finalizeBase64()); //It can be discovered that H("Test1", "Test2") is equal to H("Test1") * H("Test2")


//Note that MuHash can no longer be used after calling FinalizeBase64 or FinalizeBuffer!
muhash_1 = new MuHash(Buffer.from("Test 1"));
muhash_2 = new MuHash(Buffer.from("Test 2"));
muhash_1.mul(muhash_2);

muhash_1.div(muhash_2); //muhash1 is H("Test1") * H("Test2") / H("Test2")
let muhash_3 = new MuHash(Buffer.from("Test 1"));
muhash_3.insert(Buffer.from("Test 2")); //Currently, muhash_3 is H("Test1", "Test 2")
muhash_3.remove(Buffer.from("Test 2")); //Now muhash_3 is H("Test1")

//It can be discovered that muhash_1 is euqal to muhash_3
console.log(muhash_1.finalizeBuffer());
console.log(muhash_3.finalizeBuffer());
```