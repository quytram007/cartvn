import axios from 'axios';
import { useEffect } from 'react';

const Test = () => {
    useEffect(() => {
        try {
            const test = async () => {
                console.log('hello');
                // const headers = {
                //     Authorization: 'Bearer bG1tYjM2MTQ6RzJyVzJCM0k=',
                //     'Content-Type': 'application/json',
                // };
                // const data = JSON.stringify({
                //     originator: 'SignOTP',
                //     recipient: '0335551118',
                //     content: 'Greetings from D7 API, your mobile verification code is: {}',
                //     expiry: '600',
                //     data_coding: 'text',
                // })
                const response = await axios({
                    url: 'https://api.d7networks.com/verify/v1/otp/send-otp',
                    method: 'POST',
                    timeout: 0,
                    headers: {
                        Authorization: 'Bearer bG1tYjM2MTQ6RzJyVzJCM0k=',
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        originator: 'SignOTP',
                        recipient: '0335551118',
                        content: 'Greetings from D7 API, your mobile verification code is: {}',
                        expiry: '600',
                        data_coding: 'text',
                    }),
                });
                console.log(response);
            };
            test();
        } catch (error) {
            console.log(error);
        }
    }, []);
    return <div>HHHHHHHHHHHHHHHHHHHHHHHHHH</div>;
};
export default Test;
