
//documents labelled by clinic name
export type Clinics = {
    languages: string[],
    insurance: string[],
    website: string,
    services: string[],
    walkIn: boolean,
    paymentModel: string,
    location: number[]
};

//documents labelled by user ID number (associated with email)
export type Users = {
    name: string; // TODO: need to use username bc HIPAA
    sex: string;
    insurance: string;
    policy: string;
    services: string[]
};


//*****TO CHANGE!! */*********** */ change database dummy data too; and make services ARRAYS