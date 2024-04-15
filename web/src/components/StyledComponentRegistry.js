// [lib/registry.js]

"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return React.createElement(React.Fragment, null, styles);
  });

  if (typeof window !== "undefined")
    return React.createElement(React.Fragment, null, children);

  return React.createElement(
    StyleSheetManager,
    { sheet: styledComponentsStyleSheet.instance },
    children
  );
}
