class CalcController {

    //Metodo construtor
    constructor(){

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dataEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize()
        this.initButtonsEvents()

    }    

    initialize(){

        this.setDisplayDateTime()
        let interval = setInterval(()=>{
            this.setDisplayDateTime()
        }, 1000);   

        this.setLastNumberToDisplay()
    }

    //Metodo para adicionar multiplos tipos de eventos aos elementos
    addEventListenerall(element, events, fn){
        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }   

    //metodo para settar o erro na calculaodra
    setError(){
        this.displayCalc = "Error";
    }


    addDot(){

        let lastOperation = this.getLastOperation();

        if ( this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();



    }


    //Metodo para limpar toda a calculadora - Cria um novo array 
    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay()
    }

    //Metodo para apagar a ultima entrada - Deleta o ultimo elemento do array
    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay()
    }   

    //retorna o ultima elemento do array 
    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    //Substirui o ultimo valor do Array pelo valor atual 
    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    //Verifica se o valor inserido e um operador
    isOperator(value){
        return (['+','-', '/', '*', '%'].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){
            this.calc();
        }
    }
    getResult(){
        return eval(this._operation.join(''));
    }


    calc(){

        let last = '';
        this._lastOperator = this.getLastItem();


        if(this._operation.length < 3 ){

            let firstItem = this._operation[0]; 
            this._operation = [firstItem, this._lastOperator, this.lastNumber];
        }

        if (this._operation.length > 3){

            let last = this._operation.pop();
            
            this._lastNumber = this.getResult();

        } else if (this._operation == 3){
            
            this._lastNumber = this.getLastItem(false);

        }



        let result = this.getResult();

        if(last == '%'){

            result /= 100;
            this._operation = [result];

        }else{
            this._operation = [result];

            if (last) this._operation.push(last);

        }

        this.setLastNumberToDisplay()

    }

    getLastItem(isOperator = true){

        let lastItem;

        for(let i = this._operation.length-1; i >= 0; i--){
   
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }


        }   
        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;


    }



    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    //Metodo principal que adiciona os dados nos arrays
    addOperatoration(value){
        
        //Verifica se o utlimo valor do array nao e um numero
        if(isNaN(this.getLastOperation())){

            //String
            if(this.isOperator(value)){
                //trocar operador
                this.setLastOperation(value);

            }else {

                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }   

        }else{

            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseFloat(newValue));  

                this.setLastNumberToDisplay();
            }
  
        }
    }

    //Metodo para executar o valor do botao
    execBtn(value){

        switch(value){

            case 'ac'://limpa toda a memoria de calculo
                this.clearAll();
                break;
            
            case 'ce'://cancela a ultima entrada
                this.clearEntry();
                break;

            case 'soma':
                this.addOperatoration('+');
                break;

            case 'subtracao':
                this.addOperatoration('-');
                break;

            case 'divisao':
                this.addOperatoration('/');
                break;

            case 'multiplicacao':
                this.addOperatoration('*');
                break;

            case 'porcento':
                this.addOperatoration('%');
                break;

            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperatoration(parseInt(value));
                break;


            default:
                this.setError();
                break;



        }


    }


    //Metodo para inicializar as funcoes dos botoes e estilo do mouse
    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

            buttons.forEach(btn => {
                this.addEventListenerall(btn, "click drag", e => {
                    
                    
                    let textBtn = btn.className.baseVal.replace("btn-","");

                    this.execBtn(textBtn);
                })

                this.addEventListenerall(btn, "mouseover mouseup mousesown", e =>{
                    btn.style.cursor = "pointer";
                })
            })
    }

    //Metodo para atualizacao da Data e Hora
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
    }


    //Getters and Setters
    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dataEl.innerHTML;
    }
 
    set displayDate(value){
        this._dataEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }


}