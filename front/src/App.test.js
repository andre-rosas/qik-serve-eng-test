import { create } from "react-test-renderer";
import App from "./App";

import ItemFinder from "./components/ItemFinder/index";

test("render initial component", () => {
  const root = create(<App />).root;
  // eslint-disable-next-line testing-library/await-async-query
  const elements = root.findAllByType(ItemFinder);
  expect(elements.length).toBe(1);
});
