// Get the current domain for absolute URLs
export function getDomain() {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    return 'https://www.etivestudios.com'
};