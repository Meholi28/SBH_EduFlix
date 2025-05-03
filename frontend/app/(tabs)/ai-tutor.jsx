// App.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';

const App = () => {
  // Main app state
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: 'Hello! How can I help you today?', 
      options: ['Quiz', 'Notes', 'Videos', 'Other'] 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for quiz flow
  const [quizChapter, setQuizChapter] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  
  // State for notes flow
  const [notesChapter, setNotesChapter] = useState('');
  const [notesTopic, setNotesTopic] = useState('');

  // Initial options for main menu
  const mainOptions = ['Quiz', 'Notes', 'Videos', 'Other'];

  // Function to handle option selection
  const handleOptionSelect = async (option) => {
    // Add user's selection to messages
    const newMessages = [...messages, { id: messages.length + 1, sender: 'user', text: option }];
    setMessages(newMessages);
    
    setIsLoading(true);
    
    // Handle different options
    switch(option) {
      case 'Quiz':
        setTimeout(() => {
          setMessages([...newMessages, { 
            id: newMessages.length + 1, 
            sender: 'bot', 
            text: 'Please enter the chapter you want to take a quiz on:' 
          }]);
          setCurrentScreen('quiz-chapter');
          setIsLoading(false);
        }, 500);
        break;
      
      case 'Notes':
        setTimeout(() => {
          setMessages([...newMessages, { 
            id: newMessages.length + 1, 
            sender: 'bot', 
            text: 'Please enter the chapter you want notes for:' 
          }]);
          setCurrentScreen('notes-chapter');
          setIsLoading(false);
        }, 500);
        break;
      
      case 'Videos':
        setTimeout(() => {
          setMessages([...newMessages, { 
            id: newMessages.length + 1, 
            sender: 'bot', 
            text: 'Our video content is currently being updated. Please check back soon or choose another option!',
            options: mainOptions
          }]);
          setIsLoading(false);
        }, 500);
        break;
      
      case 'Other':
        setTimeout(() => {
          setMessages([...newMessages, { 
            id: newMessages.length + 1, 
            sender: 'bot', 
            text: 'What else can I help you with today? Feel free to ask me any question.' 
          }]);
          setCurrentScreen('chat');
          setIsLoading(false);
        }, 500);
        break;
      
      case 'Back to Menu':
        setTimeout(() => {
          setMessages([...newMessages, { 
            id: newMessages.length + 1, 
            sender: 'bot', 
            text: 'Welcome back! How can I help you today?',
            options: mainOptions
          }]);
          setCurrentScreen('welcome');
          setIsLoading(false);
        }, 500);
        break;
        
      default:
        setIsLoading(false);
        break;
    }
  };

  // Function to handle user input submission
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newUserMessage = { id: messages.length + 1, sender: 'user', text: userInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');
    setIsLoading(true);

    // Handle different screens
    switch(currentScreen) {
      case 'quiz-chapter':
        setQuizChapter(userInput);
        setTimeout(() => {
          setMessages([...updatedMessages, { 
            id: updatedMessages.length + 1, 
            sender: 'bot', 
            text: `Great! Now, please specify the topic within ${userInput} for your quiz:` 
          }]);
          setCurrentScreen('quiz-topic');
          setIsLoading(false);
        }, 500);
        break;
      
      case 'quiz-topic':
        setQuizTopic(userInput);
        try {
          // In a real app, this would be an API call
          const quizData = await fetchQuizQuestions(quizChapter, userInput);
          setQuizQuestions(quizData);
          
          setTimeout(() => {
            setMessages([...updatedMessages, { 
              id: updatedMessages.length + 1, 
              sender: 'bot', 
              text: `Starting quiz on ${quizChapter}: ${userInput}` 
            }]);
            setCurrentScreen('quiz');
            setCurrentQuizQuestion(0);
            setIsLoading(false);
          }, 500);
        } catch (error) {
          setMessages([...updatedMessages, { 
            id: updatedMessages.length + 1, 
            sender: 'bot', 
            text: 'Sorry, I could not load the quiz questions. Please try again.',
            options: mainOptions
          }]);
          setIsLoading(false);
        }
        break;
      
      case 'notes-chapter':
        setNotesChapter(userInput);
        setTimeout(() => {
          setMessages([...updatedMessages, { 
            id: updatedMessages.length + 1, 
            sender: 'bot', 
            text: `Now, please specify the topic within ${userInput} for your notes:` 
          }]);
          setCurrentScreen('notes-topic');
          setIsLoading(false);
        }, 500);
        break;
      
      case 'notes-topic':
        setNotesTopic(userInput);
        try {
          // In a real app, this would be an API call
          const notesData = await fetchNotes(notesChapter, userInput);
          
          setTimeout(() => {
            setMessages([...updatedMessages, { 
              id: updatedMessages.length + 1, 
              sender: 'bot', 
              text: `Here are your notes on ${notesChapter}: ${userInput}\n\n${notesData}`,
              options: mainOptions
            }]);
            setCurrentScreen('chat');
            setIsLoading(false);
          }, 500);
        } catch (error) {
          setMessages([...updatedMessages, { 
            id: updatedMessages.length + 1, 
            sender: 'bot', 
            text: 'Sorry, I could not load the notes. Please try again.',
            options: mainOptions
          }]);
          setIsLoading(false);
        }
        break;
      
      case 'chat':
      default:
        try {
          // In a real app, this would be an API call
          const aiResponse = await fetchAIChat(userInput);
          
          setTimeout(() => {
            setMessages([...updatedMessages, { 
              id: updatedMessages.length + 1, 
              sender: 'bot', 
              text: aiResponse,
              options: mainOptions
            }]);
            setIsLoading(false);
          }, 500);
        } catch (error) {
          setMessages([...updatedMessages, { 
            id: updatedMessages.length + 1, 
            sender: 'bot', 
            text: 'Sorry, I could not process your request. Please try again.',
            options: mainOptions
          }]);
          setIsLoading(false);
        }
        break;
    }
  };

  // Function to handle quiz answers
  const handleQuizAnswer = (answer) => {
    // Save the answer
    setQuizAnswers({...quizAnswers, [currentQuizQuestion]: answer});
    
    // Move to next question or finish quiz
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Quiz completed
      const score = calculateQuizScore();
      setMessages([...messages, { 
        id: messages.length + 1, 
        sender: 'bot',

        text: `Quiz completed! Your score: ${score}/${quizQuestions.length}`,
        options: mainOptions
      }]);
      setCurrentScreen('welcome');
    }
  };

  // Calculate quiz score
  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  // Mock API functions
  const fetchQuizQuestions = async (chapter, topic) => {
    // In a real app, this would fetch from an API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            question: `Sample question about ${topic} in ${chapter}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 'Option A'
          },
          {
            question: `Another question about ${topic} in ${chapter}?`,
            options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
            correctAnswer: 'Choice 3'
          },
          {
            question: `Third question on ${topic} from ${chapter}?`,
            options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
            correctAnswer: 'Answer 2'
          }
        ]);
      }, 1000);
    });
  };

  const fetchNotes = async (chapter, topic) => {
    // In a real app, this would fetch from an API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`These are sample notes about ${topic} from ${chapter}. In a real application, this would be comprehensive content fetched from an API or database. The notes would include key concepts, definitions, examples, and possibly diagrams or other educational content.`);
      }, 1000);
    });
  };

  const fetchAIChat = async (message) => {
    // In a real app, this would call an AI API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`I'm your AI tutor. You asked: "${message}". In a real application, this would be processed by an AI model to provide a helpful, educational response tailored to your question.`);
      }, 1000);
    });
  };

  // Render message bubbles
  const renderMessage = (message) => {
    return (
      <View 
        key={message.id} 
        style={[
          styles.messageBubble, 
          message.sender === 'user' ? styles.userMessage : styles.botMessage
        ]}
      >
        <Text style={[styles.messageText, message.sender === 'user' ? styles.userMessageText : styles.botMessageText]}>
          {message.text}
        </Text>
        
        {/* Render options if available */}
        {message.options && (
          <View style={styles.optionsContainer}>
            {message.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  // Render quiz screen
  const renderQuiz = () => {
    if (quizQuestions.length === 0 || currentQuizQuestion >= quizQuestions.length) {
      return null;
    }
    
    const question = quizQuestions[currentQuizQuestion];
    
    return (
      <View style={styles.quizContainer}>
        <Text style={styles.questionText}>
          Question {currentQuizQuestion + 1}/{quizQuestions.length}: {question.question}
        </Text>
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quizOption}
              onPress={() => handleQuizAnswer(option)}
            >
              <Text style={styles.quizOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Tutor</Text>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={100}
      >
        {currentScreen === 'quiz' ? (
          renderQuiz()
        ) : (
          <ScrollView 
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          >
            {messages.map(message => renderMessage(message))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#FF0000" />
              </View>
            )}
          </ScrollView>
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            returnKeyType="send"
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSendMessage}
            disabled={isLoading}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  header: {
    height: 60,
    backgroundColor: '#FF0000', // Red header
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#1E1E1E', // Darker background for message area
  },
  messagesContent: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 18,
    padding: 15,
    marginVertical: 6,
  },
  userMessage: {
    backgroundColor: '#FF3333', // Red-tinted user message
    alignSelf: 'flex-end',
    marginLeft: '20%',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#2A2A2A', // Dark gray bot message
    alignSelf: 'flex-start',
    marginRight: '20%',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#FFFFFF', // White text for user messages
  },
  botMessageText: {
    color: '#FFFFFF', // White text for bot messages
  },
  optionsContainer: {
    marginTop: 12,
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#FF0000', // Red option buttons
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  optionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#2A2A2A', // Dark input area
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#3A3A3A', // Darker input field
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 16,
    color: '#FFFFFF', // White text for input
  },
  sendButton: {
    backgroundColor: '#FF0000', // Red send button
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 12,
  },
  quizContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#1E1E1E', // Dark background for quiz screen
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#FFFFFF', // White text for questions
  },
  quizOption: {
    backgroundColor: '#2A2A2A', // Dark gray quiz options
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#FF0000', // Red border for quiz options
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  quizOptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF', // White text for quiz options
  },
});

export default App;