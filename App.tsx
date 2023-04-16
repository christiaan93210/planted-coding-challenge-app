import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import findProjects from './helper/findProjects';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [location, setLocation] = useState<string>('');
  const [projects, setProjects] = useState<
    {projectName: string; distance: number}[]
  >([]);
  const [alertText, setAlertText] = useState<string>(
    'please enter location name',
  );

  const handleChange = (text: string) => {
    setLocation(text);
  };

  const findLocation = () => {
    if (location === '') {
      setProjects([]);
      setAlertText('please enter location name');
      return;
    }
    let res = findProjects(location);
    if (!res.length) {
      setProjects([]);
      setAlertText('please enter correct location name');
    } else {
      setProjects(findProjects(location));
    }
  };

  const statusBarStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.mainContent}>
          <Text style={styles.headerTxt}>
            Planted Coding Challenge - Christiaan
          </Text>
          <View style={styles.searchBox}>
            <TextInput
              onChangeText={text => handleChange(text)}
              value={location}
              style={styles.highlight}
            />
            <Pressable onPress={findLocation} style={styles.findButton}>
              <Text style={styles.btnText}>Find</Text>
            </Pressable>
          </View>
          <View style={styles.projectContainer}>
            {projects.length ? (
              projects.map((project, index) => (
                <View style={styles.projectCard} key={index}>
                  <Text style={styles.projectName}>{project.projectName}</Text>
                  <Text style={styles.distance}>{project.distance} km</Text>
                </View>
              ))
            ) : (
              <Text style={styles.alertText}>{alertText}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131823',
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#131823',
  },
  headerTxt: {
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  highlight: {
    fontWeight: '700',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 15,
    width: 300,
    paddingHorizontal: 10,
    fontSize: 23,
  },
  findButton: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: '#172a45',
  },
  findButtonHover: {
    backgroundColor: '#1d4577',
  },
  btnText: {
    color: '#2d85ed',
    fontSize: 23,
  },
  searchImg: {
    width: 30,
  },
  projectContainer: {
    paddingHorizontal: 20,
  },
  projectCard: {
    borderWidth: 1,
    borderColor: '#202835',
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
  },
  projectName: {
    fontSize: 22,
    color: 'white',
  },
  distance: {
    fontSize: 18,
    color: '#3e78ad',
  },
  alertText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    marginTop: 20,
  },
});

export default App;
