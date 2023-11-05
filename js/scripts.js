const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // Adiciona dígito na tela
    addDigit(Digit) {
        // Verifica se o número já possui ponto
        if (Digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = Digit;
        this.updateScreen();
    }

    // Processa as operações da calculadora
    processOperation(operation) {
        // Verifica se o valor atual está vazio
        
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // Mudança de operação 
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Obter valores atuais e anteriores
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "÷":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "x":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "<":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperation();
                break;
            default:
                return;
        }
    }

    // Altera o valor da tela da calculadora.
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null,
    ) {
        console.log(operationValue, operation, current, previous);

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Verificar se o valor é zero, se for, adicionar o valor atual.
            if (previous === 0) {
                operationValue = current;
            }

            // Adicionar o valor atual no anterior.
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // Altera a operação matemática.
    changeOperation(operation) {
        const mathOperations = ["x", "÷", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Deleta o último dígito.
    processDelOperation() {
        this.currentOperationText.innerText =
        this.currentOperationText.innerText.slice(0, -1);
    }

    // Limpa operação atual.
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    // Limpa todas as operações.
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Mostra o resultado da operação.
    processEqualOperation() {
        const operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);

        // Adicionar o valor do resultado da operação atual ao currentOperationText.
        this.currentOperationText.innerText = this.previousOperationText.innerText.split(" ")[0];

        // Apagar o resultado da previousOperationText.
        this.previousOperationText.innerText = "";
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
