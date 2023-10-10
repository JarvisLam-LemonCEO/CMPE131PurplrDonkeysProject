import unittest
import subprocess
import coverage
  

class TestChatBot(unittest.TestCase):
    def test_botResponse1(self):
        message = "what do you do with my data"
        response = subprocess.run(['python3', 'ChatBot.py', message], capture_output=True)
        response = str(response.stdout)
        response = response[2:len(response)-3]
        answer = "I sell it to foreign hackers...Kidding!"
        self.assertEqual(response, answer)
    
    def test_botResponse2(self):
        message = "how are you"
        response = subprocess.run(['python3', 'ChatBot.py', message], capture_output=True)
        response = str(response.stdout)
        response = response[2:len(response)-3]
        answer = "I'm great! Thanks for asking. How are you?"
        self.assertEqual(response, answer)
    
    def test_botResponse3(self):
        message = "how do you think"
        response = subprocess.run(['python3', 'ChatBot.py', message], capture_output=True)
        response = str(response.stdout)
        response = response[2:len(response)-3]
        answer = "With the power of coding"
        self.assertEqual(response, answer)
    
    def test_botResponse4(self):
        message = "bye"
        response = subprocess.run(['python3', 'ChatBot.py', message], capture_output=True)
        response = str(response.stdout)
        response = response[2:len(response)-3]
        answer = "See you later!"
        self.assertEqual(response, answer)
        
        
        
  
if __name__ == '__main__':
    unittest.main()
