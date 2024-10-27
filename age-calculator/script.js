const months = [31,28,31,30,31,30,31,31,30,31,30,31];

function ageCalculate(){
    let todatDate = new Date();
    let inpDate = new Date(document.getElementById("date-ip").value);
    let birthMonth,birthDate,birthYear;
    let birthDetails = {
        date:inpDate.getDate(),
        month:inpDate.getMonth()+1,
        year:inpDate.getFullYear()
    }
    let currYear = todatDate.getFullYear();
    let currMonth = todatDate.getMonth()+1;
    let currDate = todatDate.getDate();

    leapChecker(currYear);

    if(
        birthDetails.year > currYear ||
        ( birthDetails.month > currMonth && birthDetails.year == currYear) || 
        (birthDetails.date > currDate && birthDetails.month == currMonth && birthDetails.year == currYear)
    ){
        alert("Not Born Yet");
        displayResult("-","-","-");
        return;
    }

    birthYear = currYear - birthDetails.year;

    if(currMonth >= birthDetails.month){
        birthMonth = currMonth - birthDetails.month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currMonth - birthDetails.month;
    }

    if(currDate >= birthDetails.date){
        birthDate = currDate - birthDetails.date;
    }
    else{
        birthMonth--;
        let days = months[currMonth - 2];
        birthDate = days + currDate - birthDetails.date;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDate,birthMonth,birthYear);
}

function displayResult(bDate,bMonth,bYear){
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function leapChecker(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}