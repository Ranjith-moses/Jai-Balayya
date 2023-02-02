import { LightningElement, track } from 'lwc';

export default class Track extends LightningElement {
    @track greetings;
    handlegreet(event){
        this.greetings = event.target.value;
    }
}