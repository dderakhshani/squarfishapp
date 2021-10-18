
export default interface TourModel {
    id: number;
    tourLeaderIds: number[];
    tourTitle: string;
    startTime: Date;
    status: number;
    price: number;
    currencyUnit: number;
}

export const TourStatus: string[] = ['Created', 'Confirmed', 'Canceled']

export const CurrencyUnits: any[] = [{ title: 'Dollar($)', value: 1 }, { title: 'Euro(€)', value: 2 }, { title: 'BitCoin(฿)', value: 3 }]

export const CurrencyUnitTitles: string[] = ['$', '€', '฿']