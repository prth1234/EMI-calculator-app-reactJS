export function calculateRepaymentSchedule({loanAmount, interestRate, loanTerm, startDate, paymentFrequency}) {
    const monthlyInterestRate = interestRate / 100 / 12;
    let numberOfPayments;
    switch (paymentFrequency) {
      case 'weekly':
        numberOfPayments = loanTerm * 4;
        break;
      case 'biweekly':
        numberOfPayments = loanTerm * 2;
        break;
      case 'monthly':
        numberOfPayments = loanTerm;
        break;
      case 'quarterly':
        numberOfPayments = loanTerm / 3;
        break;
      default:
        throw new Error('Invalid payment frequency');
    }
  
    const monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const paymentSchedule = [];

    let remainingBalance = loanAmount;

    let totalPayment = 0;

    for (let i = 0; i < numberOfPayments; i++) {
      const interest = remainingBalance * monthlyInterestRate;
      const principal = monthlyPayment - interest;
      remainingBalance -= principal;
    
      let paymentDate;
      switch (paymentFrequency) {
        case 'weekly':
          paymentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (i * 7));
          break;
        case 'biweekly':
          paymentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (i * 14));
          break;
        case 'monthly':
          paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, startDate.getDate());
          break;
        case 'quarterly':
          paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + (i * 3), startDate.getDate());
          break;
        default:
          throw new Error('Invalid payment frequency');
      }

      const number = i + 1;
      const total = principal + interest;
      totalPayment += principal;

      paymentSchedule.push({
        number,
        paymentDate,
        principal,
        interest,
        total,
        totalPayment,
        remainingBalance
      });
    }
    return paymentSchedule;
  }