export const wdioOptions = {
    clearLocalStorage: async(): Promise<void> => {
        browser.execute(() => {
            localStorage.clear();
        });
    }
};