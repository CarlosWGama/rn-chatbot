import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { BotFaces, Opcao } from './models';
import { Msg, Button } from './components';

export interface ChatbotProps {
    delay?:number
}

/**
 * Componente para exibir o Chatbot
 * @param props 
 */
export function Chatbot (props: ChatbotProps) {

    //States
    const [botFace, setBotFace] = useState(BotFaces.FELIZ);
    const [mensagens, setMensagens] = useState<{autor: string, mensagem: string, bot: boolean}[]>([]);

    /** Adiciona uma fala da aplicação - Vai sair depois */
    const adicionarFala = async (fala: string, botFace?:BotFaces|any, autor: string  = 'Bot-CC1', bot:boolean = true) => {
        if (botFace != null) setBotFace(botFace)
        mensagens.push({autor, mensagem:fala, bot});
        
        // mensagens.push({autor, mensagem:'', bot});
        // const index = mensagens.length-1;
        
        // for (var i = 0; i < fala.length; i++) {
        //   mensagens[index].mensagem += fala.charAt(i);
        //   console.log(mensagens[index].mensagem)
        //   setMensagens(mensagens)
        //   await new Promise(resolve => setTimeout(() => resolve(), props.delay))
        // }
        
        //Remove mensagens antigas
        if (mensagens.length > 5) {
            mensagens.shift();
            setMensagens(mensagens)
        }
        
      }
    
    const [botoes, setBotoes] = useState([
        new Opcao('Robo', () => adicionarFala('Olá mundo', BotFaces.FELIZ)),
        new Opcao('Robo2', () => adicionarFala('Olá mundo', BotFaces.FELIZ)),
        new Opcao('Buscando informação', async () => { await adicionarFala('Olá Bot Testando 123', undefined, 'Você', false )}),
    ])

    useEffect(() => {
        console.log('aaaa')
    }, [mensagens])    

      
    return (
        <View style={styles.container}>
          {/* Personagem */}
          <View style={{paddingTop:10, flex:1, maxHeight: 110, alignItems: 'center'}}>
              <Image source={botFace} style={{width:100, height:100}}></Image>
          </View>

          {/* Mensagens */}
          <View style={styles.mensagens}>
              <FlatList
                  data={mensagens}
                  extraData={mensagens}
                  keyExtractor={(item, index) => 'key'+index}
                  renderItem={ ({item}) => (<View><Msg {...item}/></View>) }
              />
          </View>

            {/* Opções */}
            <View style={styles.buttons}>
               {botoes.map(btn => <Button {...btn} key={"key"+btn.title} />)}
            </View>
    </View>
    );
}

Chatbot.defaultProps = {
    delay: 10
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 400
    },
    mensagens: {
        flex: 1,
        height: '80%',
        width: '90%',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: "row",
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: 10
    },
    button: {
        borderRadius: 10
    }
});