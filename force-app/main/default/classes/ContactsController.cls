public with sharing class ContactsController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccountId( Id accountId , String searchKey){
        try {
            if(String.isBlank(searchKey)){
                return [SELECT Id, FirstName, LastName, Account.Name, Phone, Alias__c FROM Contact WHERE AccountId = :accountId];
            }else{
                String searhTerm = '%'+searchKey+'%';
                return [SELECT Id, FirstName, LastName, Account.Name, Phone, Alias__c FROM Contact WHERE AccountId = :accountId AND Name like :searhTerm];
            }
 
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateContacts( List<Contact> contactList ){
        try {
            if(!contactList.isEmpty()){
                update contactList;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
