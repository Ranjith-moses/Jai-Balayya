import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import bulmacss from '@salesforce/resourceUrl/bulmacss';

export default class Lds extends LightningElement {
    connectedCallback() {
        loadStyle(this, bulmacss);
    }
}


   

