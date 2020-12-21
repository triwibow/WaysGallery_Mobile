import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    Image
} from 'react-native';

const Alert = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.alertWrapper}>
                <TouchableOpacity style={styles.closeIconWrapper} onPress={props.closeAlert}> 
                    <Image
                        style={styles.closeIcon}
                        source={require('../../../assets/logo/close.png')}
                    />
                </TouchableOpacity>
                <Text style={[styles.textBold]}>{props.message}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100
    },
    alertWrapper: {
        width: '90%',
        height: '30%',
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowOffset: {width:0, height: 1},
        shadowColor:'#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5, 
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
        fontSize: 18
    },

    closeIconWrapper:{
        position:'absolute',
        top: 20,
        right: 20
    },

    closeIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        
    }
})

export default Alert;