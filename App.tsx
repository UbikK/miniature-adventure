import {Session} from '@supabase/supabase-js';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Auth from './src/components/login';

import {supabase} from './src/helpers/supabase';
import Account from './src/pages/account';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
};

export default App;
