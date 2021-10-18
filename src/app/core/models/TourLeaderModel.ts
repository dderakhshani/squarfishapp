export default interface TourLeaderModel {
    personId: number;
    tourId: number;
    exprienceYears: number;
    id: number;
    fullName: string;
    firstname: string;
    lastname: string;
    phone: string | null;
    birthdate: string | null;
    gender: number;
}

export const Genders: string[] = ['Male', 'Female', 'Trans'];