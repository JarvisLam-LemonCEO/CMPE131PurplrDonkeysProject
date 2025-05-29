import { render, screen, cleanup } from '@testing-library/react'
import MessageBoard from "../MessageBoard"
import userEvent from '@testing-library/user-event'
import {BrowserRouter as Router} from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';


test('should render login background and cover components', () => {
  render(
    <Router>
      <MessageBoard />
    </Router>,
  );
    const MessageBoardElement = screen.getAllByTestId('msg');
    expect(MessageBoardElement).toBeTruthy()
  })