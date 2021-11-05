import React, {useState, useEffect} from 'react';
import request from '../Services/api';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';

import LottieView from 'lottie-react-native';

interface IBreedsPet {
  id: number;
  name: string;
  bred_for: string;
  bred_group: string;
  temperament: string;
  origin: string;
}

interface IFindYourDogData {
  id: string;
  url: string;
  breeds?: IBreedsPet[];
}

const GetDogs: React.FC = () => {
  const [dogs, setDogs] = useState<IFindYourDogData[]>([]);
  const [reload, setReload] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    request
      .get('')
      .then(response => {
        setDogs(response.data);
      })
      .catch(() => alert('Houve um erro ao se comunicar com a API.'))
      .finally(() => {
        setTimeout(() => {
          setIsLoad(false);
        }, 2000);
      });
  }, [reload]);

  if (isLoad) {
    return (
      <View style={styles.default}>
        <LottieView
          source={require('../Animation/load-dog.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    );
  }

  return (
    <View style={styles.default}>
      {dogs.map((item, index) => (
        <View key={index}>
          <Image style={styles.dogPicture} source={{uri: item.url}} />
          <>
            {item?.breeds?.map(breed => (
              <View key={breed.id} style={styles.textWrapper}>
                <Text style={styles.textName}>{breed.name}</Text>
                <Text>{breed.bred_for}</Text>
                <Text>{breed.temperament}</Text>
                <Text>{breed.origin}</Text>
              </View>
            ))}
          </>
        </View>
      ))}
      <Pressable
        style={styles.pressComponent}
        onPress={() => setReload(!reload)}>
        <Text style={styles.textPressable}>Next 🐶</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dogPicture: {
    width: Dimensions.get('window').width,
    height: 500,
  },
  pressComponent: {
    backgroundColor: '#DA667B',
    paddingVertical: 12,
    width: Dimensions.get('window').width / 2,
    marginTop: 10,
  },
  textPressable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  textWrapper: {
    marginLeft: 10,
    marginTop: 10,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#342A21',
  },
  animation: {
    width: 250,
    height: 250,
  },
});

export default GetDogs;
