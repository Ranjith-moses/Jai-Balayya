import { LightningElement, wire } from 'lwc';
import {publish, MessageContext} from 'lightning/messageService';
import searchMessege from '@salesforce/messageChannel/search__c';

export default class SearchFunctionality extends LightningElement {
    
    @wire(MessageContext)
    messageContext;

    handleKeyUp(event){

        let inputValue = this.template.querySelectorAll("lightning-input")[0].value;
        console.log('gameengine time', inputValue);

        const payload = { isTermValid:true, searchTerm:inputValue };

        publish(this.messageContext, searchMessege, payload);
    }
}
