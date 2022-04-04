import { LightningElement, track } from 'lwc';

export default class TrackExample extends LightningElement {
    contacts = []; 
    handleClick(event) {
        let element = this.template.querySelector('lightning-input');
        if(element.value){
            this.contacts.push(element.value);
            this.contacts = [...this.contacts];
            element.value = null;
        }
    }
}