import React, {useContext, useState} from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import {AppContext} from '../context/AppContext';
import {API, setAuthToken} from '../config/api';

import Alert from '../components/alert/Alert';

const Login = (props) => {
    const [state, dispatch] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        status: false,
        message: ''
    });
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (value, name) => {
       setFormData({
           ...formData,
           [name]: value
       })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const body = JSON.stringify(formData);
            console.log(body);
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response =  await API.post('/login', body, config);

            if(response.data.status !== "success"){
                setError({
                    status: true,
                    message: response.data.error.message
                });
                setLoading(false);
                return;
            }

            setError({
                status: false,
                message: ''
            });
            setLoading(false);

            console.log(response.data.data.user.token);
            dispatch({
                type: 'LOGIN'
            });

            setAuthToken(response.data.data.user.token);

            props.navigation.navigate('HomeScreen');

        } catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    const toRegister = () => {
        props.navigation.navigate('RegisterScreen')
    }

    const closeAlert = () => {
        setError({
            status: false,
            message: ''
        })
    }
 
    return (
      <View style={styles.container}>
          {error.status && (<Alert message={error.message} closeAlert={closeAlert} />)}
          <Image
            style={styles.circleTop}
            source={require('../../assets/logo/circleop.png')}
          />
          <View style={styles.landingWrapper}>
            <View style={styles.logoWrapper}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo/logo.png')}
                />
                <Text style={[styles.textBold, styles.quote]}>Show your work to inspire everyone</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formWrapper}>
                <TextInput 
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={(value)=> handleInputChange(value, 'email')}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={(value)=> handleInputChange(value, 'password')}
                />
                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => handleSubmit()}   
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#ffffff" />
                    ):(
                        <Text 
                            style={[styles.textCenter, styles.textColor]}>
                            Login
                        </Text>
                    )}
                </TouchableOpacity>
                <Text
                    style={[styles.textCenter, styles.textBold]}
                >
                    Don't have an account ? Click <Text style={styles.clickHere} onPress={()=> toRegister()}>Register</Text>
                </Text>
            </View>
          </View>
          <Image
            style={styles.circleBottomLeft}
            source={require('../../assets/logo/circleop.png')}
          />
          <Image
            style={styles.circleBottomRight}
            source={require('../../assets/logo/circleop.png')}
          />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:20,
        paddingVertical: 20
    },

    landingWrapper:{
        flexDirection: 'row',
        paddingVertical: 50
    },

    logoWrapper:{
        flexBasis:'50%'
    },

    quote: {
        fontSize: 18,
    },

    logo:{
        resizeMode: 'stretch'
    },

    circleBottomLeft:{
        position: 'absolute',
        resizeMode: 'stretch',
        bottom: -120,
        left: -40
    },

    circleBottomRight:{
        position: 'absolute',
        resizeMode: 'stretch',
        width: 200,
        height: 200,
        bottom: -100,
        right: -100
    },

    circleTop:{
        position: 'absolute',
        resizeMode: 'stretch',
        width: 200,
        height: 200,
        top: -80,
        right: -80,
    },

    textHeading:{
        fontFamily: ''
    },

    formContainer:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems:'center',
        zIndex:99
    },

    formWrapper:{
        width: '90%',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderRadius:5,
        shadowOffset: {width:0, height: 1},
        shadowColor:'#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,     
    },  

    input:{
        backgroundColor: '#E7E7E7',
        borderStyle: 'solid',
        borderWidth:1,
        borderColor: '#2FC4B2',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical:10,
        marginVertical:5
    },

    buttonPrimary:{
        backgroundColor: '#2FC4B2',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical:10,
        marginVertical:5,
    },

    textCenter:{
        textAlign:'center'
    },

    textColor:{
        color:'#ffffff',
        fontSize: 16
    },
    textBold:{
        fontWeight:'bold',
        fontSize: 14
    },
    clickHere:{
        color: '#2FC4B2'
    }


})

export default Login;