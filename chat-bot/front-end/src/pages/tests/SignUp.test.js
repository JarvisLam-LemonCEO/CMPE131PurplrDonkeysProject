import { render, screen, cleanup } from '@testing-library/react'
import SignUp from "../SignUp"
import userEvent from '@testing-library/user-event'
import {BrowserRouter as Router} from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';

  test('should render login background and cover components', () => {
    render(
        <Router>
          <SignUp />
        </Router>,
      );
    const SignUpElement = screen.getAllByTestId('cvr');
    expect(SignUpElement).toBeTruthy()
  })