function spiral(params) {
    if (params < 2) {
        console.log(false);
    } else {
        let input = new Array();
        for (let i = 0; i < params; i++) {
            input[i] = new Array();
            for (let j = (i * params) + 0; j <= params * i + (params - 1); j++)
                if (input[i] == null)
                    input[i] = j;
                else
                    input[i].push(j);
        }
        let list = [];
        while (input.length > 1) {
            //Right
            list = list.concat(input.splice(0, 1)[0]);
            //Down
            for (let idx in input) {
                list.push(input[idx].splice(-1)[0]);
            }
            //Left
            list = list.concat(input.splice(-1, 1)[0].reverse());
            //Up
            for (let idx = input.length - 1; idx >= 0; idx--) {
                list.push(input[idx].splice(0, 1)[0]);
            }
        }
        if (input.length > 0) {
            list.push(input.pop()[0]);
        }
        // return list;
        console.log(list);
    }
}
spiral(5);
spiral(6);
spiral(7);