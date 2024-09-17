
//documents labelled by program name
export type Programs = {
    languages: string[],
    website: string,
    services: string[],
    paymentModel: string,
    clinic: string,
    location: number[]
};

//documents labelled by user ID number (associated with email)
export type Users = {
    username: string; // TODO: need to use username bc HIPAA
    sex: string;
    insurance: string;
    policy: string;
    services: string[]
};


//*****TO CHANGE!! */*********** */ change database dummy data too; and make services ARRAYS