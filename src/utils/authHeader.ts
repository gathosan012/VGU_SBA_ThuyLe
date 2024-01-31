import { STORAGE } from "./configs/storage";

export default function authHeader() {
    const userToken = sessionStorage.getItem(STORAGE.PIT_TOKEN) as string;
    if (userToken)
        return {
            'authorization': userToken,
        };
    else {
        return {
            'authorization': null,
        };
    }
}