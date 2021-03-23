function boruvka (inputArr) {
    document.getElementById("result_text").innerHTML += "\n\n                 Boruvka`s algorithm                  ";
    let min = []
    for (let i = 0; i < inputArr.length; i++) {
        let tempArr = [...inputArr[i]];
        min.push([i, tempArr.indexOf(Math.min.apply(null, inputArr[i].filter(Boolean)))]);
    }
    document.getElementById("result_text").innerHTML += "\n1. Minimum-weight edge incident to each vertex of the graph: ";
    for (let i = 0; i < min.length; i++) {
        document.getElementById("result_text").innerHTML += "\n["+min[i]+"] ";
    }

    let minC = [...min];
    let components = [];

    while (minC.length > 0){
    let component = [minC[0][0], minC[0][1]];
    let t = 1;
        while (t != 0){
            t = 0
            for (let i = 0; i < minC.length; i++) {
                for (let j = 0; j < component.length; j++) {
                    if(minC[i][0] == component[j] && component.indexOf(minC[i][1]) == -1){
                        component.push(minC[i][1]);
                        t++;
                    }
                    if(minC[i][1] == component[j] && component.indexOf(minC[i][0]) == -1){
                        component.push(minC[i][0]);
                        t++;
                    }
                }
            }
        }

    components.push(component);

    let tempArr = [];
    for (let i = 0; i < min.length; i++) {
        let t = 0;
        for (let j = 0; j < components.length; j++) {
            if(components[j].indexOf(i) !== -1) t++;
        }
        if(t == 0) tempArr.push(min[i]);
    }

    minC = [...tempArr];
    console.log(component);
    console.log(minC);
    }


    document.getElementById("result_text").innerHTML += "\n\nRemaining components: \n";
    for (let i = 0; i < components.length; i++) {
        document.getElementById("result_text").innerHTML += "["+components[i]+"] ";
    }

    let connections = [];

    for (let i = 0; i < components.length - 1; i++) {
        connections.push(cartesian(components[i], components[i + 1]));
    }
    connections.push(cartesian(components[0], components[components.length - 1]));
    
    console.log(connections);
    document.getElementById("result_text").innerHTML += "\n\n2. Searching shortest connections between components: \n";
    document.getElementById("result_text").innerHTML += "\nAll avalible connections: ";
    for (let i = 0; i < connections.length; i++) {
        document.getElementById("result_text").innerHTML += "\n[";
        for (let j = 0; j < connections[i].length; j++) {
            document.getElementById("result_text").innerHTML += "["+connections[i][j]+"] ";
        }
        document.getElementById("result_text").innerHTML += "]";
    }

    function cartesian(...args) {
        var r = [], max = args.length-1;
        function helper(arr, i) {
            for (var j=0, l=args[i].length; j<l; j++) {
                var a = arr.slice(0); // clone arr
                a.push(args[i][j]);
                if (i==max){
                    if(inputArr[a[0]][a[1]] != 0) r.push(a);
                }
                else
                    helper(a, i+1);
            }
        }
        helper([], 0);
        return r;
    }
    
    let connectionsWeight = [];

    for (let i = 0; i < connections.length; i++) {
        connectionsWeight.push([]);
        for (let j = 0; j < connections[i].length; j++) {
            connectionsWeight[i].push(inputArr[connections[i][j][0]][connections[i][j][1]]);
        }
    }

    console.log(connectionsWeight);
    
    let minMin = [];
    let minMinValue = [];
    for (let i = 0; i < connectionsWeight.length; i++) {
        minMin.push([Math.min(...connectionsWeight[i]), connections[i][connectionsWeight[i].indexOf(Math.min(...connectionsWeight[i]))]]);
        minMinValue.push(Math.min(...connectionsWeight[i]));
    }

    document.getElementById("result_text").innerHTML += "\nMinimal connections: ";
    for (let i = 0; i < minMin.length; i++) {
        document.getElementById("result_text").innerHTML += "\n[";
        for (let j = 0; j < minMin[i].length; j++) {
            document.getElementById("result_text").innerHTML += "["+minMin[i][j]+"] ";
        }
        document.getElementById("result_text").innerHTML += "]";
    }

    console.log(minMin);
    minMin.splice(minMinValue.indexOf(Math.max(...minMinValue)), 1);
    console.log(minMin);

    let addConnections = [];
    for (let i = 0; i < minMin.length; i++) {
        addConnections.push(minMin[i][1]);
    }

    console.log(addConnections);

    let result = [...min];
    for (let i = 0; i < addConnections.length; i++) {
        result.push(addConnections[i]);
    }

    document.getElementById("result_text").innerHTML += "\n\n3. Minimum spanning tree: ";
    for (let i = 0; i < result.length; i++) {
        document.getElementById("result_text").innerHTML += "\n[";
        document.getElementById("result_text").innerHTML += result[i];
        document.getElementById("result_text").innerHTML += "]";
    }
}

