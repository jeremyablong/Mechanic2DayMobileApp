import SendBird from 'sendbird';
import { Config } from "react-native-config";

const APP_ID = "59615BD6-4F78-4B10-BF4A-587E1403BBD9";

export const sbConnect = (userId, nickname) => {
    return new Promise((resolve, reject) => {
        const sb = new SendBird({ 'appId': APP_ID });
        sb.connect(userId, (user, error) => {
            if (error) {
                reject('SendBird Login Failed.');
            } else {
                sb.updateCurrentUserInfo(nickname, null, (user, error) => {
                    if (error) {
                        reject('Update User Failed.');
                    } else {
                        resolve(user);
                    }
                })
            }
        })
    })
};