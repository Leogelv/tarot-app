import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { signUp } from '../../services/supabase/supabaseClient';
import { useDispatch } from 'react-redux';
import { setUser, setSession } from '../../store/slices/authSlice';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await signUp(email, password);
      
      if (error) {
        setError(error.message);
      } else if (data) {
        dispatch(setUser(data.user));
        dispatch(setSession(data.session));
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create Account</Text>
        <Text style={styles.subheaderText}>Join our mystical journey</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
        
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
        />
        
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Button
          title={loading ? "Creating Account..." : "Create Account"}
          onPress={handleRegister}
          disabled={loading}
          style={styles.registerButton}
        />
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Button
            title="Login"
            onPress={handleLogin}
            type="text"
            style={styles.loginButton}
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAF3E0',
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 10,
  },
  subheaderText: {
    fontSize: 18,
    color: '#8E44AD',
    fontStyle: 'italic',
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  registerButton: {
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#4A4A4A',
  },
  loginButton: {
    marginLeft: 5,
  },
  errorText: {
    color: '#E74C3C',
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 12,
  },
});

export default RegisterScreen;
