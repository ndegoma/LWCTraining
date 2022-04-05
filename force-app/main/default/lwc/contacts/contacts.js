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
                {label:"Company",fieldName:"CompanyName"}
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
                let con = Object.assign({}, contact);
                con["CompanyName"] = contact.Account.Name;
                return con;
            });
        }else if(result.error){
            console.error(result.error);
        }
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

            this.dispatchEvent(new ShowToastEvent({message:"Successfully updated contact",variant:"success"}));
            
            this.draftValues = [];
            return refreshApex(this.wiredContactList);
        }).catch(err=>{
            console.error(err);
        }).finally(final=>{
            console.log('finally');
        });
    }

}