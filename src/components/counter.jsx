import React, { Component } from 'react';
import { evaluate } from 'mathjs';


const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['*','/','+','-','=']



class Counter extends Component {
    
    state = { 
        value : 0,
        displayValue : '0',
        waitingforOperand: false,
        operator: null,
        firstOperand : '0',
        clearAll : true,

    }

    componentDidMount() {
        document.addEventListener('keypress', this.logKey);
    }


     
    render() { 
        
        return ( 
            <div class="row">
                <div class="col-sm-9">
                  
                <span id="display" onChange={this.handleChange}>{this.state.displayValue}</span>
                        

                <div class="row">
                    <button 
                        onClick = {this.handleClick}
                        value = "9"
                        className="btn btn-secondary btn-sm m-2">9
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "8"
                        className="btn btn-secondary btn-sm m-2">8
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "7"
                        className="btn btn-secondary btn-sm m-2">7
                    </button>
                    <button
                        onClick = {this.handleClick} 
                        value = "C"
                        className="btn btn-secondary btn-sm m-2">C
                    </button>
                </div>
                <div class="row">
                    <button 
                        onClick = {this.handleClick}
                        value = "6"
                        className="btn btn-secondary btn-sm m-2">6
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "5"
                        className="btn btn-secondary btn-sm m-2">5
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "4"
                        className="btn btn-secondary btn-sm m-2">4
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "/"
                        className="btn btn-secondary btn-sm m-2">÷
                    </button>
                </div>
                <div class="row">
                    <button 
                        onClick = {this.handleClick}
                        value = "3"
                        className="btn btn-secondary btn-sm m-2">3
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "2"
                        className="btn btn-secondary btn-sm m-2">2
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "1"
                        className="btn btn-secondary btn-sm m-2">1
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "*"
                        className="btn btn-secondary btn-sm m-2">×
                    </button>
                </div>
                <div class="row">
                    <button 
                        onClick = {this.handleClick}
                        value = "0"
                        className="btn btn-secondary btn-sm m-2">0
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "+"
                        className="btn btn-secondary btn-sm m-2">+
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "-"
                        className="btn btn-secondary btn-sm m-2">-
                    </button>
                    <button 
                        onClick = {this.handleClick}
                        value = "="
                        className="btn btn-secondary btn-sm m-2">=
                    </button>
                </div>
                </div>
          </div>
        );
    }


    handleClick = (e) => {
      this.processNewPressKey(`${e.target.value}`);
    };


    processNewPressKey(newKeyValue){
        const isNumber = numbers.includes(newKeyValue);
        const  isOperator = operators.includes(newKeyValue);
         
        if(isNumber){
            this.processnumbers(newKeyValue);
        }
        else if(isOperator){
            this.processOperator(newKeyValue);
        }
        else{
            this.processOtherKey(newKeyValue);
        }
    };


    processnumbers(newKeyValue){
        const {displayValue, waitingforOperand} = this.state;
        // console.log(displayValue, waitingforOperand);
        
        if(waitingforOperand){
            this.setState({displayValue:`${newKeyValue}`, waitingforOperand:false, clearAll: false})
        }else{
            console.log((displayValue === 0), newKeyValue);
            let newDisplayValue = (displayValue === '0') ? `${newKeyValue}` : `${(displayValue)}${newKeyValue}`
            // console.log('newDisplayValue',newDisplayValue);
            this.setState({displayValue: `${newDisplayValue}`, clearAll:false})
        }
    };

    processOperator(newKeyValue){
        const {displayValue, operator, waitingforOperand, firstOperand} = this.state;
        console.log(displayValue, operator==null, waitingforOperand, firstOperand);
        let newDisplayValue = null;
        let newOperator = null;
        let stringToEvaluate = null;

        if(firstOperand === '0' || operator === null || operator === 'null' || waitingforOperand ){
            console.log('inside',newKeyValue);
            this.setState({waitingforOperand: true, operator:newKeyValue, firstOperand: displayValue, clearAll:false});
            return;
        }
        else{
            console.log('firstOperand',firstOperand,'operator',operator,'displayValue',displayValue);
            stringToEvaluate = `${firstOperand}${operator}${displayValue}`;
            try{
                newDisplayValue = `${evaluate(stringToEvaluate)}`;
            } catch(e){
                console.log('e',e);
                newDisplayValue = '0';
            }
        }
        newOperator = (newKeyValue === '=') ? null : newKeyValue;
        this.setState({displayValue:  `${newDisplayValue}`, waitingforOperand: true, firstOperand: `${newDisplayValue}`, operator:`${newOperator}`, clearAll:false})
    };

    processOtherKey(newKeyValue){
        switch(newKeyValue){
            case 'C':
                this.processClear(newKeyValue);
                break;
            case '.':
                this.processPoint(newKeyValue);
                break;
            default:
                this.processUnexpKey(newKeyValue);


        }
    };

    processClear(){
        const { clearAll } = this.state;
        // console.log('clear All', clearAll);
        if (clearAll){
            this.setState({displayValue:'0',firstOperand:'0',operator:null, waitingforOperand:false,clearAll:true})
        }else{
            this.setState({displayValue:'0', clearAll:true});
        }
    };

    logKey = (e)=> {
        console.log('e',e.key);
        this.processNewPressKey(e.key);
    };


    processUnexpKey(newKeyValue){
        console.log('Unexpected Input:'+ newKeyValue);
    };


    

}
 
export default Counter;