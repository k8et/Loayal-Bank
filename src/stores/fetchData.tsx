import { makeAutoObservable, action } from "mobx";

class DataStore {
    data: any;
    isLoading = false;

    constructor() {
        makeAutoObservable(this,{
            fetchData: action
        });
    }

    fetchData = (async (url: string) => {
        try {
            this.isLoading = true;
            const response = await fetch(url);
            this.data = await response.json();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    });
}

export default new DataStore();