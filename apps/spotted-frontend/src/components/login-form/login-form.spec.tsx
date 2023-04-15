import LoginForm from './LoginForm'
import { render } from 'solid-testing-library'

it('it works', async () => {
  const { getByText } = render(LoginForm)

  expect(getByText('Hello component!'));
})
