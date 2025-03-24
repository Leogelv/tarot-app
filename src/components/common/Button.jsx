import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', 
  size = 'medium', 
  disabled = false,
  style,
  textStyle
}) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    // Type styles
    if (type === 'primary') {
      buttonStyle.push(styles.primaryButton);
    } else if (type === 'secondary') {
      buttonStyle.push(styles.secondaryButton);
    } else if (type === 'outline') {
      buttonStyle.push(styles.outlineButton);
    } else if (type === 'text') {
      buttonStyle.push(styles.textButton);
    }
    
    // Size styles
    if (size === 'small') {
      buttonStyle.push(styles.smallButton);
    } else if (size === 'large') {
      buttonStyle.push(styles.largeButton);
    }
    
    // Disabled style
    if (disabled) {
      buttonStyle.push(styles.disabledButton);
    }
    
    // Custom style
    if (style) {
      buttonStyle.push(style);
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleArray = [styles.buttonText];
    
    // Type text styles
    if (type === 'primary') {
      textStyleArray.push(styles.primaryButtonText);
    } else if (type === 'secondary') {
      textStyleArray.push(styles.secondaryButtonText);
    } else if (type === 'outline') {
      textStyleArray.push(styles.outlineButtonText);
    } else if (type === 'text') {
      textStyleArray.push(styles.textButtonText);
    }
    
    // Size text styles
    if (size === 'small') {
      textStyleArray.push(styles.smallButtonText);
    } else if (size === 'large') {
      textStyleArray.push(styles.largeButtonText);
    }
    
    // Disabled text style
    if (disabled) {
      textStyleArray.push(styles.disabledButtonText);
    }
    
    // Custom text style
    if (textStyle) {
      textStyleArray.push(textStyle);
    }
    
    return textStyleArray;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primaryButton: {
    backgroundColor: '#9B59B6',
  },
  secondaryButton: {
    backgroundColor: '#F0E6D2',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9B59B6',
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  smallButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  largeButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#9B59B6',
  },
  outlineButtonText: {
    color: '#9B59B6',
  },
  textButtonText: {
    color: '#9B59B6',
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
});

export default Button;
