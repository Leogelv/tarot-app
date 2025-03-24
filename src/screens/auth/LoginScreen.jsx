import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import SocialButton from '../../components/common/SocialButton';
import { signIn } from '../../services/supabase/supabaseClient';
import { useDispatch } from 'react-redux';
import { setUser, setSession } from '../../store/slices/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await signIn(email, password);
      
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
  
  const handleRegister = () => {
    navigation.navigate('Register');
  };
  
  // Social login handlers
  const handleGoogleLogin = () => {
    // For demo purposes, we'll mock a successful login
    dispatch(setUser({ id: 'google-user', email: 'google-user@example.com' }));
    dispatch(setSession({ token: 'google-token' }));
  };
  
  const handleAppleLogin = () => {
    // For demo purposes, we'll mock a successful login
    dispatch(setUser({ id: 'apple-user', email: 'apple-user@example.com' }));
    dispatch(setSession({ token: 'apple-token' }));
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.rabbitContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/8cNfZWd.png' }} 
            style={styles.rabbitImage}
            resizeMode="contain"
          />
        </View>
      
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Wonderland Tarot</Text>
          <Text style={styles.tagline}>Follow the white rabbit to discover your path</Text>
        </View>
        
        <View style={styles.socialButtonsContainer}>
          <SocialButton
            title="Continue with Google"
            backgroundColor="#FFFFFF"
            color="#4285F4"
            icon={<Text style={{fontSize: 16, color: '#4285F4'}}>G</Text>}
            onPress={handleGoogleLogin}
          />
          
          <SocialButton
            title="Continue with Apple"
            backgroundColor="#000000"
            color="#FFFFFF"
            icon={<Text style={{fontSize: 16, color: '#FFFFFF'}}>🍎</Text>}
            onPress={handleAppleLogin}
          />
        </View>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or login with email</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <View style={styles.formContainer}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <Button
            title={loading ? "Logging in..." : "Login"}
            onPress={handleLogin}
            disabled={loading}
            style={styles.loginButton}
          />
          
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF3E0',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FAF3E0',
    padding: 20,
    justifyContent: 'center',
  },
  rabbitContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  rabbitImage: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#8E44AD',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  socialButtonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 15,
  },
  forgotPassword: {
    color: '#9B59B6',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0D4C0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#8E8E93',
    fontSize: 14,
  },
  errorText: {
    color: '#E74C3C',
    marginBottom: 10,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  registerText: {
    color: '#8E8E93',
  },
  registerLink: {
    color: '#9B59B6',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
  },
  footerText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 12,
  },
});

export default LoginScreen;
