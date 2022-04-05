import { LightningElement, wire, api, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactsController.getContactsByAccountId';
import updateContacts from '@salesforce/apex/ContactsController.updateContacts'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
export default class Contacts extends LightningElement {
    @api accountId;
    contacts;
    name='';
    draftValues=[];
    wiredContactList = [];
    
    columns = [
                {label:"First Name",  editable:true, fieldName:"FirstName"},
                {label:"Last Name", editable:true, fieldName:"LastName"},
                {label:"Phone", editable:true,fieldName:"Phone"},
                {label:"Alias", editable:true,fieldName:"Alias__c"},
                {label:"Company",fieldName:"Account.Name"}
            ];

    handleOnChange(event){
        this.name = event.detail.value;
    }

    @wire(getContacts,{accountId: '$accountId', searchKey : '$name'})
    wireContacts(result){
        console.log('wired');
        if(result.data){
            this.wiredContactList = result;
            this.contacts = result.data.map(contact=>{
                //assign the iterated value as a new intance of the con variable
                let con = Object.assign({}, contact);
                //remap the value of the object Account.Name to a key called Account.Name
                con["Account.Name"] = contact.Account.Name;
                //other way to do this is
                //let con = {...contact, "Account.Name" : contact.Account.Name};
                return con;
            });
        }else if(result.error){
            console.error(result.error);
        }
    }

    constructor(){
        super();
        console.log("Dragon Ball");
    }

    renderedCallback(){
        console.log('renderedCallback');
        console.log({wireContacts:this.wiredContacts});
    }

    connectedCallback(){
        console.log('connected');
    }

    disconnectedCallback(){
        console.log('disconnected');
    }

    handleSave(event){
        console.table(event.detail.draftValues);
        updateContacts({contactList:event.detail.draftValues}).then(()=>{
            //dispatch a toast message
            this.dispatchEvent(new ShowToastEvent({message:"Successfully updated contact",variant:"success"}));
            //clear the draft values of the data table
            this.draftValues = [];
            //refresh wire method if a change in the database is detected
            return refreshApex(this.wiredContactList);
        }).catch(err=>{
            console.error(err);
        }).finally(()=>{
            console.log('finally');
        });
    }

}