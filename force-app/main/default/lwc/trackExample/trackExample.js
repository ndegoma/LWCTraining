import { LightningElement, track } from 'lwc';

export default class TrackExample extends LightningElement {
    @track contacts = []; 
    handleClick(event) {
        let element = this.template.querySelector('lightning-input');
        if(element.value){
            this.contacts.push(element.value);
            element.value = null;
        }
    }
}