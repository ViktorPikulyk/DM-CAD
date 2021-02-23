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