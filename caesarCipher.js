function getInputValue(){
    var inputVal=document.getElementById("plainInput").value;
    var outputVal='';
    for(var i=0; i<inputVal.length; i++){
        var letter=inputVal.charCodeAt(i);
        if(letter === 32){
            outputVal+=' ';
            continue;
        }
        if(letter+3>122){
            letter=93+((letter+3)%122);
        }
        outputVal+=String.fromCharCode((letter+3));
    }
    document.getElementById("encryptedInput").innerHTML=outputVal;
}
function getdeinputValue(){
    var deinput=document.getElementById("encryptedInput").value;
    var outputVal='';
    for(var i=0; i<deinput.length; i++){
        var letter=deinput.charCodeAt(i);
        if(letter === 32){
            outputVal+=' ';
            continue;
        }
        if(letter-3<97){
            letter=((letter-3)%93)+122;
        }
        outputVal+=String.fromCharCode((letter-3));
    }
    // console.log(outputVal);
    document.getElementById("plainInput").innerHTML=outputVal;
}
