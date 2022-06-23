var diceValue = 0;
var redFinishedCount = 0, blueFinishedCount = 0, greenFinishedCount = 0, yellowFinishedCount = 0;
var red = [];
var blue=[],green=[],yellow = [];   //stacks for poping coins in side home
var safeIndex = [2, 10, 20, 28, 38, 46, 56, 64];
var arr = new Array(73);
var playerTurn = "";
var turnQueue = new Queue();    // to maintain turn.
var canChangeTurn = true;             
var previous = "";
document.getElementById("notification").textContent = "red's Turn";
for (let index = 0; index < arr.length; index++) {
    var tempObject = {"Rcolor":"none","Rcount":0,"objs":0,"Bcolor":"none","Bcount":0,"Ycolor":"none","Ycount":0,"Gcount":0,"Gcolor":"none"};
    Object.defineProperty(tempObject, 'objs',{enumerable: false}); 
    Object.defineProperty(tempObject, 'Rcount',{enumerable: false}); 
    Object.defineProperty(tempObject, 'Ycount',{enumerable: false}); 
    Object.defineProperty(tempObject, 'Bcount',{enumerable: false}); 
    Object.defineProperty(tempObject, 'Gcount',{enumerable: false}); 
    arr[index] = tempObject;    
}

function clicked(event){
    if(diceValue == 6){
        if(playerTurn == "blue" && event.target.name == "blue")
        {
            // if(diceValue != 6)changeTurn();
            blue.push( event.target);
            event.target.hidden = true;
            create("Bcolor","blue", 38, "Bcount")
            playerTurn = playerTurn + 1;
        }
        else if(playerTurn == "red" && event.target.name == "red")
        {
            // if(diceValue != 6)changeTurn();
            red.push( event.target);
            event.target.hidden = true;
            create("Rcolor","red", 56, "Rcount")
            playerTurn = playerTurn + 1;
        }
        else if(playerTurn == "green" && event.target.name == "green")
        {
            // if(diceValue != 6)changeTurn();
            green.push( event.target);
            event.target.hidden = true;
            create("Gcolor","green", 2, "Gcount")
            playerTurn = 1;
        }
        else if(playerTurn == "yellow" && event.target.name == "yellow")
        {
            // if(diceValue != 6)changeTurn();
            yellow.push( event.target);
            event.target.hidden = true;
            create("Ycolor","yellow", 20, "Ycount")
            playerTurn = playerTurn + 1;
        }
    }
}
function create(colorIndex, color, index, cIndex)
{   
    diceValue = 0;
    document.getElementById("dice").textContent = diceValue;
    if(arr[index][colorIndex]=="none")
    {
        arr[index][colorIndex] = color;
        arr[index]["objs"] = arr[index]["objs"] + 1 ;
        arr[index][cIndex] = arr[index][cIndex] + 1;
    }
    else if (arr[index][colorIndex]==color)
    {
        arr[index]["objs"] = arr[index]["objs"] + 1;
        arr[index][cIndex] = arr[index][cIndex] + 1;

    }
    
    document.getElementById(index.toString()).innerHTML = `<img src="${color}pong.png" width="30px" height="30px" onclick="move(event)" id="${index}" name="${color}" class="pong"/>`;

}
function calculateValidMove(obj, cPosition){
    var nPosition = (parseInt(cPosition) + diceValue) % 72;
    if(nPosition == 0) nPosition = 72;
    if(nPosition >= 14 && nPosition <= 19){
        if(obj.name != "yellow"){
            var offSet = nPosition % 13;
            nPosition = offSet + 18;
            return nPosition;
        }
        else{
            if(parseInt(cPosition) + diceValue < 19) return nPosition;
            else if ((parseInt(cPosition) + diceValue) == 19){
                document.getElementById("notification").textContent = "Yellow Finished!";
                canChangeTurn = false;
                yellowFinishedCount += 1;
                obj.remove();
                return null;
            }
        }
    }
    else{
        if(cPosition >=14 && cPosition <=18) return null;
    }
    if(nPosition >= 32 && nPosition <= 37){
        if(obj.name != "blue"){
            var offSet = nPosition % 31;
            nPosition = offSet + 36;
            return nPosition;
        }
        else{
            if(parseInt(cPosition) + diceValue < 37) return nPosition;
            else if ((parseInt(cPosition) + diceValue) == 37){
                document.getElementById("notification").textContent = "Blue Finished!";
                canChangeTurn = false;
                blueFinishedCount += 1;
                obj.remove();
                return null;
            }
        }
    }
    else{
        if(cPosition >=32 && cPosition <=36) return null;
    }
    if(nPosition >= 50 && nPosition <= 55){
        if(obj.name != "red"){
            var offSet = nPosition % 49;
            nPosition = offSet + 54;
            return nPosition;
        }
        else{
            if(parseInt(cPosition) + diceValue < 55) return nPosition;
            else if ((parseInt(cPosition) + diceValue) == 55){
                document.getElementById("notification").textContent = "Red Finished!";
                canChangeTurn = false;
                redFinishedCount += 1;
                obj.remove();
                return null;
            }
        }
    }
    else{
        if(cPosition >=50 && cPosition <=54) return null;
    }
    if(nPosition >= 68 && nPosition <= 72){
        if(obj.name != "green"){
            var offSet = nPosition % 67;
            nPosition = offSet + 0;
            return nPosition;
        }
        else{
            if(parseInt(cPosition) + diceValue < 73) return nPosition;
        }
    }
    else if(nPosition == 1){
        if(obj.name == "green"){
            obj.remove();
            document.getElementById("notification").textContent = "Green Finished!";
            canChangeTurn = false;
            greenFinishedCount += 1;
            return null;
        }
        else nPosition = 6;
    }
    else{
        if(cPosition >=68 && cPosition <=72) return null;
    }
    return nPosition;
}
function isGameOver(){
    if(redFinishedCount == 4){
        document.getElementById("notification").innerHTML = "<h1> Red WINS! </h1>";
    }
    if(blueFinishedCount == 4){
        document.getElementById("notification").innerHTML = "<h1> Blue WINS! </h1>";
    }
    if(greenFinishedCount == 4){
        document.getElementById("notification").innerHTML = "<h1> Green WINS! </h1>";
    }
    if(yellowFinishedCount == 4){
        document.getElementById("notification").innerHTML = "<h1> Yellow WINS! </h1>";
    }
}
function move(event){
    var object = event.target;
    var currentPosition = object.id.toString();
    var newPosition = calculateValidMove(object, currentPosition);
    isGameOver();
    if(newPosition == null){
        return;
    } 
    if(playerTurn == "blue" && object.name == 'blue' && diceValue != 0){
        // if(diceValue != 6)changeTurn();
        setLocation("blue","Bcolor", newPosition,currentPosition, object, "Bcount")
    }
    else if(playerTurn == "red" && object.name == 'red' && diceValue != 0){
        // if(diceValue != 6)changeTurn();
        setLocation("red","Rcolor", newPosition,currentPosition, object, "Rcount")
    }
    else if(playerTurn == "green" && object.name == 'green' && diceValue != 0 ){
        // if(diceValue != 6)changeTurn();
        setLocation("green","Gcolor", newPosition,currentPosition, object, "Gcount")  
    }
    else if(playerTurn == "yellow" && object.name == 'yellow' && diceValue != 0 ){
        // if(diceValue != 6)changeTurn();
        setLocation("yellow","Ycolor", newPosition,currentPosition, object, "Ycount")
    }
    
}
function setLocation(token, tokenIndex, newPosition, currentPosition, object, tokenCount)
{
    if(arr[newPosition][tokenIndex]=="none")
    {
        arr[newPosition][tokenIndex] = token;
        arr[newPosition][tokenCount] = arr[newPosition][tokenCount] + 1;
        arr[newPosition]["objs"] = arr[newPosition]["objs"] + 1;
    }
    else if (arr[newPosition][tokenIndex] == token)
    {
        arr[newPosition]["objs"] = arr[newPosition]["objs"] + 1;
        arr[newPosition][tokenCount] = arr[newPosition][tokenCount] + 1;
    }

    if(arr[parseInt(currentPosition)][tokenIndex] == token)
    {
        if(arr[parseInt(currentPosition)]["objs"] > 1)
        {
            arr[parseInt(currentPosition)]["objs"] = arr[parseInt(currentPosition)]["objs"] - 1;
            arr[parseInt(currentPosition)][tokenCount] = arr[parseInt(currentPosition)][tokenCount] - 1;

            if(arr[parseInt(currentPosition)][tokenCount] == 0)
            {
                arr[parseInt(currentPosition)][tokenIndex] ="none";
                document.getElementById(currentPosition).innerHTML = "";
            }

            if(safeIndex.includes(parseInt(currentPosition)))
            {
                for(i in arr[parseInt(currentPosition)]){
                    if(arr[parseInt(currentPosition)][i]!="none")
                    {
                        if(i == "Rcolor")
                        { 
                            document.getElementById(currentPosition.toString()).innerHTML = `<img src="redpong.png" width="30px" height="30px" onclick="move(event)" id="${currentPosition}" name="red" class="pong"/>`;
                            break;
                        }
                        else if(i == "Bcolor")
                        {
                            document.getElementById(currentPosition.toString()).innerHTML = `<img src="bluepong.png" width="30px" height="30px" onclick="move(event)" id="${currentPosition}" name="blue" class="pong"/>`;
                            break;
                        }
                        else if(i == "Gcolor")
                        { 
                            document.getElementById(currentPosition.toString()).innerHTML = `<img src="greenpong.png" width="30px" height="30px" onclick="move(event)" id="${currentPosition}" name="green" class="pong"/>`;
                            break;
                        }
                        else if(i == "Ycolor")
                        {
                            document.getElementById(currentPosition.toString()).innerHTML = `<img src="yellowpong.png" width="30px" height="30px" onclick="move(event)" id="${currentPosition}" name="yellow" class="pong"/>`;
                            break;
                        }
                    }
                }
            }
        }
        else
        {
            arr[parseInt(currentPosition)][tokenCount] = 0;
            arr[parseInt(currentPosition)]["objs"] = 0;
            arr[parseInt(currentPosition)][tokenIndex] = "none";
            document.getElementById(currentPosition).innerHTML = "";
        }
    }
    
    if(!safeIndex.includes(newPosition)){
        if(arr[newPosition]["objs"] > 0 ){                  //older version in tempCode.txt
            for(i in arr[newPosition]){
                if(arr[newPosition][i] != token){
                    if(arr[newPosition][i] == "blue"){
                        blue.pop().hidden = false;
                        canChangeTurn = false;
                        arr[newPosition]["objs"] = arr[newPosition]["objs"] - 1;
                        arr[newPosition]["Bcount"] = arr[newPosition]["Bcount"] - 1;
                        arr[newPosition][i] = "none";
                    }
                    else if(arr[newPosition][i] == "green"){
                        green.pop().hidden = false;
                        canChangeTurn = false;
                        arr[newPosition]["objs"] = arr[newPosition]["objs"] - 1;
                        arr[newPosition]["Gcount"] = arr[newPosition]["Gcount"] - 1;
                        arr[newPosition][i] = "none";
                    }
                    else if(arr[newPosition][i] == "red"){
                        red.pop().hidden = false; 
                        canChangeTurn = false;
                        arr[newPosition]["objs"] = arr[newPosition]["objs"] - 1;                     
                        arr[newPosition]["Rcount"] = arr[newPosition]["Rcount"] - 1;
                        arr[newPosition][i] = "none";
                    }
                    else if(arr[newPosition][i] == "yellow"){
                        yellow.pop().hidden = false;
                        canChangeTurn = false;
                        arr[newPosition]["objs"] = arr[newPosition]["objs"] - 1;
                        arr[newPosition]["Ycount"] = arr[newPosition]["Ycount"] - 1;
                        arr[newPosition][i] = "none";
                    }
                }
            }
        }
    }
    
    document.getElementById(newPosition.toString()).innerHTML = `<img src="${token}pong.png" width="30px" height="30px" onclick="move(event)" id="${newPosition}" name="${token}" class="pong"/>`;
    diceValue = 0;
    document.getElementById("dice").textContent = diceValue;
}

