import { LightningElement, api, track, wire } from 'lwc';
import { toTitleCase } from 'c/globalHelper';
export default class NameInput extends LightningElement {
    firstName = '';
    lastName = '';
    @api instruction;
    handleChange(event) {
        const field = event.target.name;
        if (field === 'firstName') {
            this.firstName = event.target.value;
        }else if (field === 'lastName') {
            this.lastName = event.target.value;
        }
    }

    get output() {
        return toTitleCase(`${this.firstName} ${this.lastName}`.toUpperCase());
    }
}