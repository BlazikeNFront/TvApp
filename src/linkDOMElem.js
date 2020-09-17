
export const linkDOMElements = (dataAttribute,list) => {
    const domElements = {};

    for(let elem of list){
        domElements[elem] = document.querySelector(`[data-${dataAttribute} = ${elem}]`);
        
    }
    
    return domElements
}


