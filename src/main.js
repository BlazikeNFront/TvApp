

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
        let image;
        let showSummary;
        if(show.image === null){
          image = 'https://picsum.photos/220/309'
        }
          else {image = show.image.medium }    // check if image exist if not give random img from lorem picsum(need more specific placcehoder???)
       if(show.summary === null){
            imashowSummaryge = 'There is no summary for that show yet'
          }
          const arr = Array.from(show.summary.split(" ").splice(0,30)); //shortens of summaries
          arr.push('...')
          const shortShowSummary = arr.join(" ");
        
           
        
        const divCard = createDOMElement('div','card',);
        
        const img = createDOMElement('img','card-img-top',null, image);
        const div = createDOMElement('div','card-body');
        const h5 = createDOMElement('h5','card-title',show.name);
        const p = createDOMElement('p','card-text',shortShowSummary);
        const button = createDOMElement('button',',btn btn-primary','Show more...');

        
        divCard.appendChild(img);
        divCard.appendChild(div);
        div.appendChild(h5);
        div.appendChild(p);
        div.appendChild(button);

        this.domElements.showWrapper.appendChild(divCard)
      }

      renderShowList = (shows) => {
        this.domElements.showWrapper.innerHTML = '';

      for (let {show}of shows){
        this.createShowCard(show)
      }
      }
}













document.addEventListener('DOMContentLoaded',() =>{
new tvApp();

})