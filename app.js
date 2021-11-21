function reverseTheString(string){
    var characters = string.split('');
    var reversedCharacters = characters.reverse();
    var reversedString = reversedCharacters.join('');
    return reversedString;
}

function palindrome(string){
    var reverse = reverseTheString(string);
    return string === reverse;
}

function convertDateTostring (date){
    var dateString = {day :'',month:'',year:''};
    if (date.day < 10){
        dateString.day = '0' + date.day;
    }else{
        dateString.day = date.day.toString();
    }

    if (date.month < 10){
        dateString.month = '0' + date.month;
    }
    else{
        dateString.month = date.month.toString();
    }

    dateString.year = date.year.toString();

    return dateString;
}


function dateInAllFormats(date){
    var dateString = convertDateTostring(date);

  var ddmmyyyy = dateString.day + dateString.month + dateString.year;
  var mmddyyyy = dateString.month + dateString.day + dateString.year;
  var yyyymmdd = dateString.year + dateString.month + dateString.day;
  var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
  var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
  var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

  return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];

}

function checkingPalindrome (date){
    var listOfPalindromes = dateInAllFormats(date);

    var condition = false;

    for (var i=0; i<listOfPalindromes.length ; i++){
        if(palindrome(listOfPalindromes[i])){
            condition = true;
            break;
        }
    }
    return condition;

}

function leapYear(year){
    if (year % 400===0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function nextDate(date){
    var totalDaysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var day = date.day +1;
    var month = date.month;
    var year = date.year;

    if(month === 2){
        if(leapYear(year)){
            if (day > 29){
                day = 1;
                month = month +1;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++; 
        }
    }
    }
    else{
        if (day > totalDaysInAMonth[month-1]){
            day = 1;
            month = month +1;
        }
    }

    if (month > 12){
        month = 1;
        year = year + 1;
    }

    return {
        day : day,
        month : month,
        year : year
    };
}


function nextPalindrome(date){
    var counter  = 0;
    var nextDateforChecking = nextDate(date);

    while(1){
        counter++;
        var palindrome = checkingPalindrome(nextDateforChecking);
        if(palindrome){
            break;
        }
        nextDateforChecking = nextDate(nextDateforChecking);
    }
    return [counter , nextDateforChecking];
}


var birthdayinput = document.querySelector('#inputdate');
var button = document.querySelector('.check');
var OutputDiv = document.querySelector('.output');

button.addEventListener('click', clickbutton);

function clickbutton(){
    var inputdate = birthdayinput.value;
    
    if(inputdate !==''){
        var DateDayMonth = inputdate.split('-');
    }

       var date = {
        day : Number(DateDayMonth[2]),
        month : Number(DateDayMonth[1]),
        year :Number(DateDayMonth[0])
    };

    var palindrome = checkingPalindrome(date);

    if (palindrome){
        OutputDiv.innerText = "It is palindrome"
    }
    else{
        var [counter , nextDateforChecking] = nextPalindrome(date);
    
        OutputDiv.innerText = 'The next palindrome date is ' + nextDateforChecking.day + '-' + nextDateforChecking.month + '-' + nextDateforChecking.year +', you missed it by ' + counter+ ' days';
    }
    //console.log(nextDateforChecking.day)
    //console.log(nextDateforChecking.month)
    //console.log(nextDateforChecking.year)

}