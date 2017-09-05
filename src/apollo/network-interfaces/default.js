import { createNetworkInterface } from 'apollo-client';
import setting from 'config/setting';

// context
export default () => {

    const networkInterface = createNetworkInterface({
        uri: setting.GRAPHQL_URI,
    });

    // here you can place your middleware. ctx has the context forwarded from Nuxt

    return networkInterface;
}