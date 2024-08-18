class LoadingStore {
    public isLoading: boolean;

    constructor() {
        this.isLoading = false;
    }

    public showLoading(): void {
        this.isLoading = true;
    }

    public hideLoading(): void {
        this.isLoading = false;
    }
}

export const loadingStore: LoadingStore = new LoadingStore();