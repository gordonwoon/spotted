import AuthButtons from './AuthButtons'
import { render } from 'solid-testing-library'

it('it works', async () => {
  const { getByText } = render(AuthButtons)

  expect(getByText('Hello component!'));
})
