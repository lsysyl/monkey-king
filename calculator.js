// This code implements a simple calculator that can handle addition, subtraction, multiplication, and division of single-digit integers.
function calculate(expression) {
    var len = expression.length;
    if (len === 0 || len === 2) {
        throw new Error("Expression cannot be empty or of length 2");
    }
    if (len === 1) {
        var num = parseInt(expression);
        if (isNaN(num)) {
            throw new Error("Invalid number");
        }
        return num;
    }
    else {
        var hasAddSub = findAddSub(expression);
        if (!hasAddSub) { // all multiplication or division
            var result = undefined;
            for (var i = 1; i < len; i += 2) {
                var ch = expression[i];
                // console.log(`lhs = ${expression[i - 1]}`);
                var num1 = parseInt(expression[i - 1]);
                // console.log(`num1 = ${num1}'`);
                if (result === undefined) {
                    result = num1;
                }
                // console.log(`rhs = ${expression[i + 1]}`);
                var num2 = parseInt(expression[i + 1]);
                // console.log(`num2 = ${num2}'`);
                if (ch === '*') {
                    result *= num2;
                }
                else {
                    result /= num2;
                }
                // console.log(`Intermediate result after processing '${expression[i - 1]} ${ch} ${expression[i + 1]}': ${result}`);
            }
            // console.log(`Final result after multiplication/division: ${result}`);
            return result;
        }
        else { // find the first + or - operator and recurse
            var operatorIndex = findAddOrSubOperatorIndex(expression);
            if (operatorIndex === -1) {
                throw new Error("No addition or subtraction operator found in the expression");
            }
            else {
                var left = expression.slice(0, operatorIndex);
                // console.log(`Left part of expression: '${left}'`);
                var right = expression.slice(operatorIndex + 1);
                // console.log(`Right part of expression: '${right}'`);
                var operator = expression[operatorIndex];
                // console.log(`Operator found: '${operator}'`);
                var leftValue = calculate(left);
                // console.log(`Left value for '${left}': ${leftValue}`);
                var rightValue = calculate(right);
                // console.log(`Right value for '${right}': ${rightValue}`);
                if (leftValue === undefined || rightValue === undefined) {
                    throw new Error("Invalid left or right expression");
                }
                if (operator === '+') {
                    return leftValue + rightValue;
                }
                else if (operator === '-') {
                    return leftValue - rightValue;
                }
                else {
                    throw new Error("Unknown operator: ".concat(operator));
                }
            }
        }
    }
    return undefined; // This line is unreachable but added to satisfy TypeScript's return type requirement
}
function findAddSub(expression) {
    for (var _i = 0, expression_1 = expression; _i < expression_1.length; _i++) {
        var ch = expression_1[_i];
        if (ch === '+' || ch === '-') {
            return true;
        }
    }
    return false;
}
function findAddOrSubOperatorIndex(expression) {
    for (var i = 0; i < expression.length; i++) {
        var ch = expression[i];
        if (ch === '+' || ch === '-') {
            return i;
        }
    }
    return -1;
}
console.log("2+3*4-5 = ".concat(calculate("2+3*4-5"))); // 9
console.log("4/2*3+4-5 = ".concat(calculate("4/2*3+4-5"))); // 5
console.log("2*3+4/2 = ".concat(calculate("2*3+4/2"))); // 8
console.log("2+3 = ".concat(calculate("2+3"))); // 5
console.log("2-3 = ".concat(calculate("2-3"))); // -1
console.log("2*3 = ".concat(calculate("2*3"))); // 6
console.log("6/2 = ".concat(calculate("6/2"))); // 3
console.log("2+ = ".concat(calculate("2+"))); // Error: Expression cannot be empty or of length 2
