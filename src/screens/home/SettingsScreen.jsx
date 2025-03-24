import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import { logout } from '../../store/slices/authSlice';

const SettingItem = ({ title, description, renderRight }) => (
  <View style={styles.settingItem}>
    <View style={styles.settingTextContainer}>
      <Text style={styles.settingTitle}>{title}</Text>
      {description && <Text style={styles.settingDescription}>{description}</Text>}
    </View>
    {renderRight && renderRight()}
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isSubscribed = useSelector(state => state.auth.isSubscribed);
  
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder}></View>
      </View>
      
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.settingGroup}>
          <SettingItem 
            title="Email" 
            description={user?.email || "Not signed in"}
          />
          
          <SettingItem 
            title="Subscription" 
            description={isSubscribed ? "Premium" : "Free Plan"}
            renderRight={() => isSubscribed ? null : (
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingGroup}>
          <SettingItem 
            title="Push Notifications" 
            description="Receive daily card and reminder notifications"
            renderRight={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#DDDDDD", true: "#D5B8E0" }}
                thumbColor={notificationsEnabled ? "#9B59B6" : "#f4f3f4"}
              />
            )}
          />
          
          <SettingItem 
            title="Dark Mode" 
            description="Use dark color scheme"
            renderRight={() => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: "#DDDDDD", true: "#D5B8E0" }}
                thumbColor={darkModeEnabled ? "#9B59B6" : "#f4f3f4"}
              />
            )}
          />
          
          <SettingItem 
            title="Sound Effects" 
            description="Play sounds during card interactions"
            renderRight={() => (
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: "#DDDDDD", true: "#D5B8E0" }}
                thumbColor={soundEnabled ? "#9B59B6" : "#f4f3f4"}
              />
            )}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Support</Text>
        
        <View style={styles.settingGroup}>
          <TouchableOpacity>
            <SettingItem 
              title="Contact Support" 
              description="Get help or leave feedback"
            />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <SettingItem 
              title="Privacy Policy" 
              description="Read our privacy policy"
            />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <SettingItem 
              title="Terms of Service" 
              description="Read our terms of service"
            />
          </TouchableOpacity>
        </View>
        
        <Button
          title="Log Out"
          onPress={handleLogout}
          type="secondary"
          style={styles.logoutButton}
        />
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF3E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D2',
  },
  backButton: {
    width: 40,
  },
  backButtonText: {
    fontSize: 28,
    color: '#9B59B6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8E44AD',
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginTop: 20,
    marginBottom: 10,
  },
  settingGroup: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D2',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 12,
    color: '#8E8E93',
  },
  upgradeButton: {
    backgroundColor: '#9B59B6',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 10,
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 30,
    marginBottom: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 12,
    marginBottom: 30,
  },
});

export default SettingsScreen; 