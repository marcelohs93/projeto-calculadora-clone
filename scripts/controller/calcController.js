class CalcController {

    //Metodo construtor
    constructor(){

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


    //Metodo para inicializar as funcoes dos botoes e estilo do mouse
    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

            buttons.forEach(btn => {
                this.addEventListenerall(btn, "click drag", e => {
                    console.log(btn.className.baseVal.replace("btn-",""));
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