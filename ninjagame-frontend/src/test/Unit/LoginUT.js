import {render, fireEvent} from '@testing-library/vue'
import Login from '@/components/Login.vue'

test('Login - No username - error is did you fill in the right username', async () => {
  const {getByLabelText, getByText} = render(Login);

  // Asserts initial state.
  getByText('initialError');

  // Get the input DOM node by querying the associated label.
  const button = getByText('Login');

  // Updates the <input> value and triggers an `input` event.
  // fireEvent.input() would make the test fail.
  await fireEvent.click(button);

  getByText('Did you enter the right username?');
})