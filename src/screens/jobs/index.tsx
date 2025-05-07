import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserItem from '../../components/users/userItem';
import JobItem from '../../components/jobs/jobItem';
import {useNavigation} from '@react-navigation/native';

const Jobs: React.FC = ({route}) => {
  const navigation = useNavigation();
  const form = route.params.form;
  const [jobs, setJobs] = useState([]);
  const [pending, setPending] = useState<boolean>(false);
  const getJobs = async () => {
    setPending(true);
    const jobs = await firestore().collection('jobs').get();
    const data = jobs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setJobs(data);
    setPending(false);
  };

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {pending ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={
              <View style={{alignItems: 'center', marginTop: 40}}>
                <Text>Henüz Kullanıcı eklenmedi</Text>
              </View>
            }
            data={jobs}
            renderItem={({item}) => <JobItem item={item} form={form} />}
          />
        )}
      </View>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
});
