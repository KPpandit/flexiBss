"use client"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Avatar,
  Chip,
  IconButton,
  Fab,
  Paper,
  Divider,
  CircularProgress,
  useTheme,
} from "@mui/material"
import { MessageCircle, Send, Bot, User, Minimize, Maximize, X } from "lucide-react"
import { generateText } from "ai"

const CRMChatbot = ({ customers = [], currentCustomer = null }) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === "dark"

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your intelligent CRM AI assistant for Flexi 5G BSS. I can help you navigate the system, find features, manage customers, handle billing, and much more. Ask me anything about the CRM!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current && messagesEndRef.current.scrollIntoView) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getCRMContext = () => {
    const context = {
      totalCustomers: customers.length,
      currentCustomer: currentCustomer
        ? {
            name: currentCustomer.name || "Unknown",
            phone: currentCustomer.phone || "N/A",
            plan: currentCustomer.currentPack || currentCustomer.plan || "No Plan",
            status: currentCustomer.status || "Active",
          }
        : null,
      availablePlans: [
        "Basic 1GB - ₹199/month",
        "Premium 50GB - ₹599/month",
        "Unlimited 100GB - ₹999/month",
        "Enterprise 200GB - ₹1499/month",
      ],
      crmFeatures: {
        navigation: {
          "Customer Management": "Main dashboard - click on customer names to view details",
          "Add New Customer": "Click the 'Add Customer' button in the top toolbar",
          "Plan Upgrade": "Select customer → Customer Details → Plan Upgrade tab",
          "SIM Swap":
            "Select customer → Customer Details → SIM Swap tab (Physical↔eSIM, Prepaid↔Postpaid, SIM Stolen, SIM Return)",
          "Raise Complaint": "Select customer → Customer Details → Raise Complaint tab",
          "Generate Bill": "Select customer → Customer Details → Generate Bill tab",
          "Bill & Payment History": "Customer Details → Bill & Payment History tab",
          "Usage Details": "Customer Details → Usage tab (includes IDD and Roaming data)",
          "SIM Information": "Customer Details → SIM Information tab (includes IMSI 15-digit field)",
          "Dark Mode Toggle": "Available in theme settings for better visibility",
          "AI Chatbot": "Bottom-right floating button for instant CRM assistance",
        },
        customerTabs: [
          "Basic Information - Customer profile, contact details, address",
          "Plan Details - Current plan, data allowances, validity",
          "Bill & Payment History - Payment records with channel info (Payment Gateway/CBM)",
          "Usage - Data usage including IDD and Roaming charges",
          "SIM Information - SIM details with IMSI number (15-digit)",
          "Plan Upgrade - Change customer plans with instant updates and notifications",
          "SIM Swap - All SIM conversion options with real-time updates",
          "Raise Complaint - Customer complaint management with tracking",
          "Generate Bill - Billing operations with PDF generation",
        ],
        workflows: {
          "Adding Customer":
            "1. Click Add Customer → 2. Fill Basic Info (Name, Phone, Email) → 3. Add Contact Info & Address → 4. Set SIM Information → 5. Choose Plan → 6. Save & Activate",
          "Plan Upgrade":
            "1. Select Customer → 2. Go to Plan Upgrade tab → 3. Choose new plan → 4. Confirm upgrade → 5. See notification → 6. Customer profile updates automatically",
          "SIM Swap":
            "1. Select Customer → 2. SIM Swap tab → 3. Choose swap type (Physical/eSIM/Prepaid/Postpaid) → 4. Fill required details → 5. Process → 6. Update customer records",
          "Complaint Handling":
            "1. Select Customer → 2. Raise Complaint tab → 3. Fill complaint details & category → 4. Submit → 5. Track status → 6. Follow up",
          "Bill Generation":
            "1. Select Customer → 2. Generate Bill tab → 3. Select billing period → 4. Review charges → 5. Generate PDF → 6. Send to customer",
          "Usage Monitoring":
            "1. Select Customer → 2. Usage tab → 3. View data consumption → 4. Check IDD/Roaming charges → 5. Set alerts if needed",
        },
        projectInsights: {
          "Performance Optimization":
            "Consider implementing lazy loading for customer data, pagination for large customer lists, and caching for frequently accessed plans",
          "User Experience":
            "Add keyboard shortcuts (Ctrl+N for new customer, Ctrl+F for search), bulk operations for multiple customers, and quick action buttons",
          "Data Management":
            "Implement data export features (CSV/Excel), backup scheduling, and data validation rules for customer information",
          "Security Enhancements":
            "Add role-based access control, audit logs for all customer operations, and data encryption for sensitive information",
          "Reporting Features":
            "Create dashboard analytics, revenue reports, customer growth metrics, and plan popularity analysis",
          "Integration Opportunities":
            "Connect with SMS gateways for notifications, payment processors for automated billing, and CRM analytics tools",
          "Mobile Responsiveness":
            "Optimize for tablet and mobile usage, add touch-friendly controls, and implement offline capabilities",
          "Automation Suggestions":
            "Auto-renewal notifications, usage limit alerts, payment reminders, and complaint escalation workflows",
        },
        technicalDetails: {
          Architecture: "React-based SPA with Material-UI components, golden theme (#F8D582), dark/light mode support",
          "State Management":
            "Local state with React hooks, customer data passed through props, real-time updates on plan changes",
          Styling: "Material-UI with custom golden theme, responsive design, consistent typography and spacing",
          Components:
            "Modular structure - Customer.jsx, CustomerDetails.jsx, CustomerForm.jsx, action components for each feature",
          "Data Flow":
            "Parent-child prop passing, callback functions for updates, notification system for user feedback",
          "AI Integration": "Vercel AI SDK with GPT-4o-mini, context-aware responses, CRM-specific knowledge base",
        },
      },
    }
    return context
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const crmContext = getCRMContext()

      const systemPrompt = `You are an advanced AI assistant for the Flexi 5G BSS CRM system. You are not just a helper - you are an intelligent CRM expert that proactively suggests improvements, optimizations, and best practices.

CURRENT CRM CONTEXT:
- Total Customers: ${crmContext.totalCustomers}
- Current Customer: ${crmContext.currentCustomer ? `${crmContext.currentCustomer.name} (${crmContext.currentCustomer.phone}) - Plan: ${crmContext.currentCustomer.plan}` : "None selected"}
- Available Plans: ${crmContext.availablePlans.join(", ")}

CRM NAVIGATION GUIDE:
${Object.entries(crmContext.crmFeatures.navigation)
  .map(([feature, location]) => `• ${feature}: ${location}`)
  .join("\n")}

CUSTOMER DETAIL TABS:
${crmContext.crmFeatures.customerTabs.map((tab) => `• ${tab}`).join("\n")}

WORKFLOWS & PROCESSES:
${Object.entries(crmContext.crmFeatures.workflows)
  .map(([workflow, steps]) => `• ${workflow}: ${steps}`)
  .join("\n")}

PROJECT INSIGHTS & SUGGESTIONS:
${Object.entries(crmContext.crmFeatures.projectInsights)
  .map(([category, suggestion]) => `• ${category}: ${suggestion}`)
  .join("\n")}

TECHNICAL ARCHITECTURE:
${Object.entries(crmContext.crmFeatures.technicalDetails)
  .map(([aspect, detail]) => `• ${aspect}: ${detail}`)
  .join("\n")}

YOUR ADVANCED CAPABILITIES:
1. NAVIGATION EXPERT: Guide users to any CRM feature with exact paths and steps
2. WORKFLOW OPTIMIZER: Suggest efficient ways to complete tasks and improve processes
3. PROACTIVE ADVISOR: Recommend features, improvements, and best practices without being asked
4. TECHNICAL CONSULTANT: Explain architecture, suggest optimizations, and identify potential issues
5. BUSINESS ANALYST: Provide insights on customer data, plan performance, and growth opportunities
6. TROUBLESHOOTER: Help resolve issues, explain errors, and guide through complex scenarios

RESPONSE BEHAVIOR:
- Always be proactive - suggest related features, improvements, or optimizations
- Provide specific, actionable guidance with exact button names and locations
- When answering questions, also suggest 2-3 related things the user might want to know
- Offer efficiency tips and shortcuts for common tasks
- Identify potential issues or improvements in current workflows
- Use the exact terminology from the CRM interface
- Be comprehensive but concise - provide complete solutions in organized format

PROACTIVE SUGGESTIONS:
- If user asks about customers, suggest analytics and reporting features
- If user asks about plans, recommend upgrade strategies and revenue optimization
- If user asks about navigation, suggest keyboard shortcuts and efficiency tips
- If user asks about data, recommend export options and backup strategies
- Always end responses with "Would you like me to explain any related features or suggest optimizations?"

Remember: You're not just answering questions - you're actively helping improve their CRM operations and suggesting better ways to work.`

      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        system: systemPrompt,
        prompt: input.trim(),
      })

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date) => {
    if (!date || !(date instanceof Date)) return ""
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) {
    return (
      <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
        <Fab
          onClick={() => setIsOpen(true)}
          sx={{
            backgroundColor: "#F8D582",
            color: "black",
            "&:hover": {
              backgroundColor: "#F8D582",
              opacity: 0.9,
            },
            boxShadow: 3,
            width: 56,
            height: 56,
          }}
        >
          <MessageCircle size={24} />
        </Fab>
        <Chip
          label="AI"
          size="small"
          color="error"
          sx={{
            position: "absolute",
            top: -8,
            right: -8,
            minWidth: 24,
            height: 24,
            fontSize: "0.75rem",
            animation: "pulse 2s infinite",
          }}
        />
      </Box>
    )
  }

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
      <Card
        sx={{
          width: 340,
          height: isMinimized ? 64 : 480,
          boxShadow: 6,
          border: 2,
          borderColor: isDarkMode ? "#404040" : "grey.300",
          backgroundColor: isDarkMode ? "#1a1a1a" : "background.paper",
          transition: "all 0.3s ease",
        }}
      >
        <CardHeader
          sx={{
            backgroundColor: "#F8D582",
            color: "black",
            p: 1.5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Bot size={18} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                AI Assistant
              </Typography>
            </Box>
          }
          action={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={() => setIsMinimized(!isMinimized)}
                sx={{ color: "black", "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" } }}
              >
                {isMinimized ? <Maximize size={14} /> : <Minimize size={14} />}
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setIsOpen(false)}
                sx={{ color: "black", "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" } }}
              >
                <X size={14} />
              </IconButton>
            </Box>
          }
        />

        {!isMinimized && (
          <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", height: 416 }}>
            <Box sx={{ flex: 1, p: 1.5, overflowY: "auto", maxHeight: 330 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    {message.role === "assistant" && (
                      <Avatar sx={{ width: 28, height: 28, backgroundColor: "#F8D582", color: "black" }}>
                        <Bot size={14} />
                      </Avatar>
                    )}
                    <Paper
                      elevation={1}
                      sx={{
                        maxWidth: "75%",
                        p: 1.25,
                        backgroundColor: message.role === "user" ? "#F8D582" : isDarkMode ? "#2a2a2a" : "#f5f5f5",
                        color: message.role === "user" ? "black" : isDarkMode ? "#ffffff" : "#000000",
                        borderRadius: 2,
                        border: isDarkMode ? "1px solid #404040" : "none",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "pre-wrap",
                          mb: 0.5,
                          fontSize: "0.8rem",
                          color: message.role === "user" ? "black" : isDarkMode ? "#ffffff" : "#000000",
                        }}
                      >
                        {message.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          fontSize: "0.65rem",
                          color: message.role === "user" ? "black" : isDarkMode ? "#cccccc" : "#666666",
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </Typography>
                    </Paper>
                    {message.role === "user" && (
                      <Avatar sx={{ width: 28, height: 28, backgroundColor: "#F8D582", color: "black" }}>
                        <User size={14} />
                      </Avatar>
                    )}
                  </Box>
                ))}
                {isLoading && (
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-start" }}>
                    <Avatar sx={{ width: 28, height: 28, backgroundColor: "#F8D582", color: "black" }}>
                      <Bot size={14} />
                    </Avatar>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1.25,
                        backgroundColor: isDarkMode ? "#2a2a2a" : "#f5f5f5",
                        borderRadius: 2,
                        border: isDarkMode ? "1px solid #404040" : "none",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CircularProgress size={14} sx={{ color: "#F8D582" }} />
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.8rem", color: isDarkMode ? "#ffffff" : "#000000" }}
                        >
                          Thinking...
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                )}
              </Box>
              <div ref={messagesEndRef} />
            </Box>

            <Divider sx={{ borderColor: isDarkMode ? "#404040" : "divider" }} />
            <Box sx={{ p: 1.5 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: isDarkMode ? "#2a2a2a" : "background.paper",
                      color: isDarkMode ? "#ffffff" : "text.primary",
                      fontSize: "0.8rem",
                      "& fieldset": {
                        borderColor: isDarkMode ? "#404040" : "rgba(0, 0, 0, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? "#606060" : "rgba(0, 0, 0, 0.87)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F8D582",
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: isDarkMode ? "#cccccc" : "rgba(0, 0, 0, 0.6)",
                      opacity: 1,
                      fontSize: "0.8rem",
                    },
                  }}
                />
                <IconButton
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="small"
                  sx={{
                    backgroundColor: "#F8D582",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#F8D582",
                      opacity: 0.9,
                    },
                    "&:disabled": {
                      backgroundColor: isDarkMode ? "#404040" : "grey.300",
                      color: isDarkMode ? "#666666" : "rgba(0, 0, 0, 0.26)",
                    },
                  }}
                >
                  <Send size={14} />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        )}
      </Card>
    </Box>
  )
}

export default CRMChatbot
