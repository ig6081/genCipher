function getInputValue(){
    var inputVal=document.getElementById("plainInput").value;
    var key=document.getElementById("plainKeyId").value;
    key=key%26;
    var outputVal='';
    for(var i=0; i<inputVal.length; i++){
        var letter=inputVal.charCodeAt(i);

        if(letter === 32){
            outputVal+=' ';
            continue;
        }
        if(letter+key>122){
            // outputVal+=(97+)
            outputVal+=String.fromCharCode((96+((letter+key)%122)));
        }
        else{
            outputVal+=String.fromCharCode((letter+key));
        }
    }
    document.getElementById("encryptedInput").innerHTML=outputVal;
    // document.getElementById("encryptedInput").innerHTML=key;
}
function getdeinputValue(){
    var deinput=document.getElementById("encryptedInput").value;
    var key=document.getElementById("encryptedKeyId").value;
    key=key%26;
    var outputVal='';
    for(var i=0; i<deinput.length; i++){
        var letter=deinput.charCodeAt(i);
        if(letter === 32){
            outputVal+=' ';
            continue;
        }
        if(letter-key<97){
            // h=(letter-key)
            outputVal+=String.fromCharCode(26+(letter-key));
        }
        else{
            outputVal+=String.fromCharCode((letter-key));
        }
    }
    // console.log(outputVal);
    document.getElementById("plainInput").innerHTML=outputVal;
}
