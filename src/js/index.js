function sum(...xs) {
    let s = 0;
    for (let x of xs) {
        s += x;
    }
    return s;
}

sum(1, 2, 3);
