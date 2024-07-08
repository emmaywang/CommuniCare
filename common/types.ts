
//documents labelled by clinic name
export type Clinics = {
    languages: string[],
    insurance: string[],
    website: string,
    specialtyServices: string[],
    clinicalServices: string[],
    walkIn: boolean,
    paymentModel: string,
    location: number[]
};

//documents labelled by user ID number (associated with email)
export type Users = {
    name: string;
    sex: string;
    address: string;
    city: string;
    state: string;
    zipCode: number;
    insurance: string;
    policy: string
};


//*****TO CHANGE!! */*********** */ change database dummy data too; and make services ARRAYS