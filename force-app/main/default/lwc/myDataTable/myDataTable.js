import Name from '@salesforce/schema/Account.Name';
import { LightningElement, track } from 'lwc';
import {sortRecords} from './helper'

export default class MyDataTable extends LightningElement {
    sortDirection;
    sortedBy;
    data = [{Id:"1", Name:"Caped Baldy", Age: 28}, {Id:"2", Name:"Cookie Monster", Age: 36}, {Id:"3", Name:"Captain Marvel", Age: 45}, {Id:"4", Name:"Doraemon", Age: 105}];
    columns = [{label:"Name", fieldName:"Name", sortable : true}, {label:"Age", fieldName:"Age", sortable : true, type:"number"}];

    onHandleSort(event){
        try{
            //call the helper function to sort records
            this.data = sortRecords(event, this.data);
            this.sortedBy = event.detail.fieldName;
            this.sortDirection = event.detail.sortDirection;
        }catch(err){
            console.error(err);
        }
    }
}