// dice rolling and generating a dice Value
var angle = 0; 
var boolean = true;
function rotateDice(event){
    document.getElementById("diceBody").style.transform = `rotate(${angle}deg)`;
    if(boolean) angle += 1;
    else angle -= 1;

    if(angle >= 180){
        boolean = false;
    }
    if(angle <= 0){
        boolean = true;
    }
}
turnQueue.enqueue("red");
turnQueue.enqueue("blue");
turnQueue.enqueue("yellow");
turnQueue.enqueue("green");

function changeTurn(boolean){
    if(boolean == true)
        turnQueue.enqueue(turnQueue.dequeue());
    else canChangeTurn = true;
}
function getTurn(){
    document.getElementById("notification").textContent = `${turnQueue.peek()}'s Turn`;
    if(canChangeTurn == false){
        document.getElementById("notification").textContent = `${turnQueue.a[3]}'s Turn`;
        return turnQueue.a[3];
    }
    return turnQueue.peek();
}
function replaceCoins(turn){
    for(let i=0; i<safeIndex.length; i++){
        if(turn == 'blue'){
            if(arr[safeIndex[i]].Bcount != 0){
                document.getElementById(`${safeIndex[i]}`).innerHTML = `<img src="bluepong.png" width="30px" height="30px" onclick="move(event)" id="${safeIndex[i]}" name="blue" class="pong"/>`
            }
        }
        else if(turn == 'red'){
            if(arr[safeIndex[i]].Rcount != 0){
                document.getElementById(`${safeIndex[i]}`).innerHTML = `<img src="redpong.png" width="30px" height="30px" onclick="move(event)" id="${safeIndex[i]}" name="red" class="pong"/>`
            }
        }
        else if(turn == 'yellow'){
            if(arr[safeIndex[i]].Ycount != 0){
                document.getElementById(`${safeIndex[i]}`).innerHTML = `<img src="yellowpong.png" width="30px" height="30px" onclick="move(event)" id="${safeIndex[i]}" name="yellow" class="pong"/>`
            }
        }
        else if(turn == 'green'){
            if(arr[safeIndex[i]].Gcount != 0){
                document.getElementById(`${safeIndex[i]}`).innerHTML = `<img src="greenpong.png" width="30px" height="30px" onclick="move(event)" id="${safeIndex[i]}" name="green" class="pong"/>`
            }
        }
    }
}

function rollDice(event){
    diceValue = Math.floor((Math.random() * 6 )+ 1);
    event.target.disabled = true;
    var nameInterval = setInterval(rotateDice, 5);   
    playerTurn = getTurn();                            
    if(diceValue != 6)changeTurn(canChangeTurn);        
    replaceCoins(playerTurn);
    //document.getElementById("dice").textContent = diceValue;
    setTimeout(() => { 
        event.target.disabled = false;
        clearInterval(nameInterval);
        document.getElementById("dice").textContent = diceValue;
        document.getElementById("diceBody").innerHTML = `<img src="${diceValue}dice.png" alt="dice image"  width = "90px" />`;
    }, 1500);     
}
