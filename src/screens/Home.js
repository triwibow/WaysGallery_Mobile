import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    FlatList, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';

import {API} from '../config/api';

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const getPosts = async () => {
        try {
            setLoading(true);
            const response = await API.get('/posts');

            if(response.data.status !== "success"){
                setError(true);
                setLoading(false);
                return;
            }

            setPosts(response.data.data.posts);
            setError(false);
            setLoading(false);
            
        } catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        getPosts();
    },[]);

    const renderItem = ({item, index}) => {
        const photo = item.photos[0].image;
        console.log(photo)

        return (
            <View key={index} style={styles.contentListWrapper}>
                <View style={styles.contentListHeader}>
                    <View style={styles.avatarWrapper}>
                        <Image 
                            source={{uri: `http://192.168.1.8:5000/avatar/${item.createdBy.avatar}`}}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.textBold}>{item.title}</Text>
                        <Text style={styles.textGrey}>{item.createdBy.fullName}</Text>
                    </View>
                </View>
                <Image 
                    source={{uri: 'http://192.168.1.8:5000/photo/'+photo}}
                    style={{
                        width:"100%",
                        height: 400,
                        borderWidth:2,
                        resizeMode:'cover',
                        
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {error ? (
                <Text>Server Error</Text>
            ):loading?(
                <Text>Loading</Text>
            ):(
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />    
            
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    },
    contentListWrapper:{
        marginBottom: 20
    },
    contentListHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:10
    },

    avatarWrapper: {
        width: 50,
        height: 50,
        padding: 5,
        borderRadius: 25,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: '#eeeeee',
        marginRight: 20,
        marginLeft: 10,
        justifyContent:'center',
        alignItems:'center',
        overflow: 'hidden'
    },

    avatar:{
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'cover',
    },

    title: {
        flexBasis:"80%"
    },

    textBold:{
        fontWeight:'bold',
        fontSize: 18
    },
    textGrey: {
        color: '#6a737c'
    }
})

export default Home;