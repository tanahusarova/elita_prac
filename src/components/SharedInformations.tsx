import React from "react";

class SharedInformations{
    date: string = '';
    idOfLoggedUser:number = -1;
    private static instance: SharedInformations;

    private constructor() {
          // Initialize the instance of the class here
    }
      
    public static getInstance(): SharedInformations {
        if (!SharedInformations.instance) {
        SharedInformations.instance = new SharedInformations();
        }
      
        return SharedInformations.instance;
    }
      
        // Other methods and properties of the class here
    
      
    
}

export default SharedInformations;