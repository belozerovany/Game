class Game {
        constructor() {
            this.block = document.querySelector('#field');
            this.score = document.querySelector('.score');  
            this.left = 0; 
          
            setInterval( () => { 
               this.square = new Box();   
            }, 700);

            this.block.addEventListener('click', this.clikElement.bind(this)); 
            this.block.addEventListener('dblclick', this.clikElement.bind(this)); 
        }
        clikElement(){
     
            let target = event.target || e.srcElement ;
            if(target.classList.contains('element')){
                target.parentNode.removeChild( target);
                this.counterPlus();
                target = null;
            } 
        }
        counterPlus(){
            let numPluss = this.score.innerHTML;
            this.score.innerHTML =  `${+numPluss + 50}`;
        }      
    }

    class Box {
        constructor(){
            this.block = document.querySelector('#field'); 
            this.blockMetrics = this.block.getBoundingClientRect(); 
            this.element;
            this.createGameElement ();
            this.moveElement();
            this.score = document.querySelector('.score');    
        }
        createGameElement (){
            this.element = document.createElement('div');
            this.element.className = 'element';
            this.element.style.left =`${Math.floor(Math.random()*(this.block.offsetWidth -50 +1))}px`;
            this.element.style.backgroundColor =`#${Math.floor( Math.random()*16777215).toString(16)}`; //'#' + Math.floor(Math.random()*16777215).toString(16); 
            
            this.block.appendChild(this.element); 
            this.elementMetrics = this.element.getBoundingClientRect();
            
            
        }
        moveElement(){
            let top = 0;
            this.move = setInterval( () => {
                this.element.style.top = `${top++}px`; 
                let height = top + this.elementMetrics.height +this.elementMetrics.top;

                    if(this.element.parentNode !=null && (top + this.elementMetrics.height +this.elementMetrics.top) >= this.blockMetrics.bottom ){
                        
                         this.element.parentNode.removeChild( this.element);
                         this.counterMinus();
                         clearInterval(this.move);    
                         this.element = null;
                    }
            }, 15);  
        }
        counterMinus(){
            let num = this.score.innerHTML;
            this.score.innerText =  `${+num - 50}`; 
            clearInterval(this.move);
        }
    }


    const startGame = document.getElementById('start');
    const stopGame = document.getElementById('stop');
    function goGame (){
        new Game();
    }
   
    startGame.addEventListener('click', goGame);
    stopGame.removeEventListener('click', goGame);