
function Encryption(){
    var planText = PlainTextInput();
    var encryptionSecurityKey = EncryptionSecurityKeyInput();
    // console.log(planText);
    // console.log(encryptionSecurityKey);

}

function Decryption(){
    var cipherText = CipherTextInput();
    var decryptionSecurityKey = DecryptionSecurityKeyInput();
    // console.log(cipherText);
    // console.log(decryptionSecurityKey);
}

function PlainTextInput(){
    var inputVal=document.getElementById("plainInput").value;
    // console.log(inputVal);
    return inputVal;
}

function EncryptionSecurityKeyInput(){
    var key=document.getElementById("plainKeyId").value;
    // console.log(key);
    return key;
}

function CipherTextInput(){
    var cipherVal = document.getElementById("encryptedInput").value;
    // console.log(cipherVal);
    return cipherVal;
}

function DecryptionSecurityKeyInput(){
    var key=document.getElementById("encryptedKeyId").value;
    // console.log(key);
    return key;
}