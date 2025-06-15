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
        data-oid="7thf8ln"
      >
        <View
          style={[
            styles.messageAvatar,
            isUser ? styles.userAvatar : styles.aiAvatar,
          ]}
          data-oid="0mf8:os"
        >
          {isUser ? (
            <User size={16} color="#FFFFFF" data-oid="a9h7ezh" />
          ) : (
            <Bot size={16} color="#FFFFFF" data-oid="r:vk38o" />
          )}
        </View>
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
          data-oid="2bkqs14"
        >
          <Text
            style={[styles.messageText, isUser && styles.userMessageText]}
            data-oid="50sc99z"
          >
            {message.content}
          </Text>
          <Text style={styles.messageTime} data-oid="_y6gijh">
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
    <View style={styles.messageContainer} data-oid="rvbijs-">
      <View style={[styles.messageAvatar, styles.aiAvatar]} data-oid="tdlwcc1">
        <Bot size={16} color="#FFFFFF" data-oid="jh5jb6z" />
      </View>
      <View
        style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}
        data-oid="1f12aqx"
      >
        <View style={styles.typingIndicator} data-oid="883pjqp">
          <ActivityIndicator size="small" color="#9CA3AF" data-oid="8a-udpt" />
          <Text style={styles.typingText} data-oid=".uize9.">
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
      data-oid="jszy8d7"
    >
      {/* Header */}
      <View style={styles.header} data-oid="ascyoh7">
        <View style={styles.headerLeft} data-oid="f6dakh0">
          <View style={styles.aiIndicator} data-oid="as9tqh_">
            <Bot size={20} color="#FFFFFF" data-oid="a0_76t4" />
          </View>
          <View data-oid="i5aa6y1">
            <Text style={styles.title} data-oid="lbew3i2">
              AI Strategy Assistant
            </Text>
            <Text style={styles.subtitle} data-oid="85x3odv">
              Get personalized trading advice
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          data-oid="ajr9zy-"
        >
          <X size={24} color="#9CA3AF" data-oid="gc74b-8" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
        data-oid="wskjrtc"
      >
        {messages.map(renderMessage)}
        {isTyping && renderTypingIndicator()}
      </ScrollView>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <View style={styles.suggestionsContainer} data-oid="u_czvty">
          <View style={styles.suggestionsHeader} data-oid="f-4pdlj">
            <Lightbulb size={16} color="#F59E0B" data-oid="2wgbh5s" />
            <Text style={styles.suggestionsTitle} data-oid="qm928kw">
              Try asking:
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            data-oid="c3wia.n"
          >
            <View style={styles.suggestions} data-oid="2c7k8o_">
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionChip}
                  onPress={() => handleSuggestionPress(suggestion)}
                  data-oid="b0nh94:"
                >
                  <Text style={styles.suggestionText} data-oid="zhep9_g">
                    {suggestion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer} data-oid="wtwo_x4">
        <TextInput
          style={styles.textInput}
          placeholder="Ask about trading strategies..."
          placeholderTextColor="#6B7280"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          data-oid="3:zg3-d"
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isTyping}
          data-oid="4e5mm:s"
        >
          <Send
            size={20}
            color={!inputText.trim() ? '#6B7280' : '#FFFFFF'}
            data-oid="wbzgibd"
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
