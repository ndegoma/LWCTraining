import { LightningElement, track } from 'lwc';

export default class TrackExample extends LightningElement {
    @track contacts = []; 
    handleClick(event) {
        //retreive the input element
        let element = this.template.querySelector('lightning-input');
        if(element.value){
            //add value to the array of contacts
            this.contacts.push(element.value);
            //clear the value of the input element
            element.value = null;
        }
    }
}