import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import Layout from '@/components/layout';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';
import '@/styles/global.css';

function App({ Component, pageProps }) {
    const userData = useUserData();

    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return (
        <UserContext.Provider value={userData}>
            <Layout>
                <Component {...pageProps} />
                <Toaster />
            </Layout>
        </UserContext.Provider>
    );
}

export default App;