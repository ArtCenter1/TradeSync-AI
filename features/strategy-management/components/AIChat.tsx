import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { X, Send, Bot, User, Lightbulb } from 'lucide-react-native';
import { ChatMessage, Strategy } from '../types';
import { mockChatResponses } from '../data/mockStrategies';

interface AIChatProps {
  isVisible: boolean;
  onClose: () => void;
  strategies: Strategy[];
  onStrategyRecommend: (strategy: Strategy) => void;
}

export default function AIChat({
  isVisible,
  onClose,
  strategies,
  onStrategyRecommend,
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: mockChatResponses.greeting,
      role: 'assistant',
      timestamp: new Date(),
      status: 'delivered',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Risk assessment responses
    if (
      lowerMessage.includes('beginner') ||
      lowerMessage.includes('new') ||
      lowerMessage.includes('start')
    ) {
      return mockChatResponses.riskAssessment;
    }

    // Strategy recommendation
    if (
      lowerMessage.includes('recommend') ||
      lowerMessage.includes('suggest') ||
      lowerMessage.includes('best')
    ) {
      return mockChatResponses.strategyRecommendation;
    }

    // Explanation requests
    if (
      lowerMessage.includes('how') ||
      lowerMessage.includes('explain') ||
      lowerMessage.includes('work')
    ) {
      return mockChatResponses.explanation;
    }

    // Risk management
    if (
      lowerMessage.includes('risk') ||
      lowerMessage.includes('safe') ||
      lowerMessage.includes('loss')
    ) {
      return mockChatResponses.riskManagement;
    }

    // Backtesting
    if (
      lowerMessage.includes('backtest') ||
      lowerMessage.includes('performance') ||
      lowerMessage.includes('result')
    ) {
      return mockChatResponses.backtesting;
    }

    // Default response
    return "That's a great question! I can help you with strategy selection, risk management, and trading setup. What specific aspect would you like to know more about?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputText.trim(),
      role: 'user',
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputText),
        role: 'assistant',
        timestamp: new Date(),
        status: 'delivered',
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputText(suggestion);
  };

  const suggestions = [
    "I'm a beginner, what strategy should I start with?",
    'Show me low-risk strategies',
    'How do I set up automated trading?',
    "What's the best timeframe for scalping?",
    'Explain risk management',
  ];

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.role === 'user';

    return (
      <View
        key={message.id}
        style={[styles.messageContainer, isUser && styles.userMessageContainer]}
        data-oid="2o9c5lc"
      >
        <View
          style={[
            styles.messageAvatar,
            isUser ? styles.userAvatar : styles.aiAvatar,
          ]}
          data-oid="jb3pe9z"
        >
          {isUser ? (
            <User size={16} color="#FFFFFF" data-oid="xj0juxq" />
          ) : (
            <Bot size={16} color="#FFFFFF" data-oid=":9kdoym" />
          )}
        </View>
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
          data-oid=".i0dtp2"
        >
          <Text
            style={[styles.messageText, isUser && styles.userMessageText]}
            data-oid="jta08i."
          >
            {message.content}
          </Text>
          <Text style={styles.messageTime} data-oid="gwmz1ks">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  const renderTypingIndicator = () => (
    <View style={styles.messageContainer} data-oid="sld1mez">
      <View style={[styles.messageAvatar, styles.aiAvatar]} data-oid="t:zfior">
        <Bot size={16} color="#FFFFFF" data-oid="_3k5qta" />
      </View>
      <View
        style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}
        data-oid="o62im_b"
      >
        <View style={styles.typingIndicator} data-oid="xswlg3s">
          <ActivityIndicator size="small" color="#9CA3AF" data-oid="sz:hevb" />
          <Text style={styles.typingText} data-oid="0g6jqt6">
            AI is thinking...
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      data-oid=":88o_ls"
    >
      {/* Header */}
      <View style={styles.header} data-oid="y4wbtqe">
        <View style={styles.headerLeft} data-oid="j:-ji5z">
          <View style={styles.aiIndicator} data-oid="nd8nn9d">
            <Bot size={20} color="#FFFFFF" data-oid="--4v:nh" />
          </View>
          <View data-oid="rzc6a:7">
            <Text style={styles.title} data-oid="juj7i:n">
              AI Strategy Assistant
            </Text>
            <Text style={styles.subtitle} data-oid="a_9knp:">
              Get personalized trading advice
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          data-oid="fznmcn-"
        >
          <X size={24} color="#9CA3AF" data-oid="qj.m0x9" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
        data-oid="mf13r25"
      >
        {messages.map(renderMessage)}
        {isTyping && renderTypingIndicator()}
      </ScrollView>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <View style={styles.suggestionsContainer} data-oid="umbze74">
          <View style={styles.suggestionsHeader} data-oid="z.ii80k">
            <Lightbulb size={16} color="#F59E0B" data-oid="xewdxp2" />
            <Text style={styles.suggestionsTitle} data-oid="ey81460">
              Try asking:
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            data-oid="dzcotb."
          >
            <View style={styles.suggestions} data-oid="4adzh6n">
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionChip}
                  onPress={() => handleSuggestionPress(suggestion)}
                  data-oid="2p-eitf"
                >
                  <Text style={styles.suggestionText} data-oid="b4jshjf">
                    {suggestion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer} data-oid="3.chp-s">
        <TextInput
          style={styles.textInput}
          placeholder="Ask about trading strategies..."
          placeholderTextColor="#6B7280"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          data-oid="8a3v30j"
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isTyping}
          data-oid="wi2:b-k"
        >
          <Send
            size={20}
            color={!inputText.trim() ? '#6B7280' : '#FFFFFF'}
            data-oid="pl-9qh2"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  closeButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    flexDirection: 'row-reverse',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  userAvatar: {
    backgroundColor: '#3B82F6',
  },
  aiAvatar: {
    backgroundColor: '#10B981',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#1F2937',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#374151',
  },
  typingBubble: {
    paddingVertical: 8,
  },
  messageText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typingText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  suggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F59E0B',
    fontFamily: 'Inter-Medium',
  },
  suggestions: {
    flexDirection: 'row',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  suggestionText: {
    fontSize: 12,
    color: '#D1D5DB',
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#FFFFFF',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#374151',
    fontFamily: 'Inter-Regular',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#374151',
  },
});
