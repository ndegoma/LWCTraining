import { LightningElement, api, wire} from 'lwc';
import { fullDate as formattedDate } from 'c/globalHelper';
export default  class ParentContainer extends LightningElement{
    @api title;
    currentDate;
    showTable = false;
    connectedCallback(){
       // console.log('connected');
        this.currentDate = formattedDate(new Date());
    }

    renderedCallback(){
        //console.log('rendered');
    }

    disconnectedCallback(){
        //console.log('disconnected');
    }

    showHide(event){
        console.log(event);
        this.showTable = event.detail.checked;
    }
}