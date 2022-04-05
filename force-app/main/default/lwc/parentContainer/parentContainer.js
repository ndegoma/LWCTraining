import { LightningElement, api, wire} from 'lwc';
import { fullDate as formattedDate } from 'c/globalHelper';
export default  class ParentContainer extends LightningElement{
    @api title;
    currentDate;
    showTable;
    connectedCallback(){
       // console.log('connected');



        // call the global helper function to format date
        this.currentDate = formattedDate(new Date());
    }

    renderedCallback(){
        //console.log('rendered');
    }

    disconnectedCallback(){
        //console.log('disconnected');
    }

    showHide(event){
        this.showTable = event.detail.checked;
    }
}