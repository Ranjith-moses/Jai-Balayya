import { api, LightningElement,wire } from 'lwc'; 
import { 
    subscribe, 
    unsubscribe, 
    APPLICATION_SCOPE, 
    MessageContext 
} from 'lightning/messageService'; 
import searchMessage from '@salesforce/messageChannel/search__c'; 
import insertContact from '@salesforce/apex/searchCls.insertContact'; 
import insertContact1 from '@salesforce/apex/searchCls.insertContact1'; 
import { getRecord } from 'lightning/uiRecordApi'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import Account from '@salesforce/schema/Account.Name'; 
const QUERY_USER_ENDPOINT_URL='https://api.github.com/search/users?q='; 
export default class listOfUsers extends LightningElement { 
     @api personName; 
    selecteduser =''; 
    selecteduserArray=[]; 
    retrivedusers=[]; 
    subscription = null; 
    retriveduserName=''; 
      @wire(getRecord, { recordId: '0012w00001HqTIvAAN', fields: 'Account.Name' }) 
    wiredRecord({ error, data }) { 
    if(error){ 
console.log(error) ; 
    }else if(data){ 
        console.log(data); 
        this.retriveduserName=data.fields.Name.value; 
    } 
    } 
    @wire(MessageContext) 
    messageContext; 
    connectedCallback() { 
        this.subscribeToMessageChannel(); 
    } 
    disconnectedCallback() { 
        this.unsubscribeToMessageChannel(); 
    } 
    subscribeToMessageChannel() { 
        if (!this.subscription) { 
            this.subscription = subscribe( 
                this.messageContext, 
                searchMessage, 
                (message) => this.handleMessage(message), 
                { scope: APPLICATION_SCOPE } 
            ); 
        } 
    } 
    async handleMessage(message) {
        console.log('handleMessage:', message);
        this.personName = message.searchTerm;
        let queryEndPoint = QUERY_USER_ENDPOINT_URL + this.personName;
        try {
            const RESPONSE = await fetch(queryEndPoint);
            const USER_LIST = await RESPONSE.json();
            console.log(USER_LIST.items);
            this.retrivedusers = USER_LIST.items;
            if (this.retrivedusers.length === 0) {
                throw new Error('No users found with the given git hub username.');
            }
        } catch(error) {
            console.log(error);
            const toastEvent = new ShowToastEvent({
                title: 'Error',
                message: error.message,
                variant: 'error',
            });
            this.dispatchEvent(toastEvent);
        }
    }
    unsubscribeToMessageChannel() { 
        unsubscribe(this.subscription); 
        this.subscription = null; 
    } 
     handleonuserclicked(event){ 
        console.log(event.detail); 
    this.selecteduser=event.detail; 
    this.selecteduserArray.push(event.detail); 
    } 
    get showuser(){ 
        return this.selecteduser.length != 0 ? true: false; 
    } 
    async handleSaveUserClick(){ 
        console.log('save user in SF'); 
                try{ 
        const issuccess=await insertContact1({accNameList:this.selecteduserArray}); 
        const evt = new ShowToastEvent({ 
            title: 'Records Saved in Accounts', 
            message: 'Selected record is saved in Accounts', 
            variant: 'info', 
        }); 
        this.dispatchEvent(evt); 
        console.log('created creation'+issuccess); 
        }catch(error){ 
        console.log(error); 
        } 
            } 

           
}