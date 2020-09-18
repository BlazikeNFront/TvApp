

import {linkDOMElements} from '/src/linkDOMElem.js';
import {getShows} from '/src/apiServ.js';
import {createDOMElement} from '/src/linkDOMElem.js';

class tvApp{
    constructor(){
        this.domElements = {};
        this.showNameButton = {};
        this.selectedName = 'Dog';
        this.initApp();
        this.eventListerners();
       
    }

    initApp = () => {
       const listDataGrab = Array.from(document.querySelectorAll('[data-grab]')).map(item => item.dataset.grab);
       const listDataGenre = Array.from(document.querySelectorAll('[data-genre]')).map(item => item.dataset.genre);
      
       this.domElements = linkDOMElements('grab',listDataGrab);
       console.log()
       this.showNameButton = linkDOMElements('genre',listDataGenre);
       
    }
    eventListerners = () => {
        for (let item in this.showNameButton){
           
            this.selectedTag = () => {
                this.selectedName = item;
                this.displayTvShow();
               
            }

           this.showNameButton[item].addEventListener('click', this.selectedTag)
        }
    }

     displayTvShow = () => {
         getShows(this.selectedName).then(data =>this.renderShowList(data))
         
        }
         
      createShowCard = (show) => {
        const divCard = createDOMElement('div','card');
        const img = createDOMElement('img','card-img-top',null, show.image.medium);
        const div = createDOMElement('div','card-body');
        const h5 = createDOMElement('h5','card-title',show.name);
        const p = createDOMElement('p','card-text',show.summary);
        const button = createDOMElement('button',',btn btn-primary','Show more...');

        
        divCard.appendChild(img);
        divCard.appendChild(div);
        div.appendChild(h5);
        div.appendChild(p);
        div.appendChild(button);

        this.domElements.showWrapper.appendChild(divCard)
      }

      renderShowList = (shows) => {
      for (let {show}of shows){
        this.createShowCard(show)
      }
      }
}













document.addEventListener('DOMContentLoaded',() =>{
new tvApp();

})