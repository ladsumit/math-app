export function generateQuestion(grade: string | null, previousProblem: string | null = null) {
    let problem = "";
    let answer = 0;
  
    // Loop to ensure the new question is unique
    do {
      const num1 = grade === "1" ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 99) + 1; // 1-digit or 2-digit based on grade
      const num2 = grade === "1" ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 99) + 1; // 1-digit or 2-digit based on grade
      const operations = grade === "1" ? ["+", "-"] : ["+", "-", "*", "/"];
      const operation = operations[Math.floor(Math.random() * operations.length)];
  
      switch (operation) {
        case "+":
          problem = `${num1} + ${num2}`;
          answer = num1 + num2;
          break;
        case "-":
          const largerNum = Math.max(num1, num2);
          const smallerNum = Math.min(num1, num2);
          problem = `${largerNum} - ${smallerNum}`;
          answer = largerNum - smallerNum;
          break;
        case "*":
          // restrict one of the numbers to single digit
          // Ensure one number is always single-digit (0–9)
          const singleDigit = Math.floor(Math.random() * 10);
          problem = `${num1} x ${singleDigit}`;
          answer = num1 * singleDigit;
          break;
        case "/":
          // Ensure denominator is always a single digit (1–9)
          // We will use a random single digit (1–9) as denominator
          const denominator = Math.floor(Math.random() * 9) + 1;
          // Ensure division is clean
          const dividend = num1 * denominator;
          problem = `${dividend} ÷ ${denominator}`;
          answer = dividend / denominator;
          break;
      }
    } while (problem === previousProblem);
  
    return { problem, answer };
  }
  