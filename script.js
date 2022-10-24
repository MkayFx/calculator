// Variables

let clearAll = document.querySelector('.clear-all');
let clear = document.querySelector('.clear');
let backspace = document.querySelector('.bck-spc');
let answer = 0;
let operators = Array.from(document.querySelectorAll('.operators'));
let sign = '';
let feedback = document.querySelector('.feedback');
feedback.textContent = '';
let result = document.querySelector('.result');
result.textContent = 0;
let numbers = Array.from(document.querySelectorAll('.numbers'));
let container = '0';
let fnum = 0;
let equal = document.querySelector('.equals');

//Event Listeners for Display Numbers

// These statements listen for input (making sure that '0' and '.' arent repeated) and assigns them to a variable 'container'
numbers.forEach(function(number){
    number.addEventListener('click', function(e){

        if(container == '0')
            if(number.textContent == '.'){
                container += number.textContent 
            }
            else if(number.textContent == "0" || number.textContent == '00'){
                return
            }
            else{
                container = number.textContent;
        }
        else{
            if(container.includes('.') && number.textContent == '.' ){
                return
            }
            else{
                container += number.textContent;
            }
        }

        answer = 0;    // This is only here cause the Equals sign assigns answer a value and we need to set it back to 0.
        result.textContent = container;    // This is just for display
        //console.log(container);
    })
})


// Functions for the operators
function add(num){
    let initial = 0;
    initial += num;
    fnum += initial;
}

function multiply(num){
    fnum *= num;
}

function divide(num){
    fnum /= num;
}

function subtract(num){
    fnum -= num;
}

function equals(){
    if(sign == '+'){
        add(Number(container));
    }
    else if(sign == '*'){
        multiply(Number(container));
    }
    else if(sign == '-'){
        subtract(Number(container));
    }
    else{
        divide(Number(container));
    }
}



//Event Listeners for Operators
operators.forEach(function(operator){
    operator.addEventListener('click', function(e){
        //console.log(`fnum is ${fnum}`)
        if(container == 0){
            container = answer;          // sets container to answer in the event that a user continues from previous operation
        }

        if(fnum == 0){
            fnum = Number(container);    
        }
        else{
            if(sign == '+'){
                add(Number(container));
            }
            else if(sign == '*'){
                multiply(Number(container));
            }
            else if(sign == '-'){
                subtract(Number(container));
            }
            else{
                divide(Number(container));
            }
        }

        sign = operator.textContent;
        feedback.textContent = (`${fnum} ${sign}`);
        container = 0;
        //console.log({container, sign, fnum})
    })
})


//Event Listener for Equals sign

equal.addEventListener('click', function(e){
    equals();

    result.textContent = fnum;
    answer = fnum;
    container = 0;
    sign = '';                  //Sets everything back to default.
    fnum = 0;
    feedback.textContent = '';
})

//Event Listener for Clear buttons
clearAll.addEventListener('click', function(e){
    feedback.textContent = '';
    result.textContent = 0;
    container = 0;
    fnum = 0;
    sign = '';
    answer = 0;
})

clear.addEventListener('click', function(e){
    result.textContent = 0;
    container = 0;
})

backspace.addEventListener('click', function(e){
    let back = container.slice(0, (container.length - 1)) ;     // Removes the last string from container
    //console.log(back);
    container = back;
    //console.log(container);
    result.textContent = container;
})