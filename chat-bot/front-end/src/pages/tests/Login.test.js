import { render, screen, cleanup } from '@testing-library/react'
import Login from "../Login"
import userEvent from '@testing-library/user-event'
import {BrowserRouter as Router} from 'react-router-dom';
import App from "../../App"
import { Link, Navigate } from 'react-router-dom';


test('should render login background and cover components', () => {
    render(
        <Router>
          <Login />
        </Router>,
      );
    const loginElement = screen.getAllByTestId('cvr');
    expect(loginElement).toBeTruthy()
  })

  test('Upon clicking guest button, show message board from MessageBoard.js', async () =>  {
    render(
          <App />
      );
      await userEvent.click(screen.getByText("Continue as Guest"))
      expect(screen.getByText('Message History')).toBeVisible()
  })

  test('Upon clicking log out, main page should be visible', async () =>  {
    render(
          <App />
      );
      await userEvent.click(screen.getByText("Log Out"))
      expect(screen.getByText('Continue as Guest')).toBeVisible()
  })



