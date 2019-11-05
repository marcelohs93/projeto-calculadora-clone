class CalcController {

    //Metodo construtor
    constructor(){

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

    //Metodo para limpar toda a calculadora - Cria um novo array 
    clearAll(){
        this._operation = [];
    }

    //Metodo para apagar a ultima entrada - Deleta o ultimo elemento do array
    clearEntry(){
        this._operation.pop();
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

    calc(){

        let last = this._operation.pop();

        let result = eval(this._operation.join(''));

        this._operation = [result, last];



    }

    setNumberToDisplay(){
            

    }

    //Metodo principal que adiciona os dados nos arrays
    addOperatoration(value){
        
        //Verifica se o utlimo valor do array nao e um numero
        if(isNaN(this.getLastOperation())){

            //String
            if(this.isOperator(value)){
                //trocar operador
                this.setLastOperation(value);

            }else if(isNaN(value)){
                //outra coisa
                console.log('outra coisa ', value);

            }else{

                this.pushOperation(value);
            
            }   

        }else{

            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));  

                this.setNumberToDisplay();
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
                break;
            case 'ponto':
                this.addOperatoration('.');
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