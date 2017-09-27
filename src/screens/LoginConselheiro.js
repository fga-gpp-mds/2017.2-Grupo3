import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { modifyCPF, asyncLoginCounselor } from '../actions/counselorActions.js'

const iconAccount = require('../images/account_circle.png');

class LoginConselheiro extends React.Component {
    render_btn_login() {
        if(this.props.isLoading){
            return(
                <ActivityIndicator style={{ marginTop: 50 }} size = 'large' color = '#FF9500'/>
            );
        }
        return(
         <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity= {0.7}
            onPress = {() => this._asyncLoginCounselor()}>
                <Text style={{color: 'white', fontSize: 20}}>Entrar</Text>
        </TouchableOpacity>
      )
    }


    _asyncLoginCounselor(){
      const CPF = this.props.cpf;
      userData = {
        "username": CPF,
        "password": "senha"
      }

      this.props.asyncLoginCounselor(userData);
    }


    render() {
        return (
            <View style={styles.principal}>
                <View style={styles.topo}>
                    <Text style={styles.textLogo}>Merenda +</Text>
                </View>

                <View style={styles.conteudo}>
                    <View style={styles.InputCPF}>
                        <Image source={iconAccount} style={styles.icon}/>
                        <TextInput
                        width = {280}
                        returnKeyType = 'go'
                        onChangeText={(CPF) => this.props.modifyCPF(CPF)}
                        maxLength = {11}
                        value = {this.props.CPF}
                        underlineColorAndroid = 'transparent'
                        placeholder = 'CPF'
                        />
                    </View>

                    {this.render_btn_login()}

                    <TouchableOpacity
                    activeOpacity = {0.6}
                    onPress = {() => Actions.loginPresidente()}
                    >
                        <Text style={{marginTop: 30}}>É um presidente?
                            <Text style={{color: 'blue'}}> Clique aqui</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rodape}>
                    <TouchableOpacity
                    activeOpacity = {0.6}
                    onPress = {()=> Actions.registerScreen()}
                    >
                    <Text>Ainda não se cadastrou?
                        <Text style={{color: 'blue'}}> Cadastrar-se</Text>
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStatetoProps = (state) => (
    console.log(state),
  {
      cpf: state.counselor.cpf,
      message_erro: state.counselor.message_erro,
      isLoading: state.counselor.isLoading
  }
)

export default connect(mapStatetoProps,{modifyCPF,asyncLoginCounselor})(LoginConselheiro);

const styles = StyleSheet.create({
    principal: {
        flex: 1
    },
    topo: {
        flex: 1.2,
        backgroundColor: '#FF9500',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    conteudo: {
        flex: 6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'

    },
    rodape: {
        flex: 0.7,
        borderTopColor: '#a9a9a9',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5
    },
    textLogo: {
        fontSize: 35,
        color:'white',
        fontWeight:'bold',
        marginTop:10
    },
    InputCPF: {
        paddingLeft: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderRadius: 7

    },
    buttonLogin: {
        paddingHorizontal: 133,
        paddingVertical: 18,
        marginTop: 50,
        marginBottom: 0,
        backgroundColor: '#FF9500',
        borderRadius: 8,
        borderWidth: 1,
    },

});