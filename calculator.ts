// This code implements a simple calculator that can handle addition, subtraction, multiplication, and division of single-digit integers.
function calculate(expression: string): number | undefined {
    const len = expression.length;
    if (len === 0 || len === 2) {
        throw new Error("Expression cannot be empty or of length 2");
    }
    if (len === 1) {
        const num = parseInt(expression);
        if (isNaN(num)) {
            throw new Error("Invalid number");
        }
        return num;
    } else {
        const hasAddSub = findAddSub(expression);
        if (!hasAddSub) { // all multiplication or division
            let result: number | undefined = undefined;
            for (let i = 1; i < len; i += 2) {
                const ch = expression[i];
                // console.log(`lhs = ${expression[i - 1]}`);
                const num1 = parseInt(expression[i - 1]);
                // console.log(`num1 = ${num1}'`);
                if (result === undefined) {
                    result = num1;
                }
                // console.log(`rhs = ${expression[i + 1]}`);
                const num2 = parseInt(expression[i + 1]);
                // console.log(`num2 = ${num2}'`);
                if (ch === '*') {
                    result *= num2;
                } else {
                    result /= num2;
                }
                // console.log(`Intermediate result after processing '${expression[i - 1]} ${ch} ${expression[i + 1]}': ${result}`);
            }
            // console.log(`Final result after multiplication/division: ${result}`);
            return result;
        } else { // find the first + or - operator and recurse
            const operatorIndex = findAddOrSubOperatorIndex(expression);
            if (operatorIndex === -1) {
                throw new Error("No addition or subtraction operator found in the expression");
            } else {
                const left = expression.slice(0, operatorIndex);
                // console.log(`Left part of expression: '${left}'`);
                const right = expression.slice(operatorIndex + 1);
                // console.log(`Right part of expression: '${right}'`);
                const operator = expression[operatorIndex];
                // console.log(`Operator found: '${operator}'`);

                const leftValue = calculate(left);
                // console.log(`Left value for '${left}': ${leftValue}`);
                const rightValue = calculate(right);
                // console.log(`Right value for '${right}': ${rightValue}`);
                if (leftValue === undefined || rightValue === undefined) {
                    throw new Error("Invalid left or right expression");
                }

                if (operator === '+') {
                    return leftValue + rightValue;
                } else if (operator === '-') {
                    return leftValue - rightValue;
                } else {
                    throw new Error(`Unknown operator: ${operator}`);
                }
            }
        }
    }
    return undefined; // This line is unreachable but added to satisfy TypeScript's return type requirement
    
}

function findAddSub(expression: string): boolean {
    for (const ch of expression) {
        if (ch === '+' || ch === '-') {
            return true;
        }
    }
    return false;
}

function findAddOrSubOperatorIndex(expression: string): number {
    for (let i = 0; i < expression.length; i++) {
        const ch = expression[i];
        if (ch === '+' || ch === '-') {
            return i;
        }
    }
    return -1;
}

console.log(`2+3*4-5 = ${calculate("2+3*4-5")}`); // 9
console.log(`4/2*3+4-5 = ${calculate("4/2*3+4-5")}`); // 5
console.log(`2*3+4/2 = ${calculate("2*3+4/2")}`); // 8
console.log(`2+3 = ${calculate("2+3")}`); // 5
console.log(`2-3 = ${calculate("2-3")}`); // -1
console.log(`2*3 = ${calculate("2*3")}`); // 6
console.log(`6/2 = ${calculate("6/2")}`); // 3
console.log(`2+ = ${calculate("2+")}`); // Error: Expression cannot be empty or of length 2