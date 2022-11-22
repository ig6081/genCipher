function getInputValue(){
    var inputVal=document.getElementById("plainInput").value;
    var key=document.getElementById("plainKeyId").value;
    var arr = Array.from(Array(5), () => Array('a','b','c','d','e'));
    inputVal = inputVal.toLowerCase();
    key=key.toLowerCase();
    var keyMatrix= matrix(key,arr);
    var leastKey=leastCount(inputVal);
    inputVal=modifyPlainText(inputVal,leastKey);
    var encryptedText=encrypt(keyMatrix, inputVal);
    document.getElementById("encryptedInput").innerHTML=encryptedText;
}


function modifyPlainText(inputVal, leastKey){
    var start=-1;
    for(var i=0; i<inputVal.length-1; i+=2){
        if(inputVal[i]==' '){
            start=i;
            --i;
        }else if(inputVal[i+1]==' '){
            if((i-start)%2!=0){
                inputVal=inputVal.slice(0,i+1)+leastKey+inputVal.slice(i+1);
            }
            start=i+2;
        }
        else if(inputVal[i]==inputVal[i+1]){
            inputVal=inputVal.slice(0,i+1)+leastKey+inputVal.slice(i+1);
        }
    }

    var textLength=inputVal.length;
    var space=0;
    for(var i=0; i<textLength; i++){
        if(inputVal[i]==' '){
            space++;
        }
    }
    if((textLength-space)&1)
        inputVal=inputVal+leastKey;    

    return inputVal;
}


function leastCount(str){
    var n=str.length;
    var arr=new Array(26);
    for(var i=0; i<26; i++)
        arr[i]=0;
    for(var i=0;i<n;i++){
        var t=str.charCodeAt(i);
        arr[t-97]++;
    }   
    var ans='z';
    var mn=Number.MAX_SAFE_INTEGER;
    for(var i=25; i>=0; i--){
        if(arr[i]<mn){
            mn=arr[i];
            ans=String.fromCharCode(97+i);
        }
    }
    return ans;
}


function encrypt(arr,inputVal){
    var frowIdx=-1, fcolIdx=-1,srowIdx=-1,scolIdx=-1;
    var encrypted="";
    var whiteSpace=' ';
    for(var k=0;k<inputVal.length;k+=2){
        var a=inputVal[k];
        var b=inputVal[k+1];

        if(a==whiteSpace){
            encrypted=encrypted+' ';
            --k;
            continue;
        }
        for(var i=0;i<5;i++){
            for(var j=0;j<5;j++){
                if(a==arr[i][j]){
                    frowIdx=i;
                    fcolIdx=j;
                }
                else if(b==arr[i][j]){
                    srowIdx=i;
                    scolIdx=j;
                }
                else if(a=='j'){
                    frowIdx=2;
                    fcolIdx=2;
                }
                else if(b=='j'){
                    srowIdx=2;
                    scolIdx=2;
                }
            }
        }
        if(frowIdx==srowIdx){
            if(fcolIdx==4)
                fcolIdx=-1;
            if(scolIdx==4)
                scolIdx=-1;
            encrypted=encrypted+arr[frowIdx][fcolIdx+1];
            encrypted=encrypted+arr[srowIdx][scolIdx+1];
        }
        else{
            encrypted=encrypted+arr[frowIdx][scolIdx];
            encrypted=encrypted+arr[srowIdx][fcolIdx];
        }
    }

    return encrypted;
}



function matrix(key,arr){
    var arra=Array.from(Array(26));
    for(var i=0;i<26;i++){
        arra[i]=0;
    }
    for(var i=0;i<key.length;i++){
        var t=key.charCodeAt(i);
        arra[t-97]=1;
    }
    var i=0,j=0;
    for(var t=0;t<key.length;t++){
        var k=key.charCodeAt(t)-97;
        if(arra[k]===1){
            if(k===9){
                if(arra[k-1]!==2){
                    var temp=String.fromCharCode(97+k-1);
                    arr[i][j]=temp;
                    j++;
                }
                arra[k-1]=2;
                
            }
            else if(k===8 && arra[k]!==2){
                var temp=String.fromCharCode(97+k);
                arr[i][j]=temp;
                arra[k]=2;
                j++;
            }
            else{
                var temp=String.fromCharCode(97+k);
                arr[i][j]=temp;
                j++;
                arra[k]=2;
            }
        }
        if(j===5){
            i++;
            j=0;
        }
    }
    for(var k=0;k<26;k++){
        if(arra[k]===0){
            if(k===9){
                if(arra[k-1]!==2){
                    var temp=String.fromCharCode(97+k-1);
                    arr[i][j]=temp;
                    j++;
                }
                arra[k-1]=2;
            }
            else if(k===8 && arra[k]!==2){
                var temp=String.fromCharCode(97+k);
                arr[i][j]=temp;
                arra[k]=2;
                j++;
            }
            else{
                var temp=String.fromCharCode(97+k);
                arr[i][j]=temp;
                j++;
                arra[k]=2;
            }
        }
        if(j===5){
            i++;
            j=0;
        }
    }
    return arr;
}

//Decryption

function getdeinputValue(){
    var inputVal=document.getElementById("encryptedInput").value;
    var key=document.getElementById("encryptedKeyId").value;
    var arr = Array.from(Array(5), () => Array('a','b','c','d','e'));
    inputVal = inputVal.toLowerCase();
    key=key.toLowerCase();
    var keyMatrix= matrix(key,arr);
    // var leastKey=leastCount(inputVal);
    // inputVal=modifyPlainText(inputVal,leastKey);
    var plainText=decrypt(keyMatrix, inputVal);
    document.getElementById("plainInput").innerHTML=plainText;
}

function decrypt(keyMatrix, inputVal){
    var enlen=inputVal.length;
    var frowdec=-1;
    var fcoldec=-1;
    var srowdec=-1;
    var scoldec=-1;
    var decrypted="";

    for(var k=0;k<enlen;k+=2){
        var a=inputVal[k],b=inputVal[k+1];
        if(a==' '){
            decrypted+=' ';
            --k;
            continue;
        }
        for(var i=0;i<5;i++){
            for(var j=0;j<5;j++){
                if(a==keyMatrix[i][j]){
                    frowdec=i;
                    fcoldec=j;
                }
                else if(b==keyMatrix[i][j]){
                    srowdec=i;
                    scoldec=j;
                }
            }
        }
        if(frowdec==srowdec){
            if(fcoldec==0)
                fcoldec=5;
            if(scoldec==0)
                scoldec=5;
            decrypted+=keyMatrix[frowdec][fcoldec-1];
            decrypted+=keyMatrix[srowdec][scoldec-1];
        }
        else{
            decrypted+=keyMatrix[frowdec][scoldec];
            decrypted+=keyMatrix[srowdec][fcoldec];
        }
    }
    return decrypted;
}
