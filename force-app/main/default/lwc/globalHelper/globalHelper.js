const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}

function toTitleCase(value){
    let name = value.split(' ');
    let fixedName = [...name].map(n=>{
        let fixedCase = n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
        return fixedCase.trim();
    });
    return fixedName?.join().replaceAll(',',' ');
}

const fullDate = (datetoFormat)=>{
    const monthName = months[datetoFormat.getMonth()];
    const day = datetoFormat.getDate();
    const year = datetoFormat.getFullYear();
    return `${monthName} ${day}, ${year}`;
}


/*const estimatedSalary = (salary) => {
    let deminimis = 3500;
    let communcationAllowance = 2156;
    let internetAllowance = 2000;
    let wfhALlowance = 2000;
    let sss = 400;
    let pagIbig = 100;
    let philHealth = 400;
    let deduction = (sss + pagIbig + philHealth);
    let netSalary = (((salary - deduction) + communcationAllowance + internetAllowance + wfhALlowance)*.70) + deminimis;
    let tax = (salary - deduction)*.30;
    return {
        grossAmount: netSalary,
        withHoldingTax : tax,
        totalDeduction: deduction
    }
}*/

export{/*estimatedSalary, */fullDate, toTitleCase}

