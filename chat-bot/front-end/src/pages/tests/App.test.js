import { render, screen, cleanup } from '@testing-library/react'
import App from "../../App"

test('All of Application should load', () => {
  render(
        <App/>
    );
  expect(App).toBeTruthy();
})