function postman (arr) {

    document.getElementById("result_text").innerHTML += "\n\n               Chinese postman problem          ";
    document.getElementById("result_text").innerHTML += "\n1. Check if all nodes are even";

    let edgeCount = [];
    for (let i = 0; i < arr.length; i++) {
        edgeCount.push(0);
        for (let j = 0; j < arr[i].length; j++) {
            if(arr[i][j] != 0) edgeCount[i]++;
        }
    }
    console.log(edgeCount);

    let oddCount = 0;
    for (let i = 0; i < edgeCount.length; i++) {
        if(edgeCount[i] % 2 != 0) oddCount++;
    }

    if(oddCount > 2){
        document.getElementById("result_text").innerHTML += "\nFound odd nodes";
        document.getElementById("result_text").innerHTML += "\nDuplicating edges";

        let oddIndexes = [];
        for (let i = 0; i < edgeCount.length; i++) {
            if(edgeCount[i] % 2 != 0) oddIndexes.push(i);
        }
        console.log(oddIndexes);

        let duplicatePairs = [];

        while (oddIndexes.length > 1){
            let first = oddIndexes[0];
            let second;
            for (let i = 1; i < oddIndexes.length; i++) {
                if(arr[first][oddIndexes[i]] != 0 && !second) second = oddIndexes[i];
            }
            if(!second) {
                document.getElementById("result_text").innerHTML += "\nCan`t duplicate edges";
                return 0;
            }
            else{
                console.log(second)
                oddIndexes.splice(oddIndexes.indexOf(first), 1);
                oddIndexes.splice(oddIndexes.indexOf(second), 1);
                console.log(oddIndexes);
                duplicatePairs.push([first, second]);
                document.getElementById("result_text").innerHTML += `\n[${first}-${second}]`;
            }
        }
        
        console.log(duplicatePairs);
        eulerianPath(arr, duplicatePairs);

    }else{
        eulerianPath(arr);
    }

    function eulerianPath(a, b = []) {
        document.getElementById("result_text").innerHTML += "\n\n2. Searching Eulerian cycle";
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                sum += a[i][j];
            }
        }
        sum /= 2;
        for (let i = 0; i < b.length; i++) {
            sum += a[b[i][0]][b[i][1]];
        }

        let stack1 = [0];
        let stack2 = [0];

        let edgeCount = 2;
        let limit = 0;
        while(edgeCount > 1 && limit < 25){
            limit++;

            let next = "O";
            for (let i = 0; i < a[stack1[stack1.length - 1]].length; i++) {
                if(a[stack1[stack1.length - 1]][i] != 0 && next == "O") next = i;
                //console.log(next);
            }
            
            document.getElementById("result_text").innerHTML += `\n\nPath: ${stack1}`;
            document.getElementById("result_text").innerHTML += `\nCycle: ${stack2}`;
            if(next == stack2[stack2.length - 1]){
                stack2.push(stack1[stack1.length - 1])


                let newB = []
                let del = 0;
                for (let i = 0; i < b.length; i++) {
                    if(!(b[i][0] == stack1[stack1.length - 2] && b[i][1] == stack1[stack1.length - 1]) && !(b[i][0] == stack1[stack1.length - 1] && b[i][1] == stack1[stack1.length - 2])) newB.push(b[i]);
                    else {
                        del++;
                    }
                }
                b = [...newB];
                if(del == 0){
                    a[stack1[stack1.length - 1]][next] = 0;
                    a[next][stack1[stack1.length - 1]] = 0;
                }

            }
            else{
                stack1.push(next);
                console.log(stack1[stack1.length - 1]+ " : " +stack1[stack1.length - 2]);

                let newB = []
                let del = 0;
                for (let i = 0; i < b.length; i++) {
                    if(!(b[i][0] == stack1[stack1.length - 2] && b[i][1] == stack1[stack1.length - 1]) && !(b[i][0] == stack1[stack1.length - 1] && b[i][1] == stack1[stack1.length - 2])) newB.push(b[i]);
                    else {
                        del++;
                    }
                }
                b = [...newB];
                if(del == 0){
                    a[stack1[stack1.length - 1]][stack1[stack1.length - 2]] = 0;
                    a[stack1[stack1.length - 2]][stack1[stack1.length - 1]] = 0;
                }
            }


            edgeCount = 0;
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < a[i].length; j++) {
                    if(a[i][j] != 0) edgeCount++;
                }
            }
            edgeCount /= 2;
            edgeCount += b.length;
            console.log(edgeCount);
        }

        console.log(stack1);
        console.log(stack2);

        let result = [...stack2];

        for (let i = stack1.length - 1; i >= 0; i--) {
            result.push(stack1[i]);
        }

        document.getElementById("result_text").innerHTML += "\n\n";
        for (let i = 0; i < result.length; i++) {
            document.getElementById("result_text").innerHTML += `${result[i]}`;
            if(i < result.length - 1) document.getElementById("result_text").innerHTML += "->";
        }

        document.getElementById("result_text").innerHTML += `\n\n Sum: ${sum}`;

        console.log(result);
        console.log(sum);

    }
}

function starter () {
    document.getElementById("result_text").innerHTML = "";
    let arr = reader();
    if(arr == "") document.getElementById("result_text").innerHTML += "ERROR: File not found";
    else {
        document.getElementById("result_text").innerHTML += "Input matrix:";

        for (let i = 0; i < arr.length; i++) {
            document.getElementById("result_text").innerHTML += "\n["+arr[i]+"]";
        }

        let radios = document.getElementsByName('lab');
        let lab = 0;
        for (let i = 0; i < radios.length; i++) {
            if(radios[i].checked) lab = i;
        }
        switch (lab) {
            case 0:
                boruvka(arr);
                break;
            case 1:
                postman(arr);
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
}

function reader() {
    let text = document.getElementById(`input_text`).value;
    let nArr = text.split(/\r?\n/);
    let n = parseFloat(nArr[0]);
    let arr = [];
    for (let i = 1; i < nArr.length; i++) {
        arr.push(nArr[i].split(' ').map(Number));
    }
    return arr;
}