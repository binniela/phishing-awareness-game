'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageSquare, Settings, Send, Trash, Archive } from 'lucide-react'
import Confetti from 'react-confetti'


type Email = {
  id: number;
  from: string;
  subject: string;
  preview: string;
  time: string;
  isPhishing: boolean;
}

const sampleEmails: Email[] = [
  {
    id: 1,
    from: 'noreply@sce.com',
    subject: 'Your SCE Bill is Ready',
    preview: 'Your latest Southern California Edison bill is now available. Log in to your account to view and pay your bill.',
    time: '8:32 AM',
    isPhishing: false,
  },
  {
    id: 2,
    from: 'customer.service@sce-billing.com',
    subject: 'Urgent: Your electricity will be disconnected',
    preview: 'Your account is past due. To avoid disconnection, click here to make an immediate payment.',
    time: '9:45 AM',
    isPhishing: true,
  },
  {
    id: 3,
    from: 'noreply@starbucks.com',
    subject: 'Your Starbucks Rewards',
    preview: "You've earned 50 bonus stars! Check your balance and redeem rewards in the Starbucks app.",
    time: '11:10 AM',
    isPhishing: false,
  },
  {
    id: 4,
    from: 'security@google.com',
    subject: 'Security Alert for your Google Account',
    preview: 'We detected a new sign-in to your Google Account. If this wasn\'t you, please review your account activity.',
    time: '12:22 PM',
    isPhishing: false,
  },
  {
    id: 5,
    from: 'customerservice@bankofamerica.com',
    subject: 'Important: Update Your Account Information',
    preview: 'Your account access will be limited until you verify your information. Click here to update now.',
    time: '1:15 PM',
    isPhishing: true,
  },
]

export default function OutlookStylePhishingGame() {
  const [emails, setEmails] = useState<Email[]>(sampleEmails);
  const [currentEmail, setCurrentEmail] = useState<Email | null>(null); 
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (emails.length > 0) {
      setCurrentEmail(emails[0]);
    } else {
      setGameOver(true);
      if (score >= 4) {  
        setShowConfetti(true);
      }
    }
  }, [emails, score]);

  const handleDecision = (isPhishing: boolean) => {
    if (currentEmail && isPhishing === currentEmail.isPhishing) {
      setScore(score + 1);
    }
    setEmails(emails.slice(1));
  };

  const restartGame = () => {
    setEmails(sampleEmails);
    setScore(0);
    setGameOver(false);
    setShowConfetti(false);
    setCurrentEmail(null); 
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {showConfetti && <Confetti />}
          <h2 className="text-2xl font-bold mb-4 text-center">Game Over</h2>
          <p className="text-xl text-center mb-4">Your Score: {score}/{sampleEmails.length}</p>
          <p className="text-center mb-6">
            {score >= 4 ? (
              <span className="text-green-500 font-semibold">Congratulations! You passed!</span>
            ) : (
              <span className="text-red-500 font-semibold">Sorry, you didn&apos;t pass. Try again!</span>
            )}
          </p>
          <Button onClick={restartGame} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Play Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
        {/* Outlook Header */}
        <div className="bg-[#0F6CBD] text-white p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare size={20} />
            <span className="font-semibold">Outlook</span>
          </div>
          <div className="flex-1 mx-4">
            <Input type="text" placeholder="Search" className="bg-white/20 border-0 placeholder-white/70" />
          </div>
          <div className="flex items-center space-x-2">
            <Bell size={20} />
            <Settings size={20} />
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 p-4">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <MessageSquare className="mr-2" size={18} />
              Inbox
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2">
              <Send className="mr-2" size={18} />
              Sent Items
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2">
              <Trash className="mr-2" size={18} />
              Deleted Items
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Archive className="mr-2" size={18} />
              Archive
            </Button>
          </div>

          {/* Email List */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Inbox</h2>
            </div>
            {emails.map((email) => (
              <div key={email.id} className="p-4 border-b hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{email.from}</span>
                  <span className="text-sm text-gray-500">{email.time}</span>
                </div>
                <div className="font-medium">{email.subject}</div>
                <div className="text-sm text-gray-600 truncate">{email.preview}</div>
              </div>
            ))}
          </div>

          {/* Email Content */}
          <div className="flex-1 p-4">
            {currentEmail && (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold mb-2">{currentEmail.subject}</h2>
                  <div className="flex items-center mb-4">
                    <Avatar className="w-10 h-10 mr-4">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${currentEmail.from}`} />
                      <AvatarFallback>{currentEmail.from[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{currentEmail.from}</div>
                      <div className="text-sm text-gray-500">To: you@example.com</div>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4">{currentEmail.preview}</p>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleDecision(false)} className="bg-green-500 hover:bg-green-600 text-white">
                    Accept as Safe
                  </Button>
                  <Button onClick={() => handleDecision(true)} className="bg-red-500 hover:bg-red-600 text-white">
                    Mark as Phishing
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">Score: {score}</p>
            <p className="text-sm text-gray-600">Emails Remaining: {emails.length}</p>
          </div>
          <Button onClick={restartGame} className="bg-blue-600 hover:bg-blue-700 text-white">
            Restart Game
          </Button>
        </div>
      </div>
    </div>
  )
}
