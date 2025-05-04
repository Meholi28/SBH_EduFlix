// App.js
import React, { useState, useRef, useEffect } from 'react';
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
  ActivityIndicator,
  StatusBar,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const BUBBLE_MAX_WIDTH = width * 0.75;

const App = () => {
  // Main app state
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: 'Hello! I\'m your AI Tutor. How can I help you today?', 
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
  const [quizProgress, setQuizProgress] = useState(0);
  
  // State for notes flow
  const [notesChapter, setNotesChapter] = useState('');
  const [notesTopic, setNotesTopic] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  // Initial options for main menu
  const mainOptions = ['Quiz', 'Notes', 'Videos', 'Other'];

  // Effect for animating new messages
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [messages]);

  // Effect to update quiz progress
  useEffect(() => {
    if (quizQuestions.length > 0) {
      setQuizProgress((currentQuizQuestion / quizQuestions.length) * 100);
    }
  }, [currentQuizQuestion, quizQuestions]);

  // Function to handle option selection
  const handleOptionSelect = async (option) => {
    // Add user's selection to messages
    const newMessages = [...messages, { id: messages.length + 1, sender: 'user', text: option }];
    setMessages(newMessages);
    
    setIsLoading(true);
    fadeAnim.setValue(0);
    
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
    fadeAnim.setValue(0);

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
        setMessages([...updatedMessages, { 
          id: updatedMessages.length + 1, 
          sender: 'bot', 
          text: `Starting quiz on ${quizChapter}: ${userInput}. Loading questions...` 
        }]);
        
        try {
          // Make API call to the backend
          const quizData = await fetchQuizQuestions(quizChapter, userInput);
          
          if (quizData && quizData.length > 0) {
            setQuizQuestions(quizData);
            setCurrentScreen('quiz');
            setCurrentQuizQuestion(0);
            // Reset previous answers when starting a new quiz
            setQuizAnswers({}); 
          } else {
            handleApiError('No quiz questions found for this topic. Please try a different topic.');
          }
        } catch (error) {
          handleApiError(`Error loading quiz: ${error.message}`);
        } finally {
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
          // Call AI Chat API
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
    
    // Display explanation if available
    if (quizQuestions[currentQuizQuestion]?.explanation) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'bot',
        text: `${answer === quizQuestions[currentQuizQuestion].correctAnswer ? '✓ Correct!' : '✗ Incorrect!'}\n\nExplanation: ${quizQuestions[currentQuizQuestion].explanation}`
      }]);
    }
    
    // Move to next question or finish quiz
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
      }, 1500);
    } else {
      // Quiz completed
      setTimeout(() => {
        const score = calculateQuizScore();
        setMessages([...messages, { 
          id: messages.length + 1, 
          sender: 'bot',
          text: `Quiz completed! Your score: ${score}/${quizQuestions.length}`,
          options: mainOptions
        }]);
        setCurrentScreen('welcome');
      }, 1500);
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
  
  // Handle loading error
  const handleApiError = (errorMessage) => {
    setMessages([...messages, { 
      id: messages.length + 1, 
      sender: 'bot', 
      text: errorMessage || 'Sorry, I could not connect to the quiz service. Please try again later.',
      options: mainOptions
    }]);
    setIsLoading(false);
    setCurrentScreen('welcome');
  };

  // Connect to backend API for quiz questions
  const fetchQuizQuestions = async (chapter, topic) => {
    try {
      const response = await fetch("https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/ai/quiz", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: 'education',
          subject: chapter,
          topic: topic
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.questions) {
        // Transform the API response format to match our app's format
        return data.questions.map(q => ({
          question: q.question,
          options: [q.options.A, q.options.B, q.options.C, q.options.D],
          correctAnswer: q.options[q.correctAnswer],
          explanation: q.explanation
        }));
      } else {
        throw new Error('Failed to load quiz questions');
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      // Fallback to sample questions if API fails
      return [
        {
          question: `Sample question about ${topic} in ${chapter}?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A'
        },
        {
          question: `Another question about ${topic} in ${chapter}?`,
          options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
          correctAnswer: 'Choice 3'
        }
      ];
    }
  };

  const fetchNotes = async (chapter, topic) => {
    try {
      const response = await fetch("https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/ai/note", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: "1234",
          domain: "IT",
          subject: chapter,
          topic: topic
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.message) {
        return data.message;
      } else {
        throw new Error('Failed to load notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      // Fallback to sample notes if API fails
      return `These are sample notes about ${topic} from ${chapter}. In a real application, this would be comprehensive content fetched from an API or database. The notes would include key concepts, definitions, examples, and possibly diagrams or other educational content.`;
    }
  };

  const fetchAIChat = async (message) => {
    try {
      const response = await fetch("https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/ai/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: "1234",
          message: message
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.message) {
        return data.message;
      } else {
        throw new Error('Failed to get AI response');
      }
    } catch (error) {
      console.error('Error fetching AI chat response:', error);
      // Fallback response if API fails
      return `I'm sorry, I couldn't process your request at the moment. Please try again later or choose another option from the menu.`;
    }
  };

  // Clear messages when refreshing the page
  useEffect(() => {
    // This would be replaced with actual refresh detection in a real app
    // For now, we're just setting up the initial state
    const handleRefresh = () => {
      setMessages([{ 
        id: 1, 
        sender: 'bot', 
        text: 'Hello! I\'m your AI Tutor. How can I help you today?', 
        options: mainOptions 
      }]);
      setCurrentScreen('welcome');
      setUserInput('');
      setIsLoading(false);
      // Reset all other state variables
      setQuizChapter('');
      setQuizTopic('');
      setCurrentQuizQuestion(0);
      setQuizQuestions([]);
      setQuizAnswers({});
      setQuizProgress(0);
      setNotesChapter('');
      setNotesTopic('');
    };

    // You would add an actual refresh event listener here
    // For demonstration, we could call this on mount if needed
    // handleRefresh();
  }, []);

  // Scroll to end of messages
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Render message bubbles
  const renderMessage = (message, index) => {
    const isLastMessage = index === messages.length - 1;
    
    return (
      <Animated.View 
        key={message.id} 
        style={[
          styles.messageBubble, 
          message.sender === 'user' ? styles.userMessage : styles.botMessage,
          isLastMessage && { opacity: fadeAnim }
        ]}
      >
        {message.sender === 'bot' && (
          <View style={styles.botAvatarContainer}>
            <View style={styles.botAvatar}>
              <Text style={styles.botAvatarText}>AI</Text>
            </View>
          </View>
        )}
        
        <View style={[
          styles.messageBubbleContent,
          message.sender === 'user' ? styles.userMessageContent : styles.botMessageContent
        ]}>
          <Text style={[
            styles.messageText, 
            message.sender === 'user' ? styles.userMessageText : styles.botMessageText
          ]}>
            {message.text}
          </Text>
          
          {/* Render options if available - modified to show 2 buttons per row */}
          {message.options && (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                {message.options.map((option, index) => {
                  // Return in pairs (2 per row)
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => handleOptionSelect(option)}
                    >
                      <LinearGradient
                        colors={['#FF3A3A', '#FF0000']}
                        style={styles.optionGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    );
  };

  // Render quiz screen
  const renderQuiz = () => {
    if (quizQuestions.length === 0 || currentQuizQuestion >= quizQuestions.length) {
      return (
        <View style={styles.loadingQuizContainer}>
          <ActivityIndicator size="large" color="#FF3333" />
          <Text style={styles.loadingText}>Loading quiz questions...</Text>
        </View>
      );
    }
    
    const question = quizQuestions[currentQuizQuestion];
    
    return (
      <View style={styles.quizContainer}>
        {/* Quiz progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${quizProgress}%` }]} />
        </View>
        
        <Text style={styles.quizCountText}>
          Question {currentQuizQuestion + 1} of {quizQuestions.length}
        </Text>
        
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quizOption}
              onPress={() => handleQuizAnswer(option)}
              activeOpacity={0.7}
              disabled={quizAnswers[currentQuizQuestion] !== undefined}
            >
              <LinearGradient
                colors={
                  quizAnswers[currentQuizQuestion] === option ? 
                  (option === question.correctAnswer ? ['#33FF33', '#00CC00'] : ['#FF3333', '#CC0000']) : 
                  ['#2A2A2A', '#363636']
                }
                style={styles.quizOptionGradient}
              >
                <Text style={styles.quizOptionLetter}>
                  {String.fromCharCode(65 + index)}
                </Text>
                <Text style={styles.quizOptionText}>{option}</Text>
                {quizAnswers[currentQuizQuestion] === option && 
                  <Text style={styles.quizOptionFeedback}>
                    {option === question.correctAnswer ? '✓' : '✗'}
                  </Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#111111" />
      
      {/* Header */}
      <LinearGradient
        colors={['#FF1A1A', '#CC0000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>AI Tutor</Text>
      </LinearGradient>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View style={styles.container}>
          {currentScreen === 'quiz' ? (
            renderQuiz()
          ) : (
            <ScrollView 
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              ref={scrollViewRef}
            >
              {messages.map((message, index) => renderMessage(message, index))}
              {isLoading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FF3333" />
                  <Text style={styles.loadingText}>Generating...</Text>
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
              style={[
                styles.sendButton,
                !userInput.trim() && styles.sendButtonDisabled
              ]} 
              onPress={handleSendMessage}
              disabled={isLoading || !userInput.trim()}
            >
              <LinearGradient
                colors={userInput.trim() ? ['#FF3A3A', '#FF0000'] : ['#666', '#444']}
                style={styles.sendButtonGradient}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  keyboardAvoid: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#1A1A1A', // Darker background for message area
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  messageBubbleContent: {
    maxWidth: BUBBLE_MAX_WIDTH,
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessageContent: {
    backgroundColor: '#FF3333', // Red-tinted user message
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    borderBottomRightRadius: 4,
  },
  botMessageContent: {
    backgroundColor: '#2A2A2A', // Dark gray bot message
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  botAvatarContainer: {
    marginRight: 8,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botAvatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF', // White text for user messages
  },
  botMessageText: {
    color: '#FFFFFF', // White text for bot messages
  },
  // Modified options container to fit content
  optionsContainer: {
    marginTop: 12,
    width: '100%',
  },
  // New row container for options
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Modified option button style for smaller buttons and 2 per row
  optionButton: {
    width: '48%', // Slightly less than 50% to allow for margin
    marginVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  // Modified gradient for smaller buttons
  optionGradient: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
    height: 36, // Fixed height for buttons
  },
  // Modified text for smaller buttons
  optionText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#262626', // Dark input area
    borderTopWidth: 1,
    borderTopColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#3A3A3A', // Darker input field
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    color: '#FFFFFF', // White text for input
  },
  sendButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
  sendButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  loadingText: {
    color: '#AAA',
    marginLeft: 8,
    fontSize: 14,
  },
  quizContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1A1A', // Dark background for quiz screen
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF3333',
  },
  quizCountText: {
    fontSize: 16,
    color: '#CCC',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF', // White text for questions
    textAlign: 'center',
    lineHeight: 28,
  },
  quizOption: {
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  quizOptionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF0000', // Red border for quiz options
  },
  quizOptionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 12,
  },
  quizOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  quizOptionFeedback: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  loadingQuizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
});

export default App;