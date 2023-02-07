import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import bulmacss from '@salesforce/resourceUrl/bulmacss';
import bulmavideo from '@salesforce/resourceUrl/bgvideo';
export default class Lds extends LightningElement {
    sfvideo = bulmavideo;
    connectedCallback() {
        loadStyle(this, bulmacss);
    }
}


   

